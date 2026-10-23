import { useRef, useState } from "react";

import { Link } from "react-router-dom";

import { Canvas } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";

import SwitchModel from "../components/SwitchModel";

import RouterModel from "../components/RouterModel";

import ServerModel from "../components/ServerModel";

import ModemModel from "../components/ModemModel";

import PCDesktopModel from "../components/PCDesktopModel";

import LaptopModel from "../components/LaptopModel";

import PrinterModel from "../components/PrinterModel";

import AccessPointModel from "../components/AccessPointModel";

import "./ARHardware.css";

function ARHardware() {
  const complete3DHardwareLab = () => {
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
        item.activityId === "3d-hardware-lab"
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
        activityId: "3d-hardware-lab",
        title: "3D Hardware Lab",
        type: "Interactive Lab",
        order: 3,
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
      "3D Hardware Lab"
    );
  };

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedRouterPart, setSelectedRouterPart] = useState(null);
  const [selectedServerPart, setSelectedServerPart] = useState(null);
  const [selectedModemPart, setSelectedModemPart] = useState(null);
  const [selectedPCPart, setSelectedPCPart] = useState(null);
  const [selectedLaptopPart, setSelectedLaptopPart] = useState(null);
  const [selectedPrinterPart, setSelectedPrinterPart] = useState(null);
  const [selectedAccessPointPart, setSelectedAccessPointPart] =
    useState(null);

  const switchControlsRef = useRef();
  const routerControlsRef = useRef();
  const serverControlsRef = useRef();
  const modemControlsRef = useRef();
  const pcControlsRef = useRef();
  const laptopControlsRef = useRef();
  const printerControlsRef = useRef();
  const accessPointControlsRef = useRef();

  const devices = [
    {
      name: "Switch",
      icon: "🔀",
      description:
        "A device that connects multiple devices within a LAN.",
    },

    {
      name: "Router",
      icon: "📡",
      description:
        "A device that connects different networks and determines the path for data packets.",
    },

    {
      name: "Server",
      icon: "🖥️",
      description:
        "A computer that provides services and resources to other devices on a network.",
    },

    {
      name: "Access Point",
      icon: "📶",
      description:
        "A device that provides wireless network or Wi-Fi access.",
    },

    {
      name: "Modem",
      icon: "🌐",
      description:
        "A device that connects a local network to an internet service.",
    },

    {
      name: "PC Desktop",
      icon: "💻",
      description:
        "A desktop computer used as a user device within a network.",
    },

    {
      name: "Laptop",
      icon: "💻",
      description:
        "A portable computer that can connect to a network using a cable or Wi-Fi.",
    },

    {
      name: "Printer",
      icon: "🖨️",
      description:
        "A printer that can be shared by multiple devices over a network.",
    },
  ];

  const switchParts = [
    {
      name: "Ethernet Port",
      camera: [2.8, 0.5, 3.8],
      target: [0, 0, 0],
      description:
        "The Ethernet port is used to connect the switch to other network devices using an Ethernet cable.",
    },

    {
      name: "LED Indicator",
      camera: [2.5, 1.8, 3.2],
      target: [0, 0.3, 0],
      description:
        "The LED indicator shows the power status and connection activity of the switch.",
    },

    {
      name: "Casing",
      camera: [4, 2.5, 4],
      target: [0, 0, 0],
      description:
        "The casing protects the internal components of the switch from impact and dust.",
    },
  ];

  const routerParts = [
    {
      name: "LAN Port",
      camera: [3, 0.7, 4],
      target: [0, 0, 0],
      description:
        "The LAN port is used to connect the router to network devices using an Ethernet cable.",
    },

    {
      name: "LED Indicator",
      camera: [2.5, 1.7, 3.5],
      target: [0, 0.3, 0],
      description:
        "The LED indicator shows the power status and network connection status of the router.",
    },

    {
      name: "Antenna",
      camera: [3.5, 2.8, 3.5],
      target: [0, 0.8, 0],
      description:
        "The antenna is used to transmit and receive wireless network signals.",
    },

    {
      name: "Casing",
      camera: [4, 2.5, 4],
      target: [0, 0, 0],
      description:
        "The casing protects the internal components of the router.",
    },
  ];

  const serverParts = [
    {
      name: "Front Panel",
      camera: [3.8, 1.5, 4],
      target: [0, 0, 0],
      description:
        "The front panel of a server contains various indicators and components that can be accessed from the front.",
    },

    {
      name: "Drive / Storage",
      camera: [3, 0.5, 4],
      target: [0, -0.3, 0],
      description:
        "The drive or storage is used to store the operating system, applications, and server data.",
    },

    {
      name: "Cooling / Fan",
      camera: [-3.5, 1.5, 4],
      target: [0, 0.3, 0],
      description:
        "The cooling fan helps maintain a stable temperature for the server components.",
    },

    {
      name: "Port & Connection",
      camera: [-4, 1.5, -4],
      target: [0, 0, 0],
      description:
        "Ports and connections are used to connect the server to other network devices.",
    },

    {
      name: "Rack / Casing",
      camera: [5, 3, 5],
      target: [0, 0, 0],
      description:
        "The rack or casing serves as a housing for various server components.",
    },
  ];

  const accessPointParts = [
    {
      name: "Antenna",
      camera: [4, 2.5, 5],
      target: [0, 0.5, 0],
      description:
        "The antenna is used to transmit and receive Wi-Fi signals.",
    },

    {
      name: "LED Indicator",
      camera: [3, 1.5, 4],
      target: [0, 0, 0],
      description:
        "The LED indicator shows the power status and activity of the access point.",
    },

    {
      name: "LAN Port",
      camera: [-3, 0.5, 4],
      target: [0, -0.2, 0],
      description:
        "The LAN port is used to connect the access point to a network using an Ethernet cable.",
    },

    {
      name: "Panel / Button",
      camera: [4, 1.5, -4],
      target: [0, 0, 0],
      description:
        "The panel and buttons are used to configure or adjust the device.",
    },

    {
      name: "Casing",
      camera: [4, 3, 5],
      target: [0, 0, 0],
      description:
        "The casing protects the internal components of the access point.",
    },
  ];

  const modemParts = [
    {
      name: "LAN Port",
      camera: [3, 0.8, 4],
      target: [0, 0, 0],
      description:
        "The LAN port is used to connect the modem to a router or computer.",
    },

    {
      name: "LED Indicator",
      camera: [2.5, 1.7, 3.5],
      target: [0, 0.3, 0],
      description:
        "The LED indicator shows the power status and connection status of the modem.",
    },

    {
      name: "Casing",
      camera: [4, 2.5, 4],
      target: [0, 0, 0],
      description:
        "The casing protects the internal components of the modem.",
    },

    {
      name: "Stand",
      camera: [3, -1, 4],
      target: [0, -0.7, 0],
      description:
        "The stand keeps the modem stable in its position.",
    },
  ];

  const pcParts = [
    {
      name: "Monitor",
      camera: [-2.8, 1.6, 4.2],
      target: [-0.65, 0.35, 0],
      description:
        "The monitor is an output device used to display visual information from the computer.",
    },

    {
      name: "System Unit",
      camera: [4, 1.5, 4],
      target: [0.8, -0.25, 0.1],
      description:
        "The system unit is the main part of a computer that contains components such as the motherboard, processor, RAM, storage, and power supply.",
    },

    {
      name: "Keyboard",
      camera: [-2.8, -0.45, 3.4],
      target: [-0.75, -0.82, 0.15],
      description:
        "The keyboard is an input device used to enter text, numbers, and commands into the computer.",
    },

    {
      name: "Mouse",
      camera: [3.0, -0.45, 3.4],
      target: [0.65, -0.82, 0.15],
      description:
        "The mouse is an input device used to move the pointer and select objects on the computer.",
    },

    {
      name: "Port / Connection",
      camera: [-5, 1, -5],
      target: [0, 0, 0],
      description:
        "Ports and connections are used to connect the computer to other devices such as a monitor, keyboard, mouse, and network.",
    },
  ];

  const laptopParts = [
    {
      name: "Screen",
      camera: [3.5, 2.5, 4.5],
      target: [0, 0.6, 0],
      description:
        "The screen is used to display visual information from the laptop.",
    },

    {
      name: "Keyboard",
      camera: [-3, 0.3, 4],
      target: [-0.2, 0, 0],
      description:
        "The keyboard is used to enter text, numbers, and commands into the laptop.",
    },

    {
      name: "Touchpad",
      camera: [2.5, -0.5, 3.5],
      target: [0, -0.2, 0],
      description:
        "The touchpad is used to move the pointer without using an external mouse.",
    },

    {
      name: "Webcam",
      camera: [0, 2.8, 4],
      target: [0, 1.2, 0],
      description:
        "The webcam is used to capture images or video, for example during a video conference.",
    },

    {
      name: "Port / Connection",
      camera: [-4, 1, -4],
      target: [0, 0, 0],
      description:
        "Ports and connections are used to connect the laptop to other devices.",
    },

    {
      name: "Casing",
      camera: [4, 3, 5],
      target: [0, 0, 0],
      description:
        "The casing protects the internal components of the laptop.",
    },
  ];

  const printerParts = [
    {
      name: "Paper Tray",
      camera: [3, 1, 4],
      target: [0, -0.2, 0],
      description:
        "The paper tray is used to hold paper before the printing process.",
    },

    {
      name: "Output Tray",
      camera: [3, 0.2, 4],
      target: [0, -0.6, 0],
      description:
        "The output tray is used to hold printed paper.",
    },

    {
      name: "Control Panel",
      camera: [2.5, 2, 3.5],
      target: [0, 0.4, 0],
      description:
        "The control panel is used to manage various printer functions.",
    },

    {
      name: "Ink / Cartridge",
      camera: [-3, 1, 4],
      target: [0, 0, 0],
      description:
        "The ink or cartridge stores the ink used during the printing process.",
    },

    {
      name: "Port / Connection",
      camera: [-4, 1, -4],
      target: [0, 0, 0],
      description:
        "Ports and connections are used to connect the printer to a network or other devices.",
    },

    {
      name: "Casing",
      camera: [4, 3, 5],
      target: [0, 0, 0],
      description:
        "The casing protects the internal components of the printer.",
    },
  ];

  const selectDevice = (device) => {
    complete3DHardwareLab();

    setSelectedDevice(device);
    setSelectedPart(null);
    setSelectedRouterPart(null);
    setSelectedServerPart(null);
    setSelectedModemPart(null);
    setSelectedPCPart(null);
    setSelectedLaptopPart(null);
    setSelectedPrinterPart(null);
    setSelectedAccessPointPart(null);
  };

  const backToDevices = () => {
    setSelectedDevice(null);
    setSelectedPart(null);
    setSelectedRouterPart(null);
    setSelectedServerPart(null);
    setSelectedModemPart(null);
    setSelectedPCPart(null);
    setSelectedLaptopPart(null);
    setSelectedPrinterPart(null);
    setSelectedAccessPointPart(null);
  };

  const resetSwitchView = () => {
    setSelectedPart(null);

    if (switchControlsRef.current) {
      switchControlsRef.current.reset();
    }
  };

  const resetRouterView = () => {
    setSelectedRouterPart(null);

    if (routerControlsRef.current) {
      routerControlsRef.current.reset();
    }
  };

  const resetServerView = () => {
    setSelectedServerPart(null);

    if (serverControlsRef.current) {
      serverControlsRef.current.reset();
    }
  };

  const resetModemView = () => {
    setSelectedModemPart(null);

    if (modemControlsRef.current) {
      modemControlsRef.current.reset();
    }
  };

  const resetPCView = () => {
    setSelectedPCPart(null);

    if (pcControlsRef.current) {
      pcControlsRef.current.reset();
    }
  };

  const resetLaptopView = () => {
    setSelectedLaptopPart(null);

    if (laptopControlsRef.current) {
      laptopControlsRef.current.reset();
    }
  };

  const resetPrinterView = () => {
    setSelectedPrinterPart(null);

    if (printerControlsRef.current) {
      printerControlsRef.current.reset();
    }
  };

  const resetAccessPointView = () => {
    setSelectedAccessPointPart(null);

    if (accessPointControlsRef.current) {
      accessPointControlsRef.current.reset();
    }
  };

  const focusSwitchPart = (part) => {
    setSelectedPart(part.name);

    if (switchControlsRef.current) {
      switchControlsRef.current.object.position.set(
        ...part.camera
      );

      switchControlsRef.current.target.set(
        ...part.target
      );

      switchControlsRef.current.update();
    }
  };

  const focusRouterPart = (part) => {
    setSelectedRouterPart(part.name);

    if (routerControlsRef.current) {
      routerControlsRef.current.object.position.set(
        ...part.camera
      );

      routerControlsRef.current.target.set(
        ...part.target
      );

      routerControlsRef.current.update();
    }
  };

  const focusServerPart = (part) => {
    setSelectedServerPart(part.name);

    if (serverControlsRef.current) {
      serverControlsRef.current.object.position.set(
        ...part.camera
      );

      serverControlsRef.current.target.set(
        ...part.target
      );

      serverControlsRef.current.update();
    }
  };

  const focusModemPart = (part) => {
    setSelectedModemPart(part.name);

    if (modemControlsRef.current) {
      modemControlsRef.current.object.position.set(
        ...part.camera
      );

      modemControlsRef.current.target.set(
        ...part.target
      );

      modemControlsRef.current.update();
    }
  };

  const focusPCPart = (part) => {
    setSelectedPCPart(part.name);

    if (pcControlsRef.current) {
      pcControlsRef.current.object.position.set(
        ...part.camera
      );

      pcControlsRef.current.target.set(
        ...part.target
      );

      pcControlsRef.current.update();
    }
  };

  const focusLaptopPart = (part) => {
    setSelectedLaptopPart(part.name);

    if (laptopControlsRef.current) {
      laptopControlsRef.current.object.position.set(
        ...part.camera
      );

      laptopControlsRef.current.target.set(
        ...part.target
      );

      laptopControlsRef.current.update();
    }
  };

  const focusPrinterPart = (part) => {
    setSelectedPrinterPart(part.name);

    if (printerControlsRef.current) {
      printerControlsRef.current.object.position.set(
        ...part.camera
      );

      printerControlsRef.current.target.set(
        ...part.target
      );

      printerControlsRef.current.update();
    }
  };

  const focusAccessPointPart = (part) => {
    setSelectedAccessPointPart(part.name);

    if (accessPointControlsRef.current) {
      accessPointControlsRef.current.object.position.set(
        ...part.camera
      );

      accessPointControlsRef.current.target.set(
        ...part.target
      );

      accessPointControlsRef.current.update();
    }
  };

  const renderComponentExplorer = (
    parts,
    selected,
    onSelect
  ) => {
    return (
      <div className="ar-component-explorer">
        <h2>Component Explorer</h2>

        <div className="ar-component-buttons">
          {parts.map((part) => (
            <button
              key={part.name}
              className={`ar-component-button ${
                selected === part.name ? "active" : ""
              }`}
              onClick={() => onSelect(part)}
            >
              {part.name}
            </button>
          ))}
        </div>

        {selected && (
          <div className="ar-component-description">
            {
              parts.find(
                (part) => part.name === selected
              )?.description
            }
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="ar-page">
      {!selectedDevice && (
        <>
          <div className="ar-header">
            <p>3D HARDWARE LAB</p>

            <h1>Explore Network Hardware</h1>

            <span>
              Select a network device to view its 3D
              model and learn about each component.
            </span>
          </div>

          <div className="ar-device-grid">
            {devices.map((device) => (
              <button
                key={device.name}
                className="ar-device-card"
                onClick={() =>
                  selectDevice(device.name)
                }
              >
                <div className="ar-device-icon">
                  {device.icon}
                </div>

                <h3>{device.name}</h3>

                <p>{device.description}</p>

                <span className="ar-device-link">
                  Explore 3D →
                </span>
              </button>
            ))}
          </div>

          <div className="ar-bottom-navigation">
            <Link
              to="/materi/perangkat-jaringan"
              className="ar-back-button"
            >
              ← Back to Materials
            </Link>

            <Link
              to="/materi/topologi-jaringan"
              className="ar-next-button"
            >
              Next Material →
            </Link>
          </div>
        </>
      )}

      {/* SWITCH */}
      {selectedDevice === "Switch" && (
        <>
          <div className="ar-viewer-header">
            <p>3D DEVICE VIEWER</p>

            <h1>Switch</h1>
          </div>

          <div className="ar-canvas-wrapper canvas-dark">
            <Canvas
              camera={{
                position: [3, 2, 4],
                fov: 45,
              }}
            >
              <ambientLight intensity={0.8} />

              <directionalLight
                position={[5, 6, 5]}
                intensity={3}
              />

              <SwitchModel />

              <OrbitControls
                ref={switchControlsRef}
                enablePan={false}
                minDistance={2}
                maxDistance={10}
              />
            </Canvas>
          </div>

          <button
            className="ar-reset-button"
            onClick={resetSwitchView}
          >
            Reset View
          </button>

          {renderComponentExplorer(
            switchParts,
            selectedPart,
            focusSwitchPart
          )}

          <div className="ar-device-info">
            <h2>Switch</h2>

            <p>
              A switch is a network device used to
              connect multiple devices within a local
              network or LAN.
            </p>
          </div>

          <div className="ar-bottom-navigation">
            <button
              className="ar-back-button"
              onClick={backToDevices}
            >
              ← Back to Devices
            </button>
          </div>
        </>
      )}

      {/* ROUTER */}
      {selectedDevice === "Router" && (
        <>
          <div className="ar-viewer-header">
            <p>3D DEVICE VIEWER</p>

            <h1>Router</h1>
          </div>

          <div className="ar-canvas-wrapper canvas-light">
            <Canvas
              camera={{
                position: [3, 2, 4],
                fov: 45,
              }}
            >
              <ambientLight intensity={0.8} />

              <directionalLight
                position={[5, 6, 5]}
                intensity={3}
              />

              <RouterModel />

              <OrbitControls
                ref={routerControlsRef}
                enablePan={false}
                minDistance={2}
                maxDistance={10}
              />
            </Canvas>
          </div>

          <button
            className="ar-reset-button"
            onClick={resetRouterView}
          >
            Reset View
          </button>

          {renderComponentExplorer(
            routerParts,
            selectedRouterPart,
            focusRouterPart
          )}

          <div className="ar-device-info">
            <h2>Router</h2>

            <p>
              A router is a device used to connect two
              or more different networks and determine
              the path for data packets.
            </p>
          </div>

          <div className="ar-bottom-navigation">
            <button
              className="ar-back-button"
              onClick={backToDevices}
            >
              ← Back to Devices
            </button>
          </div>
        </>
      )}

      {/* SERVER */}
      {selectedDevice === "Server" && (
        <>
          <div className="ar-viewer-header">
            <p>3D DEVICE VIEWER</p>

            <h1>Server</h1>
          </div>

          <div className="ar-canvas-wrapper canvas-light">
            <Canvas
              camera={{
                position: [5, 3, 5],
                fov: 45,
              }}
            >
              <ambientLight intensity={0.8} />

              <directionalLight
                position={[5, 6, 5]}
                intensity={3}
              />

              <ServerModel />

              <OrbitControls
                ref={serverControlsRef}
                enablePan={false}
                minDistance={2}
                maxDistance={12}
              />
            </Canvas>
          </div>

          <button
            className="ar-reset-button"
            onClick={resetServerView}
          >
            Reset View
          </button>

          {renderComponentExplorer(
            serverParts,
            selectedServerPart,
            focusServerPart
          )}

          <div className="ar-device-info">
            <h2>Server</h2>

            <p>
              A server is a computer that provides
              services, data, applications, or resources
              that can be used by other devices on a network.
            </p>
          </div>

          <div className="ar-bottom-navigation">
            <button
              className="ar-back-button"
              onClick={backToDevices}
            >
              ← Back to Devices
            </button>
          </div>
        </>
      )}

      {/* ACCESS POINT */}
      {selectedDevice === "Access Point" && (
        <>
          <div className="ar-viewer-header">
            <p>3D DEVICE VIEWER</p>

            <h1>Access Point</h1>
          </div>

          <div className="ar-canvas-wrapper canvas-dark">
            <Canvas
              camera={{
                position: [4, 2.5, 5],
                fov: 45,
              }}
            >
              <ambientLight intensity={0.8} />

              <directionalLight
                position={[5, 6, 5]}
                intensity={3}
              />

              <AccessPointModel />

              <OrbitControls
                ref={accessPointControlsRef}
                enablePan={false}
                minDistance={2}
                maxDistance={10}
              />
            </Canvas>
          </div>

          <button
            className="ar-reset-button"
            onClick={resetAccessPointView}
          >
            Reset View
          </button>

          {renderComponentExplorer(
            accessPointParts,
            selectedAccessPointPart,
            focusAccessPointPart
          )}

          <div className="ar-device-info">
            <h2>Access Point</h2>

            <p>
              An access point is a device that provides
              wireless network access, allowing devices
              to connect to the network through Wi-Fi.
            </p>
          </div>

          <div className="ar-bottom-navigation">
            <button
              className="ar-back-button"
              onClick={backToDevices}
            >
              ← Back to Devices
            </button>
          </div>
        </>
      )}

      {/* MODEM */}
      {selectedDevice === "Modem" && (
        <>
          <div className="ar-viewer-header">
            <p>3D DEVICE VIEWER</p>

            <h1>Modem</h1>
          </div>

          <div className="ar-canvas-wrapper canvas-dark">
            <Canvas
              camera={{
                position: [3, 2, 4],
                fov: 45,
              }}
            >
              <ambientLight intensity={0.8} />

              <directionalLight
                position={[5, 6, 5]}
                intensity={3}
              />

              <ModemModel />

              <OrbitControls
                ref={modemControlsRef}
                enablePan={false}
                minDistance={2}
                maxDistance={10}
              />
            </Canvas>
          </div>

          <button
            className="ar-reset-button"
            onClick={resetModemView}
          >
            Reset View
          </button>

          {renderComponentExplorer(
            modemParts,
            selectedModemPart,
            focusModemPart
          )}

          <div className="ar-device-info">
            <h2>Modem</h2>

            <p>
              A modem is a device used to connect a
              local network to an internet service
              provided by a network provider.
            </p>
          </div>

          <div className="ar-bottom-navigation">
            <button
              className="ar-back-button"
              onClick={backToDevices}
            >
              ← Back to Devices
            </button>
          </div>
        </>
      )}

      {/* PC DESKTOP */}
      {selectedDevice === "PC Desktop" && (
        <>
          <div className="ar-viewer-header">
            <p>3D DEVICE VIEWER</p>

            <h1>PC Desktop</h1>
          </div>

          <div className="ar-canvas-wrapper canvas-light">
            <Canvas
              camera={{
                position: [4, 2.5, 5],
                fov: 45,
              }}
              shadows
            >
              <ambientLight intensity={0.8} />

              <directionalLight
                position={[5, 6, 5]}
                intensity={3}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />

              <directionalLight
                position={[-4, 3, -3]}
                intensity={1.5}
              />

              <directionalLight
                position={[0, 4, -5]}
                intensity={1}
              />

              <PCDesktopModel />

              <OrbitControls
                ref={pcControlsRef}
                enablePan={false}
                minDistance={2}
                maxDistance={10}
              />
            </Canvas>
          </div>

          <button
            className="ar-reset-button"
            onClick={resetPCView}
          >
            Reset View
          </button>

          {renderComponentExplorer(
            pcParts,
            selectedPCPart,
            focusPCPart
          )}

          <div className="ar-device-info">
            <h2>PC Desktop</h2>

            <p>
              A desktop PC consists of various input,
              output, processing, and storage devices
              that can be used to connect to a network.
            </p>
          </div>

          <div className="ar-bottom-navigation">
            <button
              className="ar-back-button"
              onClick={backToDevices}
            >
              ← Back to Devices
            </button>
          </div>
        </>
      )}

      {/* LAPTOP */}
      {selectedDevice === "Laptop" && (
        <>
          <div className="ar-viewer-header">
            <p>3D DEVICE VIEWER</p>

            <h1>Laptop</h1>
          </div>

          <div className="ar-canvas-wrapper canvas-light">
            <Canvas
              camera={{
                position: [4, 2.5, 5],
                fov: 45,
              }}
            >
              <ambientLight intensity={0.8} />

              <directionalLight
                position={[5, 6, 5]}
                intensity={3}
              />

              <LaptopModel />

              <OrbitControls
                ref={laptopControlsRef}
                enablePan={false}
                minDistance={2}
                maxDistance={10}
              />
            </Canvas>
          </div>

          <button
            className="ar-reset-button"
            onClick={resetLaptopView}
          >
            Reset View
          </button>

          {renderComponentExplorer(
            laptopParts,
            selectedLaptopPart,
            focusLaptopPart
          )}

          <div className="ar-device-info">
            <h2>Laptop</h2>

            <p>
              A laptop is a portable computer that can
              be used to access a network through wired
              or wireless connections.
            </p>
          </div>

          <div className="ar-bottom-navigation">
            <button
              className="ar-back-button"
              onClick={backToDevices}
            >
              ← Back to Devices
            </button>
          </div>
        </>
      )}

      {/* PRINTER */}
      {selectedDevice === "Printer" && (
        <>
          <div className="ar-viewer-header">
            <p>3D DEVICE VIEWER</p>

            <h1>Printer</h1>
          </div>

          <div className="ar-canvas-wrapper canvas-light">
            <Canvas
              camera={{
                position: [4, 2.5, 5],
                fov: 45,
              }}
            >
              <ambientLight intensity={0.8} />

              <directionalLight
                position={[5, 6, 5]}
                intensity={3}
              />

              <PrinterModel />

              <OrbitControls
                ref={printerControlsRef}
                enablePan={false}
                minDistance={2}
                maxDistance={10}
              />
            </Canvas>
          </div>

          <button
            className="ar-reset-button"
            onClick={resetPrinterView}
          >
            Reset View
          </button>

          {renderComponentExplorer(
            printerParts,
            selectedPrinterPart,
            focusPrinterPart
          )}

          <div className="ar-device-info">
            <h2>Printer</h2>

            <p>
              A printer is an output device that can
              be shared by multiple devices through
              a network.
            </p>
          </div>

          <div className="ar-bottom-navigation">
            <button
              className="ar-back-button"
              onClick={backToDevices}
            >
              ← Back to Devices
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ARHardware;