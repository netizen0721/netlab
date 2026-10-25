import React, { useEffect, useMemo, useState } from "react";
import "./TroubleshootLab.css";
import { updateActivityProgress } from "./utils/progress";

const MATERIALS = [
  {
    id: "method",
    title: "Metode Troubleshooting",
    icon: "🧭",
    content: [
      [
        "1",
        "Identify",
        "Kenali gejala yang muncul: perangkat offline, tidak mendapat IP, tidak bisa ping, tidak bisa membuka layanan, atau koneksi putus-putus.",
      ],
      [
        "2",
        "Inspect",
        "Periksa perangkat, indikator, kabel, port, konfigurasi IP, dan koneksi fisik sebelum mengubah konfigurasi.",
      ],
      [
        "3",
        "Test",
        "Gunakan pengujian bertahap seperti cek link, ipconfig, ping gateway, ping host, dan pemeriksaan layanan.",
      ],
      [
        "4",
        "Diagnose",
        "Bandingkan hasil pengujian dengan konfigurasi yang seharusnya untuk menentukan sumber gangguan.",
      ],
      [
        "5",
        "Repair",
        "Lakukan perubahan sekecil mungkin: sambungkan ulang kabel, aktifkan adapter, perbaiki IP, enable port, atau perbaiki layanan.",
      ],
      [
        "6",
        "Verify",
        "Uji kembali jaringan dari perangkat klien sampai ke gateway dan host tujuan.",
      ],
      [
        "7",
        "Document",
        "Catat penyebab, tindakan perbaikan, dan hasil pengujian agar penanganan mudah diulang.",
      ],
    ],
  },
  {
    id: "physical",
    title: "Gangguan Fisik",
    icon: "🔌",
    content: [
      [
        "Kabel",
        "Link tidak menyala",
        "Periksa apakah kabel terpasang pada kedua sisi, connector RJ45 benar, dan tidak ada indikasi kabel rusak.",
      ],
      [
        "Port",
        "Tidak ada link",
        "Periksa port switch/router. Port yang disabled membuat perangkat terlihat offline walaupun kabel terpasang.",
      ],
      [
        "NIC",
        "Tidak terhubung",
        "Adapter jaringan pada PC dapat disabled. Pastikan adapter aktif sebelum mendiagnosis IP.",
      ],
      [
        "Wi-Fi",
        "Tidak tersambung",
        "Periksa power access point, SSID, dan koneksi uplink AP ke switch/router.",
      ],
    ],
  },
  {
    id: "ip",
    title: "Konfigurasi IP",
    icon: "🌐",
    content: [
      [
        "IP Address",
        "Identitas host",
        "Alamat IP harus berada pada jaringan yang benar dan tidak konflik dengan host lain.",
      ],
      [
        "Subnet Mask",
        "Menentukan network",
        "Subnet mask menentukan bagian network dan host. Kesalahan mask dapat membuat dua host dianggap berbeda jaringan.",
      ],
      [
        "Gateway",
        "Jalur keluar jaringan",
        "Default gateway dibutuhkan untuk mengakses jaringan di luar subnet lokal.",
      ],
      [
        "DHCP",
        "Pemberi alamat otomatis",
        "DHCP memberikan IP, subnet mask, gateway, dan biasanya informasi DNS kepada client.",
      ],
      [
        "DNS",
        "Penerjemah nama",
        "Ping ke IP dapat berhasil sementara akses berbasis nama gagal ketika DNS bermasalah.",
      ],
    ],
  },
  {
    id: "diagnostic",
    title: "Perintah Diagnostik",
    icon: "⌨️",
    content: [
      [
        "ipconfig",
        "Memeriksa konfigurasi",
        "Lihat IP address, subnet mask, default gateway, dan status adapter pada PC Windows.",
      ],
      [
        "ping gateway",
        "Menguji koneksi lokal",
        "Jika gateway gagal diping, fokuskan pemeriksaan pada kabel, NIC, VLAN, IP, atau switch.",
      ],
      [
        "ping host",
        "Menguji end-to-end",
        "Jika gateway berhasil tetapi host tujuan gagal, lanjutkan pemeriksaan jalur dan konfigurasi host tujuan.",
      ],
      [
        "arp",
        "Memeriksa pemetaan",
        "ARP membantu melihat hubungan IP dengan MAC pada jaringan lokal.",
      ],
      [
        "tracert",
        "Melacak jalur",
        "Dapat membantu menemukan titik jaringan yang berhenti merespons pada koneksi antarjaringan.",
      ],
    ],
  },
  {
    id: "wireless",
    title: "Troubleshooting Wi-Fi",
    icon: "📡",
    content: [
      [
        "Power AP",
        "Perangkat harus aktif",
        "Access point yang mati tidak dapat memancarkan SSID maupun meneruskan koneksi wireless.",
      ],
      [
        "SSID",
        "Nama jaringan",
        "Client harus mencari SSID yang benar. SSID yang salah membuat client tersambung ke jaringan yang tidak sesuai atau gagal terhubung.",
      ],
      [
        "Uplink",
        "Jalur ke LAN",
        "AP harus mempunyai koneksi ke switch/router agar client Wi-Fi dapat mengakses jaringan internal.",
      ],
    ],
  },
  {
    id: "services",
    title: "Layanan & Keamanan",
    icon: "🛡️",
    content: [
      [
        "DHCP",
        "Client tidak mendapat IP",
        "Periksa status DHCP sebelum mengganti konfigurasi IP secara manual.",
      ],
      [
        "DNS",
        "Nama domain gagal",
        "Pisahkan masalah DNS dari masalah konektivitas dengan menguji IP address secara langsung.",
      ],
      [
        "Firewall",
        "Ping/service terblokir",
        "Firewall dapat membatasi komunikasi walaupun konfigurasi IP dan link fisik benar.",
      ],
      [
        "VLAN",
        "Host seolah terpisah",
        "Port yang berada pada VLAN berbeda dapat membuat host tidak saling berkomunikasi sesuai desain.",
      ],
    ],
  },
];

const SCENARIOS = [
  {
    id: 1,
    name: "Cable Fault",
    title: "PC-02 Tidak Terhubung",
    level: "Dasar",
    icon: "🔌",
    category: "Physical",
    objective:
      "Temukan gangguan pada jalur PC-02 sampai switch lalu pulihkan koneksi.",
    symptom:
      "PC-02 menunjukkan status OFFLINE dan tidak dapat melakukan ping ke gateway.",
    target: "PC-02",
    fault: "cable",
    expected: ["inspect-cable", "replace-cable", "ping-gateway"],
    hint: "Mulai dari pemeriksaan fisik sebelum menyentuh konfigurasi IP.",
  },
  {
    id: 2,
    name: "Disabled NIC",
    title: "Network Adapter PC-03 Disabled",
    level: "Dasar",
    icon: "🖥️",
    category: "Device",
    objective:
      "Aktifkan adapter jaringan PC-03 dan buktikan bahwa koneksi kembali normal.",
    symptom:
      "PC-03 memiliki kabel yang benar, tetapi sistem tidak memiliki link jaringan aktif.",
    target: "PC-03",
    fault: "adapter",
    expected: ["inspect-adapter", "enable-adapter", "ping-gateway"],
    hint: "Karena kabel sudah benar, lanjutkan pemeriksaan ke adapter jaringan.",
  },
  {
    id: 3,
    name: "Wrong IP",
    title: "Konfigurasi IP PC-01 Salah",
    level: "Menengah",
    icon: "🌐",
    category: "IP Configuration",
    objective:
      "Periksa IP, subnet, dan gateway PC-01 kemudian kembalikan ke jaringan LAN yang benar.",
    symptom:
      "Link fisik aktif, tetapi PC-01 tidak dapat menjangkau gateway.",
    target: "PC-01",
    fault: "ip",
    expected: ["ipconfig", "repair-ip", "ping-gateway"],
    hint: "Gunakan ipconfig untuk memastikan alamat host berada pada subnet yang benar.",
  },
  {
    id: 4,
    name: "Switch Port Down",
    title: "Port Switch untuk PC-03 Disabled",
    level: "Menengah",
    icon: "🔀",
    category: "Switch",
    objective:
      "Temukan port switch yang disabled dan aktifkan kembali tanpa mengubah perangkat lain.",
    symptom:
      "PC-03 dan kabel normal, tetapi link pada sisi switch tidak aktif.",
    target: "SW-01",
    fault: "switch-port",
    expected: ["inspect-port", "enable-port", "ping-gateway"],
    hint: "Bedakan masalah kabel dengan masalah administrasi port switch.",
  },
  {
    id: 5,
    name: "Router Interface Down",
    title: "Gateway Tidak Dapat Dihubungi",
    level: "Menengah",
    icon: "📡",
    category: "Router",
    objective:
      "Periksa interface gateway dan aktifkan kembali interface yang down.",
    symptom:
      "Beberapa client masih memiliki link lokal, tetapi semua gagal mencapai gateway.",
    target: "RTR-01",
    fault: "router-interface",
    expected: ["inspect-interface", "enable-interface", "ping-gateway"],
    hint: "Jika banyak client mengalami gejala yang sama, periksa perangkat jaringan pusat.",
  },
  {
    id: 6,
    name: "Wi-Fi AP Down",
    title: "Client Wi-Fi Tidak Mendapat Koneksi",
    level: "Menengah",
    icon: "📶",
    category: "Wireless",
    objective:
      "Pulihkan access point dan pastikan client wireless dapat terhubung kembali.",
    symptom:
      "SSID NETLAB-LAB tidak dapat digunakan dan client wireless tidak mendapatkan koneksi.",
    target: "AP-01",
    fault: "ap",
    expected: ["inspect-ap", "power-ap", "connect-ap", "ping-gateway"],
    hint: "Access point memerlukan power dan uplink yang aktif agar client bisa masuk ke LAN.",
  },
  {
    id: 7,
    name: "DHCP Down",
    title: "Client Tidak Mendapat IP Otomatis",
    level: "Lanjutan",
    icon: "🧩",
    category: "Service",
    objective:
      "Periksa layanan DHCP dan pulihkan pembagian alamat IP otomatis.",
    symptom:
      "PC-02 dan PC-03 menyala, tetapi konfigurasi IP mereka kosong atau berada pada alamat APIPA.",
    target: "RTR-01",
    fault: "dhcp",
    expected: ["inspect-dhcp", "enable-dhcp", "renew-ip", "ping-gateway"],
    hint: "Jangan langsung memasukkan IP statis. Cari tahu terlebih dahulu mengapa DHCP tidak memberi lease.",
  },
  {
    id: 8,
    name: "DNS Failure",
    title: "Nama Host Tidak Ter-resolve",
    level: "Lanjutan",
    icon: "🔎",
    category: "Service",
    objective:
      "Pisahkan masalah konektivitas IP dari masalah resolusi nama, lalu pulihkan DNS.",
    symptom:
      "Ping gateway dan IP server berhasil, tetapi nama server NETLAB-SRV tidak dapat di-resolve.",
    target: "RTR-01",
    fault: "dns",
    expected: [
      "ping-gateway",
      "ping-server-ip",
      "check-dns",
      "repair-dns",
      "resolve-name",
    ],
    hint: "Konektivitas IP dan DNS adalah dua hal berbeda. Uji keduanya secara terpisah.",
  },
  {
    id: 9,
    name: "Firewall Block",
    title: "Service Server Terblokir",
    level: "Lanjutan",
    icon: "🛡️",
    category: "Security",
    objective:
      "Identifikasi aturan firewall yang menghalangi service lab lalu uji koneksi kembali.",
    symptom:
      "Server aktif dan dapat diping, tetapi service HTTP pada server tidak dapat diakses dari PC-01.",
    target: "SRV-01",
    fault: "firewall",
    expected: ["ping-server", "inspect-firewall", "allow-http", "test-http"],
    hint: "Ping berhasil tidak berarti semua service port juga terbuka.",
  },
  {
    id: 10,
    name: "VLAN Mismatch",
    title: "PC-03 Berada di VLAN yang Salah",
    level: "Lanjutan",
    icon: "🏷️",
    category: "Switch",
    objective:
      "Temukan ketidaksesuaian VLAN pada port PC-03 dan kembalikan port ke VLAN pengguna.",
    symptom:
      "IP PC-03 terlihat masuk akal, tetapi host tidak dapat berkomunikasi dengan gateway VLAN yang seharusnya.",
    target: "SW-01",
    fault: "vlan",
    expected: ["inspect-vlan", "repair-vlan", "ping-gateway"],
    hint: "Kesalahan VLAN dapat membuat kabel, adapter, dan IP tampak benar tetapi tetap tidak terhubung.",
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
      return state.dns && runCheck("ping-server-ip", state);

    case "test-http":
      return !state.firewall && runCheck("ping-server-ip", state);

    default:
      return true;
  }
}

export default function TroubleshootLab() {
  const [activeTab, setActiveTab] = useState("lab");
  const [materialId, setMaterialId] = useState("method");
  const [selectedScenario, setSelectedScenario] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("PC-02");

  const [labState, setLabState] = useState(() =>
    makeScenarioState(SCENARIOS[0].fault)
  );

  const [logs, setLogs] = useState([
    {
      type: "info",
      text: "Simulation siap. Mulai dari panel Gejala lalu lakukan inspeksi.",
    },
  ]);

  const [testResults, setTestResults] = useState([]);

  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("netlabTroubleshootCompleted") || "[]"
      );
    } catch {
      return [];
    }
  });

  const scenario =
    SCENARIOS.find((item) => item.id === selectedScenario) ||
    SCENARIOS[0];

  const currentMaterial =
    MATERIALS.find((item) => item.id === materialId) ||
    MATERIALS[0];

  const statusText = useMemo(() => {
    if (completed.includes(scenario.id)) {
      return "NETWORK RESTORED";
    }

    return "DIAGNOSTIC MODE";
  }, [completed, scenario.id]);



useEffect(() => {
  if (completed.length !== SCENARIOS.length) return;

  const userId = localStorage.getItem("netlabUserId");
  if (!userId) return;

  let cancelled = false;

  async function saveCompletion() {
    try {
      await updateActivityProgress(
        userId,
        "troubleshoot-lab",
        100
      );
    } catch (error) {
      if (!cancelled) {
        console.error("Failed to save Troubleshoot Lab progress:", error);
      }
    }
  }

  saveCompletion();

  return () => {
    cancelled = true;
  };
}, [completed]);



  const addLog = (type, text) => {
    setLogs((prev) => [
      {
        type,
        text,
      },
      ...prev,
    ].slice(0, 10));
  };

  const persistCompleted = (scenarioId) => {
    setCompleted((prev) => {
      const next = prev.includes(scenarioId)
        ? prev
        : [...prev, scenarioId];

      localStorage.setItem(
        "netlabTroubleshootCompleted",
        JSON.stringify(next)
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
      SCENARIOS.find((item) => item.id === id) ||
      SCENARIOS[0];

    setSelectedScenario(next.id);
    setSelectedDevice(next.target);
    setLabState(makeScenarioState(next.fault));

    setLogs([
      {
        type: "info",
        text: `Scenario dimuat: ${next.title}. Baca gejala sebelum melakukan perbaikan.`,
      },
    ]);

    setTestResults([]);
    setActiveTab("lab");
  };

  const resetScenario = () => {
    setLabState(makeScenarioState(scenario.fault));
    setSelectedDevice(scenario.target);

    setLogs([
      {
        type: "info",
        text: "Scenario di-reset. Semua kondisi gangguan dikembalikan.",
      },
    ]);

    setTestResults([]);
  };

  const inspectAction = (action, description) => {
    addLog("inspect", description);

    setTestResults((prev) =>
      [
        ...prev,
        {
          name: action,
          ok: true,
          text: `${action}: pemeriksaan selesai.`,
        },
      ].slice(-6)
    );
  };

  const repair = (key, description, value = true) => {
    setLabState((prev) => ({
      ...prev,
      [key]: value,
    }));

    addLog("repair", description);
  };

  const testNetwork = () => {
    const checks = [
      {
        name: "Link fisik",
        ok: labState.cable,
      },
      {
        name: "Adapter jaringan",
        ok: labState.adapter,
      },
      {
        name: "Konfigurasi IP",
        ok: labState.ipCorrect,
      },
      {
        name: "Port switch",
        ok: labState.switchPort,
      },
      {
        name: "Interface router",
        ok: labState.routerInterface,
      },
      {
        name: "VLAN",
        ok: labState.vlanCorrect,
      },
      {
        name: "Access Point",
        ok: labState.apPowered && labState.apUplink,
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
        "Link fisik",
        "Adapter jaringan",
        "Port switch",
        "Interface router",
        "VLAN",
      ],

      adapter: [
        "Adapter jaringan",
        "Link fisik",
        "Port switch",
        "Interface router",
        "VLAN",
      ],

      ip: [
        "Konfigurasi IP",
        "Link fisik",
        "Adapter jaringan",
        "Port switch",
        "Interface router",
        "VLAN",
      ],

      "switch-port": [
        "Port switch",
        "Link fisik",
        "Adapter jaringan",
        "Interface router",
        "VLAN",
      ],

      "router-interface": [
        "Interface router",
        "Port switch",
        "Link fisik",
        "Adapter jaringan",
        "VLAN",
      ],

      ap: [
        "Access Point",
        "Interface router",
      ],

      dhcp: [
        "DHCP",
        "Link fisik",
        "Adapter jaringan",
        "Port switch",
      ],

      dns: [
        "DNS",
        "DHCP",
        "Interface router",
      ],

      firewall: [
        "HTTP Firewall",
        "Link fisik",
        "Adapter jaringan",
        "Port switch",
        "Interface router",
      ],

      vlan: [
        "VLAN",
        "Port switch",
        "Konfigurasi IP",
        "Interface router",
      ],
    };

    const relevant =
      relevantByFault[scenario.fault] ||
      checks.map((check) => check.name);

    const results = checks.filter((check) =>
      relevant.includes(check.name)
    );

    setTestResults(results);

    const fixed = results.every(
      (result) => result.ok
    );

    if (fixed) {
      addLog(
        "success",
        "Semua pemeriksaan terkait berhasil. Jaringan dapat digunakan kembali."
      );

      persistCompleted(scenario.id);
    } else {
      const failed = results
        .filter((result) => !result.ok)
        .map((result) => result.name)
        .join(", ");

      addLog(
        "error",
        `Masih ditemukan masalah pada: ${failed}. Lanjutkan inspeksi dan perbaikan.`
      );
    }
  };

  const getDeviceActions = (deviceId) => {
    const actions = [];

    if (deviceId === "PC-01") {
      actions.push({
        label: "Jalankan ipconfig",
        icon: "⌨️",
        kind: "inspect",
        run: () =>
          inspectAction(
            "ipconfig",
            labState.ipCorrect
              ? "PC-01 memiliki konfigurasi IP yang sesuai."
              : "PC-01 memiliki konfigurasi IP yang tidak sesuai."
          ),
      });

      actions.push({
        label: "Periksa Network Adapter",
        icon: "🔍",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Network Adapter",
            labState.adapter
              ? "Network adapter PC-01 aktif."
              : "Network adapter PC-01 terdeteksi bermasalah."
          ),
      });

      if (scenario.fault === "ip") {
        actions.push({
          label: "Perbaiki IP & Gateway",
          icon: "🛠️",
          kind: "repair",
          run: () =>
            repair(
              "ipCorrect",
              "Konfigurasi IP dan default gateway PC-01 telah diperbaiki."
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
              ? "Ping ke gateway 192.168.10.1 berhasil."
              : "Ping ke gateway gagal."
          );
        },
      });
    }

    if (deviceId === "PC-02") {
      actions.push({
        label: "Periksa Network Adapter",
        icon: "🔍",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Network Adapter",
            labState.adapter
              ? "Adapter PC-02 aktif."
              : "Adapter PC-02 sedang disabled."
          ),
      });

      actions.push({
        label: "Periksa Kabel",
        icon: "🔌",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Kabel",
            labState.cable
              ? "Kabel PC-02 terhubung dengan benar."
              : "Kabel PC-02 terdeteksi bermasalah."
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
              "Network adapter PC-02 berhasil diaktifkan."
            ),
        });
      }

      if (scenario.fault === "cable") {
        actions.push({
          label: "Ganti Kabel UTP",
          icon: "🛠️",
          kind: "repair",
          run: () =>
            repair(
              "cable",
              "Kabel UTP PC-02 berhasil diganti."
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
                "PC-02 berhasil mendapatkan DHCP lease baru."
              );
            } else {
              addLog(
                "error",
                "Renew IP gagal karena DHCP server masih bermasalah."
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
              ? "Ping gateway dari PC-02 berhasil."
              : "PC-02 belum dapat menjangkau gateway."
          );
        },
      });
    }

    if (deviceId === "PC-03") {
      actions.push({
        label: "Jalankan ipconfig",
        icon: "⌨️",
        kind: "inspect",
        run: () =>
          inspectAction(
            "ipconfig",
            labState.vlanCorrect
              ? "Konfigurasi IP PC-03 terlihat sesuai."
              : "Konfigurasi IP PC-03 terlihat normal, tetapi VLAN perlu diperiksa."
          ),
      });

      actions.push({
        label: "Periksa Network Adapter",
        icon: "🔍",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Network Adapter",
            labState.adapter
              ? "Network adapter PC-03 aktif."
              : "Network adapter PC-03 sedang disabled."
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
              "Network adapter PC-03 berhasil diaktifkan."
            ),
        });
      }

      if (scenario.fault === "vlan") {
        actions.push({
          label: "Uji Gateway",
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
                ? "PC-03 berhasil menjangkau gateway."
                : "PC-03 gagal menjangkau gateway. Periksa VLAN."
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
                "PC-03 berhasil mendapatkan DHCP lease baru."
              );
            } else {
              addLog(
                "error",
                "Renew IP gagal karena DHCP server masih bermasalah."
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
              ? "Ping gateway dari PC-03 berhasil."
              : "PC-03 belum dapat menjangkau gateway."
          );
        },
      });
    }

    if (deviceId === "SW-01") {
      actions.push({
        label: "Periksa Port PC-03",
        icon: "🔍",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Switch Port",
            labState.switchPort
              ? "Port Gi0/3 pada switch aktif."
              : "Port Gi0/3 pada switch dalam kondisi disabled."
          ),
      });

      if (scenario.fault === "switch-port") {
        actions.push({
          label: "Enable Gi0/3",
          icon: "⚡",
          kind: "repair",
          run: () =>
            repair(
              "switchPort",
              "Port Gi0/3 pada SW-01 berhasil diaktifkan."
            ),
        });
      }

      actions.push({
        label: "Periksa VLAN Gi0/3",
        icon: "🏷️",
        kind: "inspect",
        run: () =>
          inspectAction(
            "VLAN Gi0/3",
            labState.vlanCorrect
              ? "Port Gi0/3 berada pada VLAN yang sesuai."
              : "Port Gi0/3 terdeteksi berada pada VLAN yang salah."
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
              "Port Gi0/3 berhasil dikembalikan ke VLAN 10."
            ),
        });
      }
    }

    if (deviceId === "RTR-01") {
      actions.push({
        label: "Periksa Interface",
        icon: "🔍",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Router Interface",
            labState.routerInterface
              ? "Interface G0/0 router aktif."
              : "Interface G0/0 router dalam kondisi down."
          ),
      });

      if (scenario.fault === "router-interface") {
        actions.push({
          label: "Enable G0/0",
          icon: "⚡",
          kind: "repair",
          run: () =>
            repair(
              "routerInterface",
              "Interface G0/0 pada RTR-01 berhasil diaktifkan."
            ),
        });
      }

      actions.push({
        label: "Periksa DHCP",
        icon: "🧩",
        kind: "inspect",
        run: () =>
          inspectAction(
            "DHCP",
            labState.dhcp
              ? "Layanan DHCP berjalan normal."
              : "Layanan DHCP tidak memberikan IP kepada client."
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
              "Layanan DHCP berhasil diaktifkan kembali."
            ),
        });
      }

      actions.push({
        label: "Periksa DNS",
        icon: "🔎",
        kind: "inspect",
        run: () =>
          inspectAction(
            "DNS",
            labState.dns
              ? "DNS dapat digunakan."
              : "DNS service sedang bermasalah."
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
              "Konfigurasi DNS berhasil diperbaiki."
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
              ? "Access Point AP-01 aktif dan dapat ditemukan."
              : "Access Point AP-01 tidak merespons."
          ),
      });

      actions.push({
        label: "Periksa Uplink",
        icon: "🔌",
        kind: "inspect",
        run: () =>
          inspectAction(
            "AP Uplink",
            labState.apUplink
              ? "Uplink AP-01 ke jaringan aktif."
              : "Uplink AP-01 tidak terhubung."
          ),
      });

      if (scenario.fault === "ap") {
        actions.push({
          label: "Nyalakan AP",
          icon: "⚡",
          kind: "repair",
          run: () =>
            repair(
              "apPowered",
              "Access Point AP-01 berhasil dinyalakan."
            ),
        });

        actions.push({
          label: "Connect Uplink",
          icon: "🔌",
          kind: "repair",
          run: () =>
            repair(
              "apUplink",
              "Uplink AP-01 berhasil terhubung ke switch."
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
              ? "Wi-Fi AP-01 dapat digunakan."
              : "Wi-Fi belum dapat digunakan."
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
              ? "Server dapat dijangkau melalui IP address."
              : "Server belum dapat dijangkau."
          );
        },
      });

      actions.push({
        label: "Periksa Firewall",
        icon: "🛡️",
        kind: "inspect",
        run: () =>
          inspectAction(
            "Firewall",
            labState.firewall
              ? "Firewall sedang memblokir HTTP TCP/80."
              : "Tidak ditemukan blokir HTTP pada firewall."
          ),
      });

      if (scenario.fault === "firewall") {
        actions.push({
          label: "Allow HTTP (TCP/80)",
          icon: "🛠️",
          kind: "repair",
          run: () =>
            repair(
              "firewall",
              "Rule firewall HTTP TCP/80 berhasil diizinkan.",
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
              ? "HTTP service server dapat diakses."
              : "HTTP service masih terblokir."
          );
        },
      });
    }

    return actions;
  };

  const device =
    BASE_DEVICES.find(
      (item) => item.id === selectedDevice
    ) || BASE_DEVICES[0];

  const currentActions =
    getDeviceActions(selectedDevice);

  const doneCount = completed.length;

  return (
    <div className="troubleshoot-page">
      <header className="tl-header">
        <div className="tl-brand">
          <div className="tl-brand-icon">NET</div>

          <div>
            <div className="tl-brand-title">
              NETLAB PRACTICUM
            </div>

            <div className="tl-brand-subtitle">
              TROUBLESHOOT LAB
            </div>
          </div>
        </div>

        <div className="tl-header-center">
          <span>Network Diagnostic Mode</span>
        </div>

        <div className="tl-header-right">
          <div
            className={`tl-status ${
              statusText === "NETWORK RESTORED"
                ? "restored"
                : ""
            }`}
          >
            <span className="status-dot"></span>
            {statusText}
          </div>

          <div className="tl-progress">
            <strong>
              {doneCount}/{SCENARIOS.length}
            </strong>

            <span>scenario selesai</span>
          </div>
        </div>
      </header>

      <div className="tl-tabs">
        <button
          className={
            activeTab === "materi" ? "active" : ""
          }
          onClick={() => setActiveTab("materi")}
        >
          📚 Materi
        </button>

        <button
          className={
            activeTab === "lab" ? "active" : ""
          }
          onClick={() => setActiveTab("lab")}
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
        {activeTab === "materi" && (
          <section className="tl-material-layout">
            <aside className="material-sidebar">
              <div className="sidebar-title">
                TROUBLESHOOTING MATERIAL
              </div>

              <div className="material-list">
                {MATERIALS.map((material) => (
                  <button
                    key={material.id}
                    className={
                      materialId === material.id
                        ? "material-item active"
                        : "material-item"
                    }
                    onClick={() =>
                      setMaterialId(material.id)
                    }
                  >
                    <span className="material-item-icon">
                      {material.icon}
                    </span>

                    <span>
                      {material.title}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <section className="material-content">
              <div className="material-hero">
                <div className="material-hero-icon">
                  {currentMaterial.icon}
                </div>

                <div>
                  <div className="panel-title">
                    NETWORK TROUBLESHOOTING
                  </div>

                  <h1>
                    {currentMaterial.title}
                  </h1>

                  <p>
                    Pahami konsep dasar sebelum
                    melakukan troubleshooting
                    pada virtual lab.
                  </p>
                </div>
              </div>

              <div className="material-grid">
                {currentMaterial.content.map(
                  (item, index) => (
                    <article
                      className="material-card"
                      key={`${item[0]}-${index}`}
                    >
                      <div className="material-card-number">
                        {item[0]}
                      </div>

                      <div>
                        <h3>{item[1]}</h3>
                        <p>{item[2]}</p>
                      </div>
                    </article>
                  )
                )}
              </div>

              <div className="material-callout">
                <span>💡</span>

                <div>
                  <strong>
                    Ingat prinsip troubleshooting
                  </strong>

                  <p>
                    Jangan langsung mengganti
                    konfigurasi. Mulai dari gejala,
                    lakukan inspeksi, tentukan
                    penyebab, lakukan perbaikan,
                    kemudian verifikasi hasilnya.
                  </p>
                </div>
              </div>
            </section>
          </section>
        )}

        {activeTab === "workflow" && (
          <section className="workflow-page">
            <div className="workflow-hero">
              <div>
                <div className="panel-title">
                  TROUBLESHOOTING WORKFLOW
                </div>

                <h1>
                  Inspect → Diagnose → Repair → Test
                </h1>

                <p>
                  Gunakan alur troubleshooting
                  secara sistematis agar masalah
                  jaringan dapat ditemukan tanpa
                  melakukan perubahan yang tidak
                  diperlukan.
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

                <h2>Inspect</h2>

                <p>
                  Periksa kondisi fisik, perangkat,
                  port, adapter, dan konfigurasi
                  sebelum melakukan perubahan.
                </p>
              </div>

              <div className="workflow-card">
                <div className="workflow-number">
                  02
                </div>

                <div className="workflow-icon">
                  🧠
                </div>

                <h2>Diagnose</h2>

                <p>
                  Bandingkan gejala dan hasil
                  pengujian untuk menentukan
                  kemungkinan sumber gangguan.
                </p>
              </div>

              <div className="workflow-card">
                <div className="workflow-number">
                  03
                </div>

                <div className="workflow-icon">
                  🛠️
                </div>

                <h2>Repair</h2>

                <p>
                  Lakukan tindakan perbaikan
                  yang sesuai dengan penyebab
                  masalah yang ditemukan.
                </p>
              </div>

              <div className="workflow-card">
                <div className="workflow-number">
                  04
                </div>

                <div className="workflow-icon">
                  ✅
                </div>

                <h2>Test</h2>

                <p>
                  Uji kembali koneksi dan pastikan
                  seluruh bagian jaringan yang
                  relevan sudah kembali normal.
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
                  Periksa koneksi fisik
                </div>

                <div>
                  <span>✓</span>
                  Periksa adapter jaringan
                </div>

                <div>
                  <span>✓</span>
                  Periksa konfigurasi IP
                </div>

                <div>
                  <span>✓</span>
                  Periksa port switch
                </div>

                <div>
                  <span>✓</span>
                  Periksa gateway
                </div>

                <div>
                  <span>✓</span>
                  Periksa layanan jaringan
                </div>

                <div>
                  <span>✓</span>
                  Lakukan perbaikan
                </div>

                <div>
                  <span>✓</span>
                  Test ulang jaringan
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
                    Network Troubleshooting Cases
                  </h1>
                </div>

                <button
                  className="tiny-button"
                  onClick={() => {
                    localStorage.removeItem(
                      "netlabTroubleshootCompleted"
                    );

                    setCompleted([]);
                    resetScenario();

                    addLog(
                      "info",
                      "Progress scenario Troubleshoot Lab telah di-reset."
                    );
                  }}
                >
                  Reset Progress
                </button>
              </div>

              <div className="scenario-grid">
                {SCENARIOS.map((item) => {
                  const isCompleted =
                    completed.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      className={`scenario-card ${
                        selectedScenario === item.id
                          ? "selected"
                          : ""
                      } ${
                        isCompleted
                          ? "completed"
                          : ""
                      }`}
                      onClick={() =>
                        loadScenario(item.id)
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
                })}
              </div>
            </section>

            <section className="scenario-hero">
              <div className="scenario-hero-left">
                <div className="scenario-kicker">
                  SCENARIO {scenario.id}
                </div>

                <h1>{scenario.title}</h1>

                <div className="scenario-tags">
                  <span>{scenario.level}</span>
                  <span>{scenario.category}</span>
                </div>

                <p className="scenario-objective">
                  <strong>Objective:</strong>{" "}
                  {scenario.objective}
                </p>
              </div>

              <div className="symptom-card">
                <div className="symptom-label">
                  CURRENT SYMPTOM
                </div>

                <p>{scenario.symptom}</p>

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
                      Select a device to inspect
                    </span>
                  </div>
                </div>

                <div className="network-canvas">
                  <div className="network-line line-1"></div>
                  <div className="network-line line-2"></div>
                  <div className="network-line line-3"></div>
                  <div className="network-line line-4"></div>
                  <div className="network-line line-5"></div>

                  {BASE_DEVICES.map((item) => {
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
                  })}

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
                      {device.type} · {device.id}
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
                    <h3>{device.id}</h3>
                    <p>{device.type}</p>
                  </div>
                </div>

                <div className="device-specs">
                  <div>
                    <span>IP Address</span>
                    <strong>
                      {device.ip}
                    </strong>
                  </div>

                  <div>
                    <span>Interface</span>

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
                    <span>Status</span>

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
                      Belum ada tindakan untuk
                      perangkat ini.
                    </div>
                  )}

                  {currentActions.map(
                    (action, index) => (
                      <button
                        key={`${action.label}-${index}`}
                        className={`action-button ${action.kind}`}
                        onClick={action.run}
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
                    Catatan inspeksi dan hasil
                    tindakan
                  </span>
                </div>

                <button
                  className="tiny-button"
                  onClick={() => setLogs([])}
                >
                  Clear
                </button>
              </div>

              <div className="terminal-body">
                {logs.length === 0 ? (
                  <div className="terminal-empty">
                    Console kosong.
                  </div>
                ) : (
                  logs.map((log, index) => (
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
                  ))
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
                    Verifikasi setelah perbaikan
                  </span>
                </div>
              </div>

              <div className="test-actions">
                <button
                  className="primary-action"
                  onClick={testNetwork}
                >
                  ▶ TEST NETWORK
                </button>

                <button
                  className="secondary-action"
                  onClick={resetScenario}
                >
                  ↻ RESET SCENARIO
                </button>
              </div>

              <div className="test-results">
                {testResults.length === 0 ? (
                  <div className="test-empty">
                    Belum ada pengujian. Jalankan
                    test setelah memperbaiki
                    masalah.
                  </div>
                ) : (
                  testResults.map(
                    (result, index) => (
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
                    Scenario selesai. Kamu
                    menemukan dan memperbaiki
                    gangguan:{" "}
                    <b>{scenario.name}</b>.
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
                        "Semua scenario Troubleshoot Lab telah selesai."
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
          </>
        )}
      </main>
    </div>
  );
}