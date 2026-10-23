import { useRef, useState } from "react";

import { Link } from "react-router-dom";

import "./NetworkLab.css";

function NetworkLab() {
  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [topology, setTopology] = useState("star");
  const [checkResult, setCheckResult] = useState("");
  const deviceId = useRef(0);

  const completeNetworkLab = () => {
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
        item.activityId === "network-lab"
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
        activityId: "network-lab",
        title: "Network Lab",
        type: "Practical Lab",
        order: 5,
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
      "Network Lab"
    );
  };

  const handleDragStart = (event, type, icon) => {
    event.dataTransfer.setData(
      "device",
      JSON.stringify({ type, icon })
    );
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const data = event.dataTransfer.getData("device");

    if (!data) {
      return;
    }

    const device = JSON.parse(data);
    const board = event.currentTarget;
    const rect = board.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    deviceId.current += 1;

    setDevices((currentDevices) => [
      ...currentDevices,
      {
        ...device,
        id: deviceId.current,
        x,
        y,
      },
    ]);

    setCheckResult("");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDeviceClick = (event, id) => {
    event.stopPropagation();

    if (draggingIndex !== null) {
      return;
    }

    if (selectedDeviceId === null) {
      setSelectedDeviceId(id);
      setCheckResult("");
      return;
    }

    if (selectedDeviceId === id) {
      setSelectedDeviceId(null);
      return;
    }

    const alreadyConnected = connections.some(
      (connection) =>
        (connection.from === selectedDeviceId &&
          connection.to === id) ||
        (connection.from === id &&
          connection.to === selectedDeviceId)
    );

    if (alreadyConnected) {
      setCheckResult(
        "⚠️ These two devices are already connected."
      );

      setSelectedDeviceId(null);
      return;
    }

    setConnections((currentConnections) => [
      ...currentConnections,
      {
        from: selectedDeviceId,
        to: id,
      },
    ]);

    setSelectedDeviceId(null);
    setCheckResult("");
  };

  const handleBoardClick = () => {
    setSelectedDeviceId(null);
  };

  const getDeviceById = (id) => {
    return devices.find(
      (device) => device.id === id
    );
  };

  const getDeviceConnections = (id) => {
    return connections.filter(
      (connection) =>
        connection.from === id ||
        connection.to === id
    );
  };

  const getDegree = (id) => {
    return getDeviceConnections(id).length;
  };

  const isConnectedNetwork = () => {
    if (devices.length === 0) {
      return false;
    }

    const visited = new Set();
    const queue = [devices[0].id];

    while (queue.length > 0) {
      const currentId = queue.shift();

      if (visited.has(currentId)) {
        continue;
      }

      visited.add(currentId);

      connections.forEach((connection) => {
        if (connection.from === currentId) {
          if (!visited.has(connection.to)) {
            queue.push(connection.to);
          }
        }

        if (connection.to === currentId) {
          if (!visited.has(connection.from)) {
            queue.push(connection.from);
          }
        }
      });
    }

    return visited.size === devices.length;
  };

  const hasCycle = () => {
    const visited = new Set();

    const checkCycle = (currentId, parentId) => {
      visited.add(currentId);

      const neighbors = [];

      connections.forEach((connection) => {
        if (connection.from === currentId) {
          neighbors.push(connection.to);
        }

        if (connection.to === currentId) {
          neighbors.push(connection.from);
        }
      });

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          if (checkCycle(neighbor, currentId)) {
            return true;
          }
        } else if (neighbor !== parentId) {
          return true;
        }
      }

      return false;
    };

    return checkCycle(devices[0].id, null);
  };

  const checkStar = () => {
    const switches = devices.filter(
      (device) => device.type === "Switch"
    );

    if (switches.length === 0) {
      setCheckResult(
        "❌ Star topology requires a Switch as the center."
      );

      return;
    }

    if (switches.length > 1) {
      setCheckResult(
        "❌ Use one Switch as the center of the Star topology."
      );

      return;
    }

    const switchId = switches[0].id;

    const otherDevices = devices.filter(
      (device) => device.id !== switchId
    );

    if (otherDevices.length === 0) {
      setCheckResult(
        "❌ Add other devices to connect to the Switch."
      );

      return;
    }

    const wrongConnection = connections.some(
      (connection) => {
        const fromIsSwitch =
          connection.from === switchId;

        const toIsSwitch =
          connection.to === switchId;

        return !fromIsSwitch && !toIsSwitch;
      }
    );

    if (wrongConnection) {
      setCheckResult(
        "❌ Not quite right. In a Star topology, all devices must be connected directly to the Switch."
      );

      return;
    }

    const allConnected = otherDevices.every(
      (device) =>
        connections.some(
          (connection) =>
            (connection.from === switchId &&
              connection.to === device.id) ||
            (connection.from === device.id &&
              connection.to === switchId)
        )
    );

    if (!allConnected) {
      setCheckResult(
        "❌ Some devices are still not connected to the Switch."
      );

      return;
    }

    if (
      connections.length !==
      otherDevices.length
    ) {
      setCheckResult(
        "❌ Each device in a Star topology must have one direct connection to the Switch."
      );

      return;
    }

    setCheckResult(
      "🎉 Great! The Star topology has been correctly arranged."
    );

    completeNetworkLab();
  };

  const checkBus = () => {
    if (devices.length < 2) {
      setCheckResult(
        "❌ Bus topology requires at least 2 devices."
      );

      return;
    }

    if (
      connections.length !==
      devices.length - 1
    ) {
      setCheckResult(
        "❌ The number of connections is incorrect. A Bus topology must form a single path."
      );

      return;
    }

    if (!isConnectedNetwork()) {
      setCheckResult(
        "❌ Some devices are still not connected to the Bus path."
      );

      return;
    }

    const invalidDegree = devices.some(
      (device) => getDegree(device.id) > 2
    );

    if (invalidDegree) {
      setCheckResult(
        "❌ A device has more than two connections. A Bus topology must form a single path."
      );

      return;
    }

    setCheckResult(
      "🎉 Great! The Bus topology has been correctly arranged."
    );

    completeNetworkLab();
  };

  const checkRing = () => {
    if (devices.length < 3) {
      setCheckResult(
        "❌ Ring topology requires at least 3 devices."
      );

      return;
    }

    if (connections.length !== devices.length) {
      setCheckResult(
        "❌ The number of connections does not form a ring."
      );

      return;
    }

    const wrongDegree = devices.some(
      (device) => getDegree(device.id) !== 2
    );

    if (wrongDegree) {
      setCheckResult(
        "❌ Each device in a Ring topology must have exactly two connections."
      );

      return;
    }

    if (!isConnectedNetwork()) {
      setCheckResult(
        "❌ The network does not form one complete ring."
      );

      return;
    }

    setCheckResult(
      "🎉 Excellent! The Ring topology has successfully formed a complete circle."
    );

    completeNetworkLab();
  };

  const checkMesh = () => {
    if (devices.length < 2) {
      setCheckResult(
        "❌ Mesh topology requires at least 2 devices."
      );

      return;
    }

    const expectedConnections =
      (devices.length * (devices.length - 1)) / 2;

    if (
      connections.length !==
      expectedConnections
    ) {
      setCheckResult(
        `❌ Incomplete. Mesh requires ${expectedConnections} connections for ${devices.length} devices.`
      );

      return;
    }

    const allFullyConnected = devices.every(
      (device) =>
        getDegree(device.id) ===
        devices.length - 1
    );

    if (!allFullyConnected) {
      setCheckResult(
        "❌ Each device in a Mesh topology must be directly connected to every other device."
      );

      return;
    }

    setCheckResult(
      "🎉 Excellent! The Mesh topology has been correctly arranged."
    );

    completeNetworkLab();
  };

  const checkTree = () => {
    if (devices.length < 2) {
      setCheckResult(
        "❌ Tree topology requires at least 2 devices."
      );

      return;
    }

    if (
      connections.length !==
      devices.length - 1
    ) {
      setCheckResult(
        "❌ A Tree topology must have a number of connections equal to the number of devices minus one."
      );

      return;
    }

    if (!isConnectedNetwork()) {
      setCheckResult(
        "❌ Some devices are still not connected within the Tree structure."
      );

      return;
    }

    if (hasCycle()) {
      setCheckResult(
        "❌ A Tree topology must not contain connections that form a cycle."
      );

      return;
    }

    setCheckResult(
      "🎉 Good job! The Tree topology has been correctly arranged."
    );

    completeNetworkLab();
  };

  const handleCheckNetwork = () => {
    if (devices.length < 2) {
      setCheckResult(
        "❌ Add at least 2 devices first."
      );

      return;
    }

    if (connections.length === 0) {
      setCheckResult(
        "❌ No cables have been connected yet. Connect the devices first."
      );

      return;
    }

    if (topology === "star") {
      checkStar();
      return;
    }

    if (topology === "bus") {
      checkBus();
      return;
    }

    if (topology === "ring") {
      checkRing();
      return;
    }

    if (topology === "mesh") {
      checkMesh();
      return;
    }

    if (topology === "tree") {
      checkTree();
      return;
    }
  };

  const handleDevicePointerDown = (
    event,
    index
  ) => {
    event.preventDefault();
    event.stopPropagation();

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    setDraggingIndex(index);
  };

  const handleDevicePointerMove = (event) => {
    if (draggingIndex === null) {
      return;
    }

    const board =
      event.currentTarget.closest(
        ".network-board"
      );

    if (!board) {
      return;
    }

    const rect =
      board.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    x = Math.max(
      40,
      Math.min(x, rect.width - 40)
    );

    y = Math.max(
      40,
      Math.min(y, rect.height - 40)
    );

    setDevices((currentDevices) =>
      currentDevices.map(
        (device, index) =>
          index === draggingIndex
            ? {
                ...device,
                x,
                y,
              }
            : device
      )
    );
  };

  const handleDevicePointerUp = (event) => {
    event.preventDefault();
    setDraggingIndex(null);
  };

  const handleDeleteDevice = (id) => {
    setDevices((currentDevices) =>
      currentDevices.filter(
        (device) => device.id !== id
      )
    );

    setConnections((currentConnections) =>
      currentConnections.filter(
        (connection) =>
          connection.from !== id &&
          connection.to !== id
      )
    );

    if (selectedDeviceId === id) {
      setSelectedDeviceId(null);
    }

    setCheckResult("");
  };

  const handleDeviceContextMenu = (
    event,
    id
  ) => {
    event.preventDefault();
    handleDeleteDevice(id);
  };

  const handleReset = () => {
    setDevices([]);
    setConnections([]);
    setSelectedDeviceId(null);
    setCheckResult("");
  };

  return (
    <div className="network-lab">
      <div className="network-header">
        <p>NETWORK LAB</p>

        <h1>
          Network Topology Simulation
        </h1>

        <span>
          Arrange devices and create network
          connections manually.
        </span>
      </div>

      <div className="network-content">
        <h2>
          Network Topology Simulator
        </h2>

        <p>
          Choose a topology, drag devices into
          the simulation area, then click two
          devices to create a cable.
        </p>

        <div className="topology-selector">
          <label htmlFor="topology">
            Topology:
          </label>

          <select
            id="topology"
            value={topology}
            onChange={(event) => {
              setTopology(
                event.target.value
              );

              setCheckResult("");
            }}
          >
            <option value="star">
              ⭐ Star
            </option>

            <option value="bus">
              🚌 Bus
            </option>

            <option value="ring">
              🔄 Ring
            </option>

            <option value="mesh">
              🕸️ Mesh
            </option>

            <option value="tree">
              🌳 Tree
            </option>
          </select>
        </div>

        <div className="device-list">
          <button
            draggable="true"
            onDragStart={(event) =>
              handleDragStart(
                event,
                "PC",
                "💻"
              )
            }
          >
            💻 PC
          </button>

          <button
            draggable="true"
            onDragStart={(event) =>
              handleDragStart(
                event,
                "Laptop",
                "💻"
              )
            }
          >
            💻 Laptop
          </button>

          <button
            draggable="true"
            onDragStart={(event) =>
              handleDragStart(
                event,
                "Switch",
                "🔀"
              )
            }
          >
            🔀 Switch
          </button>

          <button
            draggable="true"
            onDragStart={(event) =>
              handleDragStart(
                event,
                "Router",
                "📡"
              )
            }
          >
            📡 Router
          </button>

          <button
            draggable="true"
            onDragStart={(event) =>
              handleDragStart(
                event,
                "Server",
                "🖥️"
              )
            }
          >
            🖥️ Server
          </button>

          <button
            draggable="true"
            onDragStart={(event) =>
              handleDragStart(
                event,
                "Printer",
                "🖨️"
              )
            }
          >
            🖨️ Printer
          </button>
        </div>

        <div className="connection-instruction">
          {selectedDeviceId === null
            ? "💡 Click the first device, then click the second device to create a cable."
            : "🔌 Device selected. Now click another device to create a cable."}
        </div>

        <div className="network-actions">
          <button
            className="check-button"
            onClick={
              handleCheckNetwork
            }
          >
            🔍 Check Network
          </button>

          <button
            className="reset-button"
            onClick={handleReset}
          >
            🔄 Reset Simulation
          </button>
        </div>

        {checkResult && (
          <div className="check-result">
            {checkResult}
          </div>
        )}

        <div
          className="network-board"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleBoardClick}
        >
          {devices.length === 0 ? (
            <>
              <p>
                Simulation Area
              </p>

              <span>
                Drag devices into this area.
              </span>
            </>
          ) : (
            <>
              <svg
                className="connection-layer"
              >
                {connections.map(
                  (
                    connection,
                    index
                  ) => {
                    const from =
                      getDeviceById(
                        connection.from
                      );

                    const to =
                      getDeviceById(
                        connection.to
                      );

                    if (!from || !to) {
                      return null;
                    }

                    return (
                      <line
                        key={index}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                      />
                    );
                  }
                )}
              </svg>

              <div className="placed-devices">
                {devices.map(
                  (
                    device,
                    index
                  ) => (
                    <div
                      className={`placed-device ${
                        selectedDeviceId ===
                        device.id
                          ? "selected-device"
                          : ""
                      }`}
                      key={device.id}
                      style={{
                        left: `${device.x}px`,
                        top: `${device.y}px`,
                      }}
                      onClick={(event) =>
                        handleDeviceClick(
                          event,
                          device.id
                        )
                      }
                      onPointerDown={(
                        event
                      ) =>
                        handleDevicePointerDown(
                          event,
                          index
                        )
                      }
                      onPointerMove={
                        handleDevicePointerMove
                      }
                      onPointerUp={
                        handleDevicePointerUp
                      }
                      onPointerCancel={
                        handleDevicePointerUp
                      }
                      onContextMenu={(
                        event
                      ) =>
                        handleDeviceContextMenu(
                          event,
                          device.id
                        )
                      }
                    >
                      <div className="device-icon">
                        {device.icon}
                      </div>

                      <span>
                        {device.type}
                      </span>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>

        <div className="network-bottom-navigation">
          <Link
            to="/materi/topologi-jaringan"
            className="network-back-button"
          >
            ← Back to Materials
          </Link>

          <Link
            to="/materi/kabel-LAN"
            className="network-next-button"
          >
            Next Material →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NetworkLab;