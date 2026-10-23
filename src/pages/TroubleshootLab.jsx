import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import "./TroubleshootLab.css";

const SCENARIOS = [
  {
    id: 1,
    name: "Cable Fault",
    title: "PC-02 Not Connected",
    level: "Basic",
    icon: "🔌",
    category: "Physical",
    objective:
      "Find the fault on the PC-02 path to the switch and restore the connection.",
    symptom:
      "PC-02 shows OFFLINE status and cannot ping the gateway.",
    target: "PC-02",
    fault: "cable",
    expected: [
      "inspect-cable",
      "replace-cable",
      "ping-gateway",
    ],
    hint:
      "Start with a physical inspection before touching the IP configuration.",
  },
  {
    id: 2,
    name: "Disabled NIC",
    title: "PC-03 Network Adapter Disabled",
    level: "Basic",
    icon: "🖥️",
    category: "Device",
    objective:
      "Enable the PC-03 network adapter and prove that the connection is restored.",
    symptom:
      "PC-03 has the correct cable, but the system does not have an active network link.",
    target: "PC-03",
    fault: "adapter",
    expected: [
      "inspect-adapter",
      "enable-adapter",
      "ping-gateway",
    ],
    hint:
      "Since the cable is correct, continue the inspection by checking the network adapter.",
  },
  {
    id: 3,
    name: "Wrong IP",
    title: "Incorrect PC-01 IP Configuration",
    level: "Intermediate",
    icon: "🌐",
    category: "IP Configuration",
    objective:
      "Check the IP, subnet, and gateway of PC-01, then restore it to the correct LAN network.",
    symptom:
      "The physical link is active, but PC-01 cannot reach the gateway.",
    target: "PC-01",
    fault: "ip",
    expected: [
      "ipconfig",
      "repair-ip",
      "ping-gateway",
    ],
    hint:
      "Use ipconfig to make sure the host address is on the correct subnet.",
  },
  {
    id: 4,
    name: "Switch Port Down",
    title: "Switch Port for PC-03 Disabled",
    level: "Intermediate",
    icon: "🔀",
    category: "Switch",
    objective:
      "Find the disabled switch port and enable it again without changing other devices.",
    symptom:
      "PC-03 and the cable are normal, but the link on the switch side is inactive.",
    target: "SW-01",
    fault: "switch-port",
    expected: [
      "inspect-port",
      "enable-port",
      "ping-gateway",
    ],
    hint:
      "Distinguish a cable problem from a switch port administration problem.",
  },
  {
    id: 5,
    name: "Router Interface Down",
    title: "Gateway Cannot Be Reached",
    level: "Intermediate",
    icon: "📡",
    category: "Router",
    objective:
      "Check the gateway interface and enable the interface that is down.",
    symptom:
      "Several clients still have local links, but all of them fail to reach the gateway.",
    target: "RTR-01",
    fault: "router-interface",
    expected: [
      "inspect-interface",
      "enable-interface",
      "ping-gateway",
    ],
    hint:
      "If many clients experience the same symptoms, check the central network device.",
  },
  {
    id: 6,
    name: "Wi-Fi AP Down",
    title: "Wi-Fi Client Has No Connection",
    level: "Intermediate",
    icon: "📶",
    category: "Wireless",
    objective:
      "Restore the access point and make sure the wireless client can connect again.",
    symptom:
      "The NETLAB-LAB SSID cannot be used and the wireless client cannot establish a connection.",
    target: "AP-01",
    fault: "ap",
    expected: [
      "inspect-ap",
      "power-ap",
      "connect-ap",
      "ping-gateway",
    ],
    hint:
      "The access point needs power and an active uplink so clients can access the LAN.",
  },
  {
    id: 7,
    name: "DHCP Down",
    title: "Client Does Not Receive an Automatic IP",
    level: "Advanced",
    icon: "🧩",
    category: "Service",
    objective:
      "Check the DHCP service and restore automatic IP address assignment.",
    symptom:
      "PC-02 and PC-03 are powered on, but their IP configurations are empty or use APIPA addresses.",
    target: "RTR-01",
    fault: "dhcp",
    expected: [
      "inspect-dhcp",
      "enable-dhcp",
      "renew-ip",
      "ping-gateway",
    ],
    hint:
      "Do not immediately assign a static IP. First find out why DHCP is not providing a lease.",
  },
  {
    id: 8,
    name: "DNS Failure",
    title: "Host Name Cannot Be Resolved",
    level: "Advanced",
    icon: "🔎",
    category: "Service",
    objective:
      "Separate IP connectivity problems from name resolution problems, then restore DNS.",
    symptom:
      "The gateway and server IP can be pinged successfully, but the NETLAB-SRV server name cannot be resolved.",
    target: "RTR-01",
    fault: "dns",
    expected: [
      "ping-gateway",
      "ping-server-ip",
      "check-dns",
      "repair-dns",
      "resolve-name",
    ],
    hint:
      "IP connectivity and DNS are two different things. Test them separately.",
  },
  {
    id: 9,
    name: "Firewall Block",
    title: "Server Service Blocked",
    level: "Advanced",
    icon: "🛡️",
    category: "Security",
    objective:
      "Identify the firewall rule blocking the lab service and test the connection again.",
    symptom:
      "The server is active and can be pinged, but the HTTP service cannot be accessed from PC-01.",
    target: "SRV-01",
    fault: "firewall",
    expected: [
      "ping-server",
      "inspect-firewall",
      "allow-http",
      "test-http",
    ],
    hint:
      "A successful ping does not mean that all service ports are open.",
  },
  {
    id: 10,
    name: "VLAN Mismatch",
    title: "PC-03 Is on the Wrong VLAN",
    level: "Advanced",
    icon: "🏷️",
    category: "Switch",
    objective:
      "Find the VLAN mismatch on the PC-03 port and return the port to the user VLAN.",
    symptom:
      "PC-03's IP looks reasonable, but the host cannot communicate with the expected VLAN gateway.",
    target: "SW-01",
    fault: "vlan",
    expected: [
      "inspect-vlan",
      "repair-vlan",
      "ping-gateway",
    ],
    hint:
      "A VLAN error can make the cable, adapter, and IP appear correct while the connection still fails.",
  },
];

const BASE_DEVICES = [
  {
    id: "RTR-01",
    type: "Router",
    icon: "📡",
    ip: "192.168.10.1",
    position: "top",
  },
  {
    id: "SW-01",
    type: "Switch",
    icon: "🔀",
    ip: "192.168.10.2",
    position: "center",
  },
  {
    id: "PC-01",
    type: "PC",
    icon: "🖥️",
    ip: "192.168.10.11",
    position: "left",
  },
  {
    id: "PC-02",
    type: "PC",
    icon: "🖥️",
    ip: "192.168.10.12",
    position: "bottom-left",
  },
  {
    id: "PC-03",
    type: "PC",
    icon: "🖥️",
    ip: "192.168.10.13",
    position: "bottom-right",
  },
  {
    id: "AP-01",
    type: "Access Point",
    icon: "📶",
    ip: "192.168.10.20",
    position: "right",
  },
  {
    id: "SRV-01",
    type: "Server",
    icon: "🗄️",
    ip: "192.168.10.50",
    position: "far-right",
  },
];

const initialState = {
  cable: true,
  adapter: true,
  ipCorrect: true,
  switchPort: true,
  routerInterface: true,
  apPowered: true,
  apUplink: true,
  dhcp: true,
  dns: true,
  firewall: false,
  vlanCorrect: true,
};

const SCENARIO_PATCHES = {
  cable: {
    cable: false,
  },
  adapter: {
    adapter: false,
  },
  ip: {
    ipCorrect: false,
  },
  "switch-port": {
    switchPort: false,
  },
  "router-interface": {
    routerInterface: false,
  },
  ap: {
    apPowered: false,
    apUplink: false,
  },
  dhcp: {
    dhcp: false,
  },
  dns: {
    dns: false,
  },
  firewall: {
    firewall: true,
  },
  vlan: {
    vlanCorrect: false,
  },
};

function makeScenarioState(fault) {
  return {
    ...initialState,
    ...(SCENARIO_PATCHES[fault] || {}),
  };
}

function deviceHealth(deviceId, state) {
  if (deviceId === "PC-01") {
    if (
      !state.adapter ||
      !state.cable ||
      !state.ipCorrect ||
      !state.switchPort ||
      !state.routerInterface ||
      !state.vlanCorrect
    ) {
      return "OFFLINE";
    }
  }

  if (deviceId === "PC-02") {
    if (
      !state.adapter ||
      !state.cable ||
      !state.dhcp ||
      !state.switchPort
    ) {
      return "OFFLINE";
    }
  }

  if (deviceId === "PC-03") {
    if (
      !state.adapter ||
      !state.cable ||
      !state.switchPort ||
      !state.vlanCorrect ||
      !state.dhcp
    ) {
      return "OFFLINE";
    }
  }

  if (deviceId === "RTR-01") {
    if (!state.routerInterface) {
      return "OFFLINE";
    }

    if (!state.dhcp || !state.dns) {
      return "DEGRADED";
    }
  }

  if (deviceId === "AP-01") {
    if (!state.apPowered || !state.apUplink) {
      return "OFFLINE";
    }
  }

  if (deviceId === "SRV-01") {
    return "ONLINE";
  }

  return "ONLINE";
}

function runCheck(check, state) {
  switch (check) {
    case "ping-gateway":
      return (
        state.cable &&
        state.adapter &&
        state.ipCorrect &&
        state.switchPort &&
        state.routerInterface &&
        state.vlanCorrect
      );

    case "ping-server-ip":
      return (
        state.cable &&
        state.adapter &&
        state.ipCorrect &&
        state.switchPort &&
        state.routerInterface &&
        state.vlanCorrect
      );

    case "ping-server":
      return (
        state.cable &&
        state.adapter &&
        state.ipCorrect &&
        state.switchPort &&
        state.routerInterface &&
        state.vlanCorrect
      );

    case "resolve-name":
      return (
        state.dns &&
        runCheck("ping-server-ip", state)
      );

    case "test-http":
      return (
        !state.firewall &&
        runCheck("ping-server-ip", state)
      );

    default:
      return true;
  }
}

export default function TroubleshootLab() {
  const [activeTab, setActiveTab] = useState("lab");

  const [selectedScenario, setSelectedScenario] =
    useState(1);

  const [selectedDevice, setSelectedDevice] =
    useState("PC-02");

  const [labState, setLabState] = useState(() =>
    makeScenarioState(SCENARIOS[0].fault)
  );

  const [logs, setLogs] = useState([
    {
      type: "info",
      text: "Simulation ready. Start from the Symptom panel and perform an inspection.",
    },
  ]);

  const [testResults, setTestResults] =
    useState([]);

  const [completed, setCompleted] = useState(() => {
    const userId = localStorage.getItem("netlabUserId");

    if (!userId) {
      return [];
    }

    try {
      const data = JSON.parse(
        localStorage.getItem(
          "netlabTroubleshootCompleted"
        ) || "{}"
      );

      if (
        data &&
        typeof data === "object" &&
        !Array.isArray(data)
      ) {
        return data[String(userId)] || [];
      }

      return [];
    } catch {
      return [];
    }
  });

  const scenario =
    SCENARIOS.find(
      (item) => item.id === selectedScenario
    ) || SCENARIOS[0];

  const statusText = useMemo(() => {
    if (completed.includes(scenario.id)) {
      return "NETWORK RESTORED";
    }

    return "DIAGNOSTIC MODE";
  }, [completed, scenario.id]);

  useEffect(() => {
    if (completed.length !== SCENARIOS.length) {
      return;
    }

    const userId = localStorage.getItem("netlabUserId");

    if (!userId) {
      return;
    }

    const numericUserId = Number(userId);
    let progressData = [];

    try {
      progressData = JSON.parse(
        localStorage.getItem("netlabProgress") || "[]"
      );

      if (!Array.isArray(progressData)) {
        progressData = [];
      }
    } catch {
      progressData = [];
    }

    const existingIndex = progressData.findIndex(
      (item) =>
        String(item.userId) === String(numericUserId) &&
        item.activityId === "troubleshoot-lab"
    );

    if (existingIndex !== -1) {
      progressData[existingIndex] = {
        ...progressData[existingIndex],
        status: "completed",
        progress: 100,
        completedAt:
          progressData[existingIndex].completedAt ||
          new Date().toISOString(),
      };
    } else {
      progressData.push({
        userId: numericUserId,
        activityId: "troubleshoot-lab",
        title: "Troubleshoot Lab",
        type: "Practical Lab",
        order: 9,
        status: "completed",
        progress: 100,
        completedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem(
      "netlabProgress",
      JSON.stringify(progressData)
    );

    localStorage.setItem(
      "netlabLastActivity",
      "Troubleshoot Lab"
    );
  }, [completed]);

  const addLog = (type, text) => {
    setLogs((prev) =>
      [
        {
          type,
          text,
        },
        ...prev,
      ].slice(0, 10)
    );
  };

  const persistCompleted = (scenarioId) => {
    const userId = localStorage.getItem("netlabUserId");

    if (!userId) {
      return;
    }

    setCompleted((prev) => {
      const next = prev.includes(scenarioId)
        ? prev
        : [...prev, scenarioId];

      let data = {};

      try {
        data = JSON.parse(
          localStorage.getItem(
            "netlabTroubleshootCompleted"
          ) || "{}"
        );

        if (
          !data ||
          typeof data !== "object" ||
          Array.isArray(data)
        ) {
          data = {};
        }
      } catch {
        data = {};
      }

      data[String(userId)] = next;

      localStorage.setItem(
        "netlabTroubleshootCompleted",
        JSON.stringify(data)
      );

      localStorage.setItem(
        "netlabLastActivity",
        `Troubleshoot Lab: ${scenario.title}`
      );

      return next;
    });
  };

  const loadScenario = (id) => {
    const next =
      SCENARIOS.find(
        (item) => item.id === id
      ) || SCENARIOS[0];

    setSelectedScenario(next.id);
    setSelectedDevice(next.target);

    setLabState(
      makeScenarioState(next.fault)
    );

    setLogs([
      {
        type: "info",
        text: `Scenario loaded: ${next.title}. Read the symptoms before making any repairs.`,
      },
    ]);

    setTestResults([]);
    setActiveTab("lab");
  };

  const resetScenario = () => {
    setLabState(
      makeScenarioState(scenario.fault)
    );

    setSelectedDevice(scenario.target);

    setLogs([
      {
        type: "info",
        text: "Scenario reset. All fault conditions have been restored.",
      },
    ]);

    setTestResults([]);
  };

  const inspectAction = (
    action,
    description
  ) => {
    addLog("inspect", description);

    setTestResults((prev) =>
      [
        ...prev,
        {
          name: action,
          ok: true,
          text: `${action}: inspection completed.`,
        },
      ].slice(-6)
    );
  };

  const repair = (
    key,
    description,
    value = true
  ) => {
    setLabState((prev) => ({
      ...prev,
      [key]: value,
    }));

    addLog("repair", description);
  };

  const testNetwork = () => {
    const checks = [
      {
        name: "Physical Link",
        ok: labState.cable,
      },
      {
        name: "Network Adapter",
        ok: labState.adapter,
      },
      {
        name: "IP Configuration",
        ok: labState.ipCorrect,
      },
      {
        name: "Switch Port",
        ok: labState.switchPort,
      },
      {
        name: "Router Interface",
        ok: labState.routerInterface,
      },
      {
        name: "VLAN",
        ok: labState.vlanCorrect,
      },
      {
        name: "Access Point",
        ok:
          labState.apPowered &&
          labState.apUplink,
      },
      {
        name: "DHCP",
        ok: labState.dhcp,
      },
      {
        name: "DNS",
        ok: labState.dns,
      },
      {
        name: "HTTP Firewall",
        ok: !labState.firewall,
      },
    ];

    const relevantByFault = {
      cable: [
        "Physical Link",
        "Network Adapter",
        "Switch Port",
        "Router Interface",
        "VLAN",
      ],
      adapter: [
        "Network Adapter",
        "Physical Link",
        "Switch Port",
        "Router Interface",
        "VLAN",
      ],
      ip: [
        "IP Configuration",
        "Physical Link",
        "Network Adapter",
        "Switch Port",
        "Router Interface",
        "VLAN",
      ],
      "switch-port": [
        "Switch Port",
        "Physical Link",
        "Network Adapter",
        "Router Interface",
        "VLAN",
      ],
      "router-interface": [
        "Router Interface",
        "Switch Port",
        "Physical Link",
        "Network Adapter",
        "VLAN",
      ],
      ap: [
        "Access Point",
        "Router Interface",
      ],
      dhcp: [
        "DHCP",
        "Physical Link",
        "Network Adapter",
        "Switch Port",
      ],
      dns: [
        "DNS",
        "DHCP",
        "Router Interface",
      ],
      firewall: [
        "HTTP Firewall",
        "Physical Link",
        "Network Adapter",
        "Switch Port",
        "Router Interface",
      ],
      vlan: [
        "VLAN",
        "Switch Port",
        "IP Configuration",
        "Router Interface",
      ],
    };

    const relevant =
      relevantByFault[scenario.fault] ||
      checks.map(
        (check) => check.name
      );

    const results = checks.filter(
      (check) =>
        relevant.includes(check.name)
    );

    setTestResults(results);

    const fixed = results.every(
      (result) => result.ok
    );

    if (fixed) {
      addLog(
        "success",
        "All relevant checks passed. The network can be used again."
      );

      persistCompleted(
        scenario.id
      );
    } else {
      const failed = results
        .filter(
          (result) => !result.ok
        )
        .map(
          (result) => result.name
        )
        .join(", ");

      addLog(
        "error",
        `Problems still detected in: ${failed}. Continue inspection and repair.`
      );
    }
  };

  const getDeviceActions = (
    deviceId
  ) => {
    const actions = [];

    if (deviceId === "PC-01") {
      actions.push({
        label: "Run ipconfig",
        icon: "⌨️",
        kind: "inspect",
        run: () =>
          inspectAction(
            "ipconfig",
            labState.ipCorrect
              ? "PC-01 has the correct IP configuration."
              : "PC-01 has an incorrect IP configuration."
          ),
      });

      actions.push({
        label: "Inspect Network Adapter",
        icon: "🔍",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Network Adapter",
            labState.adapter
              ? "PC-01 network adapter is active."
              : "PC-01 network adapter has been detected as faulty."
          ),
      });

      if (scenario.fault === "ip") {
        actions.push({
          label: "Repair IP & Gateway",
          icon: "🛠️",
          kind: "repair",
          run: () =>
            repair(
              "ipCorrect",
              "PC-01 IP configuration and default gateway have been repaired."
            ),
        });
      }

      actions.push({
        label: "Ping Gateway",
        icon: "📡",
        kind: "test",
        run: () => {
          const ok = runCheck(
            "ping-gateway",
            labState
          );

          addLog(
            ok ? "success" : "error",
            ok
              ? "Ping to gateway 192.168.10.1 successful."
              : "Ping to gateway failed."
          );
        },
      });
    }

    if (deviceId === "PC-02") {
      actions.push({
        label: "Inspect Network Adapter",
        icon: "🔍",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Network Adapter",
            labState.adapter
              ? "PC-02 adapter is active."
              : "PC-02 adapter is disabled."
          ),
      });

      actions.push({
        label: "Inspect Cable",
        icon: "🔌",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Cable",
            labState.cable
              ? "PC-02 cable is connected correctly."
              : "PC-02 cable has been detected as faulty."
          ),
      });

      if (scenario.fault === "adapter") {
        actions.push({
          label: "Enable Network Adapter",
          icon: "⚡",
          kind: "repair",
          run: () =>
            repair(
              "adapter",
              "PC-02 network adapter has been enabled successfully."
            ),
        });
      }

      if (scenario.fault === "cable") {
        actions.push({
          label: "Replace UTP Cable",
          icon: "🛠️",
          kind: "repair",
          run: () =>
            repair(
              "cable",
              "PC-02 UTP cable has been replaced successfully."
            ),
        });
      }

      if (scenario.fault === "dhcp") {
        actions.push({
          label: "Renew IP Address",
          icon: "🔄",
          kind: "test",
          run: () => {
            if (labState.dhcp) {
              addLog(
                "success",
                "PC-02 successfully received a new DHCP lease."
              );
            } else {
              addLog(
                "error",
                "IP renewal failed because the DHCP server is still experiencing problems."
              );
            }
          },
        });
      }

      actions.push({
        label: "Ping Gateway",
        icon: "📡",
        kind: "test",
        run: () => {
          const ok = runCheck(
            "ping-gateway",
            labState
          );

          addLog(
            ok ? "success" : "error",
            ok
              ? "Gateway ping from PC-02 successful."
              : "PC-02 cannot reach the gateway yet."
          );
        },
      });
    }

    if (deviceId === "PC-03") {
      actions.push({
        label: "Run ipconfig",
        icon: "⌨️",
        kind: "inspect",
        run: () =>
          inspectAction(
            "ipconfig",
            labState.vlanCorrect
              ? "PC-03 IP configuration appears correct."
              : "PC-03 IP configuration appears normal, but the VLAN needs to be checked."
          ),
      });

      actions.push({
        label: "Inspect Network Adapter",
        icon: "🔍",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Network Adapter",
            labState.adapter
              ? "PC-03 network adapter is active."
              : "PC-03 network adapter is disabled."
          ),
      });

      if (scenario.fault === "adapter") {
        actions.push({
          label: "Enable Adapter",
          icon: "⚡",
          kind: "repair",
          run: () =>
            repair(
              "adapter",
              "PC-03 network adapter has been enabled successfully."
            ),
        });
      }

      if (scenario.fault === "vlan") {
        actions.push({
          label: "Test Gateway",
          icon: "📡",
          kind: "test",
          run: () => {
            const ok = runCheck(
              "ping-gateway",
              labState
            );

            addLog(
              ok ? "success" : "error",
              ok
                ? "PC-03 successfully reached the gateway."
                : "PC-03 failed to reach the gateway. Check the VLAN."
            );
          },
        });
      }

      if (scenario.fault === "dhcp") {
        actions.push({
          label: "Renew IP Address",
          icon: "🔄",
          kind: "test",
          run: () => {
            if (labState.dhcp) {
              addLog(
                "success",
                "PC-03 successfully received a new DHCP lease."
              );
            } else {
              addLog(
                "error",
                "IP renewal failed because the DHCP server is still experiencing problems."
              );
            }
          },
        });
      }

      actions.push({
        label: "Ping Gateway",
        icon: "📡",
        kind: "test",
        run: () => {
          const ok = runCheck(
            "ping-gateway",
            labState
          );

          addLog(
            ok ? "success" : "error",
            ok
              ? "Gateway ping from PC-03 successful."
              : "PC-03 cannot reach the gateway yet."
          );
        },
      });
    }

    if (deviceId === "SW-01") {
      actions.push({
        label: "Inspect PC-03 Port",
        icon: "🔍",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Switch Port",
            labState.switchPort
              ? "Port Gi0/3 on the switch is active."
              : "Port Gi0/3 on the switch is disabled."
          ),
      });

      if (
        scenario.fault ===
        "switch-port"
      ) {
        actions.push({
          label: "Enable Gi0/3",
          icon: "⚡",
          kind: "repair",
          run: () =>
            repair(
              "switchPort",
              "Port Gi0/3 on SW-01 has been enabled successfully."
            ),
        });
      }

      actions.push({
        label: "Inspect VLAN Gi0/3",
        icon: "🏷️",
        kind: "inspect",
        run: () =>
          inspectAction(
            "VLAN Gi0/3",
            labState.vlanCorrect
              ? "Port Gi0/3 is on the correct VLAN."
              : "Port Gi0/3 has been detected on the wrong VLAN."
          ),
      });

      if (scenario.fault === "vlan") {
        actions.push({
          label: "Set VLAN 10",
          icon: "🛠️",
          kind: "repair",
          run: () =>
            repair(
              "vlanCorrect",
              "Port Gi0/3 has been successfully restored to VLAN 10."
            ),
        });
      }
    }

    if (deviceId === "RTR-01") {
      actions.push({
        label: "Inspect Interface",
        icon: "🔍",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Router Interface",
            labState.routerInterface
              ? "Router G0/0 interface is active."
              : "Router G0/0 interface is down."
          ),
      });

      if (
        scenario.fault ===
        "router-interface"
      ) {
        actions.push({
          label: "Enable G0/0",
          icon: "⚡",
          kind: "repair",
          run: () =>
            repair(
              "routerInterface",
              "G0/0 interface on RTR-01 has been enabled successfully."
            ),
        });
      }

      actions.push({
        label: "Inspect DHCP",
        icon: "🧩",
        kind: "inspect",
        run: () =>
          inspectAction(
            "DHCP",
            labState.dhcp
              ? "DHCP service is running normally."
              : "DHCP service is not providing IP addresses to clients."
          ),
      });

      if (scenario.fault === "dhcp") {
        actions.push({
          label: "Start DHCP",
          icon: "▶️",
          kind: "repair",
          run: () =>
            repair(
              "dhcp",
              "DHCP service has been successfully re-enabled."
            ),
        });
      }

      actions.push({
        label: "Inspect DNS",
        icon: "🔎",
        kind: "inspect",
        run: () =>
          inspectAction(
            "DNS",
            labState.dns
              ? "DNS is available."
              : "DNS service is experiencing problems."
          ),
      });

      if (scenario.fault === "dns") {
        actions.push({
          label: "Repair DNS",
          icon: "🛠️",
          kind: "repair",
          run: () =>
            repair(
              "dns",
              "DNS configuration has been successfully repaired."
            ),
        });
      }
    }

    if (deviceId === "AP-01") {
      actions.push({
        label: "Scan Access Point",
        icon: "📡",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Access Point",
            labState.apPowered
              ? "Access Point AP-01 is active and can be detected."
              : "Access Point AP-01 is not responding."
          ),
      });

      actions.push({
        label: "Inspect Uplink",
        icon: "🔌",
        kind: "inspect",
        run: () =>
          inspectAction(
            "AP Uplink",
            labState.apUplink
              ? "AP-01 uplink to the network is active."
              : "AP-01 uplink is not connected."
          ),
      });

      if (scenario.fault === "ap") {
        actions.push({
          label: "Power On AP",
          icon: "⚡",
          kind: "repair",
          run: () =>
            repair(
              "apPowered",
              "Access Point AP-01 has been powered on successfully."
            ),
        });

        actions.push({
          label: "Connect Uplink",
          icon: "🔌",
          kind: "repair",
          run: () =>
            repair(
              "apUplink",
              "AP-01 uplink has been successfully connected to the switch."
            ),
        });
      }

      actions.push({
        label: "Test Wi-Fi",
        icon: "📶",
        kind: "test",
        run: () => {
          const ok =
            labState.apPowered &&
            labState.apUplink;

          addLog(
            ok ? "success" : "error",
            ok
              ? "AP-01 Wi-Fi is ready to use."
              : "Wi-Fi is not available yet."
          );
        },
      });
    }

    if (deviceId === "SRV-01") {
      actions.push({
        label: "Ping Server",
        icon: "📡",
        kind: "test",
        run: () => {
          const ok = runCheck(
            "ping-server",
            labState
          );

          addLog(
            ok ? "success" : "error",
            ok
              ? "Server can be reached through its IP address."
              : "Server cannot be reached yet."
          );
        },
      });

      actions.push({
        label: "Inspect Firewall",
        icon: "🛡️",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Firewall",
            labState.firewall
              ? "Firewall is blocking HTTP TCP/80."
              : "No HTTP block was found in the firewall."
          ),
      });

      if (
        scenario.fault ===
        "firewall"
      ) {
        actions.push({
          label: "Allow HTTP (TCP/80)",
          icon: "🛠️",
          kind: "repair",
          run: () =>
            repair(
              "firewall",
              "HTTP TCP/80 firewall rule has been allowed.",
              false
            ),
        });
      }

      actions.push({
        label: "Test HTTP Service",
        icon: "🌐",
        kind: "test",
        run: () => {
          const ok = runCheck(
            "test-http",
            labState
          );

          addLog(
            ok ? "success" : "error",
            ok
              ? "Server HTTP service is accessible."
              : "HTTP service is still blocked."
          );
        },
      });
    }

    return actions;
  };

  const device =
    BASE_DEVICES.find(
      (item) =>
        item.id === selectedDevice
    ) || BASE_DEVICES[0];

  const currentActions =
    getDeviceActions(
      selectedDevice
    );

  const doneCount =
    completed.length;

  return (
    <div className="troubleshoot-page">
      <header className="tl-header">
        <div className="tl-brand">
          <div className="tl-brand-icon">
            NET
          </div>

          <div className="tl-brand-title">
            Troubleshoot Lab
          </div>
        </div>

        <div className="tl-header-center">
          <span>
            Network Diagnostic Mode
          </span>
        </div>

        <div className="tl-header-right">
          <div
            className={`tl-status ${
              statusText ===
              "NETWORK RESTORED"
                ? "restored"
                : ""
            }`}
          >
            <span className="status-dot"></span>
            {statusText}
          </div>

          <div className="tl-progress">
            <strong>
              {doneCount}/
              {SCENARIOS.length}
            </strong>

            <span>
              scenarios completed
            </span>
          </div>
        </div>
      </header>

      <div className="tl-tabs">
        <button
          className={
            activeTab === "lab"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("lab")
          }
        >
          🧪 Virtual Lab
        </button>

        <button
          className={
            activeTab === "workflow"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("workflow")
          }
        >
          🧭 Workflow
        </button>
      </div>

      <main className="tl-shell">
        {activeTab === "workflow" && (
          <section className="workflow-page">
            <div className="workflow-hero">
              <div>
                <div className="panel-title">
                  TROUBLESHOOTING WORKFLOW
                </div>

                <h1>
                  Inspect → Diagnose →
                  Repair → Test
                </h1>

                <p>
                  Use a systematic
                  troubleshooting workflow
                  so network problems can be
                  identified without making
                  unnecessary changes.
                </p>
              </div>
            </div>

            <div className="workflow-grid">
              <div className="workflow-card">
                <div className="workflow-number">
                  01
                </div>

                <div className="workflow-icon">
                  🔍
                </div>

                <h2>
                  Inspect
                </h2>

                <p>
                  Check the physical condition,
                  devices, ports, adapters, and
                  configurations before making
                  changes.
                </p>
              </div>

              <div className="workflow-card">
                <div className="workflow-number">
                  02
                </div>

                <div className="workflow-icon">
                  🧠
                </div>

                <h2>
                  Diagnose
                </h2>

                <p>
                  Compare symptoms and test
                  results to determine the
                  possible source of the problem.
                </p>
              </div>

              <div className="workflow-card">
                <div className="workflow-number">
                  03
                </div>

                <div className="workflow-icon">
                  🛠️
                </div>

                <h2>
                  Repair
                </h2>

                <p>
                  Perform the appropriate repair
                  based on the identified cause
                  of the problem.
                </p>
              </div>

              <div className="workflow-card">
                <div className="workflow-number">
                  04
                </div>

                <div className="workflow-icon">
                  ✅
                </div>

                <h2>
                  Test
                </h2>

                <p>
                  Test the connection again and
                  make sure all relevant parts
                  of the network are functioning
                  normally.
                </p>
              </div>
            </div>

            <div className="workflow-checklist">
              <div className="panel-title">
                TROUBLESHOOTING CHECKLIST
              </div>

              <div className="checklist-grid">
                <div>
                  <span>✓</span>
                  Check physical connections
                </div>

                <div>
                  <span>✓</span>
                  Check network adapter
                </div>

                <div>
                  <span>✓</span>
                  Check IP configuration
                </div>

                <div>
                  <span>✓</span>
                  Check switch port
                </div>

                <div>
                  <span>✓</span>
                  Check gateway
                </div>

                <div>
                  <span>✓</span>
                  Check network services
                </div>

                <div>
                  <span>✓</span>
                  Perform repairs
                </div>

                <div>
                  <span>✓</span>
                  Test the network again
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "lab" && (
          <>
            <section className="scenario-section">
              <div className="section-top">
                <div>
                  <div className="panel-title">
                    SCENARIO LIBRARY
                  </div>

                  <h1>
                    Network Troubleshooting
                    Cases
                  </h1>
                </div>

                <button
                  className="tiny-button"
                  onClick={() => {
                    const userId =
                      localStorage.getItem(
                        "netlabUserId"
                      );

                    if (userId) {
                      let data = {};

                      try {
                        data = JSON.parse(
                          localStorage.getItem(
                            "netlabTroubleshootCompleted"
                          ) || "{}"
                        );

                        if (
                          !data ||
                          typeof data !==
                            "object" ||
                          Array.isArray(data)
                        ) {
                          data = {};
                        }
                      } catch {
                        data = {};
                      }

                      delete data[
                        String(userId)
                      ];

                      localStorage.setItem(
                        "netlabTroubleshootCompleted",
                        JSON.stringify(data)
                      );
                    }

                    setCompleted([]);
                    resetScenario();

                    addLog(
                      "info",
                      "Troubleshoot Lab scenario progress has been reset."
                    );
                  }}
                >
                  Reset Progress
                </button>
              </div>

              <div className="scenario-grid">
                {SCENARIOS.map(
                  (item) => {
                    const isCompleted =
                      completed.includes(
                        item.id
                      );

                    return (
                      <button
                        key={item.id}
                        className={`scenario-card ${
                          selectedScenario ===
                          item.id
                            ? "selected"
                            : ""
                        } ${
                          isCompleted
                            ? "completed"
                            : ""
                        }`}
                        onClick={() =>
                          loadScenario(
                            item.id
                          )
                        }
                      >
                        <div className="scenario-card-top">
                          <span className="scenario-icon">
                            {item.icon}
                          </span>

                          {isCompleted && (
                            <span className="scenario-check">
                              ✓
                            </span>
                          )}
                        </div>

                        <div className="scenario-name">
                          {item.name}
                        </div>

                        <div className="scenario-title">
                          {item.title}
                        </div>

                        <div className="scenario-meta">
                          <span>
                            {item.level}
                          </span>

                          <span>
                            {item.category}
                          </span>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </section>

            <section className="scenario-hero">
              <div className="scenario-hero-left">
                <div className="scenario-kicker">
                  SCENARIO {scenario.id}
                </div>

                <h1>
                  {scenario.title}
                </h1>

                <div className="scenario-tags">
                  <span>
                    {scenario.level}
                  </span>

                  <span>
                    {scenario.category}
                  </span>
                </div>

                <p className="scenario-objective">
                  <strong>
                    Objective:
                  </strong>{" "}
                  {scenario.objective}
                </p>
              </div>

              <div className="symptom-card">
                <div className="symptom-label">
                  CURRENT SYMPTOM
                </div>

                <p>
                  {scenario.symptom}
                </p>

                <div className="symptom-hint">
                  💡 {scenario.hint}
                </div>
              </div>
            </section>

            <section className="lab-grid">
              <div className="network-panel">
                <div className="terminal-header">
                  <div>
                    <div className="panel-title">
                      NETWORK TOPOLOGY
                    </div>

                    <span>
                      Select a device to
                      inspect
                    </span>
                  </div>
                </div>

                <div className="network-canvas">
                  <div className="network-line line-1"></div>
                  <div className="network-line line-2"></div>
                  <div className="network-line line-3"></div>
                  <div className="network-line line-4"></div>
                  <div className="network-line line-5"></div>

                  {BASE_DEVICES.map(
                    (item) => {
                      const health =
                        deviceHealth(
                          item.id,
                          labState
                        );

                      return (
                        <button
                          key={item.id}
                          className={`device-node ${
                            item.position
                          } ${
                            selectedDevice ===
                            item.id
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedDevice(
                              item.id
                            )
                          }
                        >
                          <span className="device-icon">
                            {item.icon}
                          </span>

                          <span className="device-id">
                            {item.id}
                          </span>

                          <span
                            className={`device-health ${health.toLowerCase()}`}
                          >
                            {health}
                          </span>

                          <span className="device-ip">
                            {item.ip}
                          </span>
                        </button>
                      );
                    }
                  )}

                  <div className="network-label label-lan">
                    LAN 192.168.10.0 /24
                  </div>
                </div>
              </div>

              <aside className="inspector-panel">
                <div className="panel-heading">
                  <div>
                    <div className="panel-title">
                      DEVICE INSPECTOR
                    </div>

                    <span>
                      {device.type} ·{" "}
                      {device.id}
                    </span>
                  </div>

                  <div
                    className={`inspector-health ${deviceHealth(
                      device.id,
                      labState
                    ).toLowerCase()}`}
                  >
                    {deviceHealth(
                      device.id,
                      labState
                    )}
                  </div>
                </div>

                <div className="inspector-device">
                  <div className="inspector-icon">
                    {device.icon}
                  </div>

                  <div>
                    <h3>
                      {device.id}
                    </h3>

                    <p>
                      {device.type}
                    </p>
                  </div>
                </div>

                <div className="device-specs">
                  <div>
                    <span>
                      IP Address
                    </span>

                    <strong>
                      {device.ip}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Interface
                    </span>

                    <strong>
                      {device.id ===
                      "RTR-01"
                        ? "G0/0"
                        : device.id ===
                          "SW-01"
                        ? "Gi0/3"
                        : "Ethernet"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Status
                    </span>

                    <strong>
                      {deviceHealth(
                        device.id,
                        labState
                      )}
                    </strong>
                  </div>
                </div>

                <div className="action-section">
                  <div className="section-label">
                    AVAILABLE ACTIONS
                  </div>

                  {currentActions.length ===
                    0 && (
                    <div className="empty-action">
                      No actions are
                      available for this
                      device.
                    </div>
                  )}

                  {currentActions.map(
                    (
                      action,
                      index
                    ) => (
                      <button
                        key={`${action.label}-${index}`}
                        className={`action-button ${action.kind}`}
                        onClick={
                          action.run
                        }
                      >
                        <span>
                          {action.icon}
                        </span>

                        {action.label}
                      </button>
                    )
                  )}
                </div>
              </aside>
            </section>

            <section className="diagnostic-terminal">
              <div className="terminal-header">
                <div>
                  <div className="panel-title">
                    DIAGNOSTIC CONSOLE
                  </div>

                  <span>
                    Inspection notes and
                    action results
                  </span>
                </div>

                <button
                  className="tiny-button"
                  onClick={() =>
                    setLogs([])
                  }
                >
                  Clear
                </button>
              </div>

              <div className="terminal-body">
                {logs.length === 0 ? (
                  <div className="terminal-empty">
                    Console is empty.
                  </div>
                ) : (
                  logs.map(
                    (
                      log,
                      index
                    ) => (
                      <div
                        className={`log-line ${log.type}`}
                        key={`${log.text}-${index}`}
                      >
                        <span>
                          {log.type ===
                          "success"
                            ? "[OK]"
                            : log.type ===
                              "error"
                            ? "[ERR]"
                            : log.type ===
                              "repair"
                            ? "[FIX]"
                            : log.type ===
                              "inspect"
                            ? "[CHK]"
                            : "[INFO]"}
                        </span>{" "}
                        {log.text}
                      </div>
                    )
                  )
                )}
              </div>
            </section>

            <section className="test-panel">
              <div className="terminal-header">
                <div>
                  <div className="panel-title">
                    NETWORK TEST
                  </div>

                  <span>
                    Verify after the
                    repair
                  </span>
                </div>
              </div>

              <div className="test-actions">
                <button
                  className="primary-action"
                  onClick={
                    testNetwork
                  }
                >
                  ▶ TEST NETWORK
                </button>

                <button
                  className="secondary-action"
                  onClick={
                    resetScenario
                  }
                >
                  ↻ RESET SCENARIO
                </button>
              </div>

              <div className="test-results">
                {testResults.length ===
                0 ? (
                  <div className="test-empty">
                    No tests have been
                    performed yet.
                    Run the test after
                    fixing the problem.
                  </div>
                ) : (
                  testResults.map(
                    (
                      result,
                      index
                    ) => (
                      <div
                        className={`test-result ${
                          result.ok
                            ? "pass"
                            : "fail"
                        }`}
                        key={`${result.name}-${index}`}
                      >
                        <span>
                          {result.ok
                            ? "✓"
                            : "×"}
                        </span>

                        <strong>
                          {result.name}
                        </strong>

                        <em>
                          {result.ok
                            ? "PASS"
                            : "FAIL"}
                        </em>
                      </div>
                    )
                  )
                )}
              </div>
            </section>

            {completed.includes(
              scenario.id
            ) && (
              <div className="success-banner">
                <div className="success-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    NETWORK RESTORED
                  </strong>

                  <p>
                    Scenario completed.
                    You found and fixed
                    the problem:{" "}
                    <b>
                      {scenario.name}
                    </b>
                    .
                  </p>
                </div>

                <button
                  className="primary-action"
                  onClick={() => {
                    const next =
                      SCENARIOS.find(
                        (item) =>
                          !completed.includes(
                            item.id
                          )
                      );

                    if (next) {
                      loadScenario(
                        next.id
                      );
                    } else {
                      addLog(
                        "success",
                        "All Troubleshoot Lab scenarios have been completed."
                      );
                    }
                  }}
                >
                  {completed.length <
                  SCENARIOS.length
                    ? "NEXT SCENARIO →"
                    : "ALL COMPLETE ✓"}
                </button>
              </div>
            )}

            <div className="tl-bottom-navigation">
              <Link
                to="/materi/troubleshoot"
                className="tl-back-material-button"
              >
                ← Back to Material
              </Link>

              <Link
                to="/materi"
                className="tl-all-material-button"
              >
                All Materials →
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}