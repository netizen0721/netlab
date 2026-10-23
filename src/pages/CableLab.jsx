import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const standards = {
  T568A: [
    "White/Green",
    "Green",
    "White/Orange",
    "Blue",
    "White/Blue",
    "Orange",
    "White/Brown",
    "Brown",
  ],

  T568B: [
    "White/Orange",
    "Orange",
    "White/Green",
    "Blue",
    "White/Blue",
    "Green",
    "White/Brown",
    "Brown",
  ],
};

const cableColors = [
  {
    name: "White/Orange",
    base: "#f4f4f4",
    stripe: "#ef7d22",
  },
  {
    name: "Orange",
    base: "#ef7d22",
    stripe: null,
  },
  {
    name: "White/Green",
    base: "#f4f4f4",
    stripe: "#20a957",
  },
  {
    name: "Green",
    base: "#20a957",
    stripe: null,
  },
  {
    name: "White/Blue",
    base: "#f4f4f4",
    stripe: "#2f80ed",
  },
  {
    name: "Blue",
    base: "#2f80ed",
    stripe: null,
  },
  {
    name: "White/Brown",
    base: "#f4f4f4",
    stripe: "#795548",
  },
  {
    name: "Brown",
    base: "#795548",
    stripe: null,
  },
];

const initialRandomOrder = [
  "Green",
  "White/Blue",
  "Orange",
  "White/Brown",
  "White/Green",
  "Blue",
  "Brown",
  "White/Orange",
];

function CableLab() {
  const navigate = useNavigate();

  const [selectedStandard, setSelectedStandard] = useState("T568A");
  const [wireOrder, setWireOrder] = useState(initialRandomOrder);
  const [slots, setSlots] = useState(Array(8).fill(null));
  const [draggedWire, setDraggedWire] = useState(null);
  const [result, setResult] = useState(null);
  const [showReference, setShowReference] = useState(false);

  const getCable = (name) => {
    return cableColors.find((cable) => cable.name === name);
  };

  const getCableStyle = (name) => {
    const cable = getCable(name);

    if (!cable) {
      return {};
    }

    if (cable.stripe) {
      return {
        background: `repeating-linear-gradient(
          90deg,
          ${cable.base} 0px,
          ${cable.base} 8px,
          ${cable.stripe} 8px,
          ${cable.stripe} 11px
        )`,
      };
    }

    return {
      background: cable.base,
    };
  };

  const handleDragStart = (event, wire) => {
    setDraggedWire(wire);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", wire);
  };

  const handleDragEnd = () => {
    setDraggedWire(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event, pinIndex) => {
    event.preventDefault();

    const wire =
      draggedWire ||
      event.dataTransfer.getData("text/plain");

    if (!wire) {
      return;
    }

    const newSlots = [...slots];

    const existingWireIndex = newSlots.findIndex(
      (item) => item === wire
    );

    if (existingWireIndex !== -1) {
      newSlots[existingWireIndex] = null;
    }

    if (newSlots[pinIndex] !== null) {
      const replacedWire = newSlots[pinIndex];

      const oldIndex = newSlots.findIndex(
        (item) => item === replacedWire
      );

      if (oldIndex !== -1) {
        newSlots[oldIndex] = null;
      }
    }

    newSlots[pinIndex] = wire;

    setSlots(newSlots);
    setDraggedWire(null);
    setResult(null);
  };

  const handleRemoveWire = (index) => {
    const newSlots = [...slots];

    newSlots[index] = null;

    setSlots(newSlots);
    setResult(null);
  };

  const handleCheck = () => {
    const correctAnswer = standards[selectedStandard];

    const isComplete = slots.every(
      (slot) => slot !== null
    );

    setShowReference(true);

    if (!isComplete) {
      setResult({
        type: "warning",
        title: "Cable is incomplete",
        message:
          "Insert all 8 wires into the RJ45 connector before checking.",
      });

      return;
    }

    const isCorrect = slots.every(
      (slot, index) =>
        slot === correctAnswer[index]
    );

    if (isCorrect) {
      const activityName = "Cable Lab";
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
          item.activityId === "cable-lab"
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
          activityId: "cable-lab",
          title: "Cable Lab",
          type: "Practical Lab",
          order: 7,
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
        activityName
      );

      setResult({
        type: "success",
        title: "Cable assembled successfully! 🎉",
        message: `The cable arrangement matches the ${selectedStandard} standard.`,
      });
    } else {
      setResult({
        type: "error",
        title: "The arrangement is incorrect",
        message: `Some wire positions do not match the ${selectedStandard} standard. Check the pin order from 1 to 8.`,
      });
    }
  };

  const handleReset = () => {
    const shuffled = [...cableColors]
      .map((item) => item.name)
      .sort(() => Math.random() - 0.5);

    setWireOrder(shuffled);
    setSlots(Array(8).fill(null));
    setDraggedWire(null);
    setResult(null);
    setShowReference(false);
  };

  const handleChangeStandard = (standard) => {
    setSelectedStandard(standard);
    setSlots(Array(8).fill(null));
    setDraggedWire(null);
    setResult(null);
    setShowReference(false);
  };

  const completedPins = slots.filter(
    (slot) => slot !== null
  ).length;

  return (
    <div className="cable-lab-page">
      {/* HEADER */}
      <header className="cable-lab-header">
        <div className="cable-lab-header-content">
          <p className="cable-lab-label">
            NETLAB PRACTICUM
          </p>

          <h1>CABLE LAB</h1>

          <p className="cable-lab-description">
            Simulate the process of arranging UTP wires before inserting
            them into an RJ45 connector.
          </p>
        </div>
      </header>

      {/* PILIH STANDAR */}
      <section className="cable-standard-section">
        <div className="standard-info">
          <div className="section-number">
            01
          </div>

          <div className="standard-divider" />

          <div className="standard-title">
            <h2>Choose Cable Standard</h2>

            <p>
              Choose the color standard you want to use
              <br />
              to assemble the cable.
            </p>
          </div>
        </div>

        <div className="standard-buttons">
          <button
            type="button"
            className={
              selectedStandard === "T568A"
                ? "standard-button active"
                : "standard-button"
            }
            onClick={() =>
              handleChangeStandard("T568A")
            }
          >
            <div>
              <strong>T568A</strong>
              <span>Standard A</span>
            </div>

            <div className="radio-circle">
              {selectedStandard === "T568A" && (
                <div className="radio-dot" />
              )}
            </div>
          </button>

          <button
            type="button"
            className={
              selectedStandard === "T568B"
                ? "standard-button active"
                : "standard-button"
            }
            onClick={() =>
              handleChangeStandard("T568B")
            }
          >
            <div>
              <strong>T568B</strong>
              <span>Standard B</span>
            </div>

            <div className="radio-circle">
              {selectedStandard === "T568B" && (
                <div className="radio-dot" />
              )}
            </div>
          </button>
        </div>
      </section>

      {/* WORKSPACE */}
      <section className="cable-main-workspace">
        {/* PANEL KIRI */}
        <div className="wire-section">
          <div className="workspace-heading">
            <div className="section-number">
              02
            </div>

            <div>
              <h2>Arrange the Wires</h2>

              <p>
                Drag each randomly arranged wire
                <br />
                into the RJ45 connector.
              </p>
            </div>
          </div>

          <div className="utp-card">
            <div className="utp-card-title">
              <span className="mini-icon">
                ▦
              </span>

              <strong>UTP Cable (random)</strong>
            </div>

            <div className="utp-wire-area">
              <div className="utp-jacket">
                <div className="jacket-opening">
                  <div className="jacket-hole" />
                </div>
              </div>

              <div className="loose-wires">
                {wireOrder.map(
                  (wire, index) => (
                    <div
                      key={wire}
                      className={`loose-wire loose-wire-${index}`}
                      draggable
                      onDragStart={(event) =>
                        handleDragStart(
                          event,
                          wire
                        )
                      }
                      onDragEnd={
                        handleDragEnd
                      }
                    >
                      <div
                        className="loose-wire-color"
                        style={getCableStyle(
                          wire
                        )}
                      />

                      <div className="wire-copper" />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="utp-help">
              <span>ⓘ</span>

              <p>
                Drag the displayed wires to insert
                <br />
                them into the RJ45 pins.
              </p>
            </div>
          </div>
        </div>

        {/* PANEL TENGAH */}
        <div className="connector-section">
          <div className="connector-heading">
            <div className="connector-icon">
              ♙
            </div>

            <div>
              <h2>RJ45 CONNECTOR</h2>

              <p>
                Arrange the wires according to pin order 1 - 8
              </p>
            </div>
          </div>

          <div className="connector-stage">
            <div className="drag-hint">
              <span>
                Drag the wire
                <br />
                to the
                <br />
                correct pin
              </span>

              <div className="hint-arrow">
                ↗
              </div>
            </div>

            <div className="rj45-real">
              <div className="rj45-pin-numbers">
                {Array.from({
                  length: 8,
                }).map(
                  (_, index) => (
                    <span key={index}>
                      {index + 1}
                    </span>
                  )
                )}
              </div>

              <div className="rj45-top">
                {Array.from({
                  length: 8,
                }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="rj45-slot"
                      onDragOver={
                        handleDragOver
                      }
                      onDrop={(event) =>
                        handleDrop(
                          event,
                          index
                        )
                      }
                    >
                      <div className="metal-contact">
                        <div className="metal-highlight" />
                      </div>

                      {slots[index] && (
                        <div
                          className="inserted-wire"
                          draggable
                          onDragStart={(
                            event
                          ) =>
                            handleDragStart(
                              event,
                              slots[index]
                            )
                          }
                          onDragEnd={
                            handleDragEnd
                          }
                          onDoubleClick={() =>
                            handleRemoveWire(
                              index
                            )
                          }
                          style={getCableStyle(
                            slots[index]
                          )}
                          title={`${slots[index]} — double click to remove`}
                        />
                      )}
                    </div>
                  )
                )}
              </div>

              <div className="rj45-body">
                <div className="rj45-inner-window">
                  <div className="inner-wire-view">
                    {slots.map(
                      (slot, index) => (
                        <div
                          key={index}
                          className="inner-wire"
                          style={
                            slot
                              ? getCableStyle(
                                  slot
                                )
                              : {}
                          }
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="rj45-latch">
                  <div className="latch-line" />
                </div>
              </div>

              <div className="rj45-cable-tail">
                <div className="tail-inner" />
              </div>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="pin-progress">
            <span>
              {completedPins}/8 wires inserted
            </span>

            <div className="pin-progress-bar">
              <div
                style={{
                  width: `${
                    (completedPins / 8) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* PANEL KANAN */}
        <aside className="cable-sidebar">
          <div className="sidebar-block">
            <div className="sidebar-title">
              <span>▣</span>

              <strong>Pin Status</strong>
            </div>

            <div className="pin-status-grid">
              {slots.map(
                (slot, index) => (
                  <div
                    key={index}
                    className={
                      slot
                        ? "pin-status filled"
                        : "pin-status"
                    }
                  >
                    <strong>
                      {index + 1}
                    </strong>

                    <span>
                      {slot || "Empty"}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="sidebar-block">
            <div className="sidebar-title">
              <span>✂</span>

              <strong>Wire Colors</strong>
            </div>

            <div className="color-legend">
              {cableColors.map(
                (cable) => (
                  <div
                    key={cable.name}
                    className="legend-item"
                  >
                    <div
                      className="legend-wire"
                      style={getCableStyle(
                        cable.name
                      )}
                    />

                    <span>
                      {cable.name}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {showReference && (
            <div className="sidebar-block standard-reference-block">
              <div className="sidebar-title">
                <span>ⓘ</span>

                <strong>
                  {selectedStandard} Standard Order
                </strong>
              </div>

              <div className="reference-mini">
                {standards[
                  selectedStandard
                ].map(
                  (color, index) => (
                    <div
                      key={color}
                      className="reference-mini-item"
                    >
                      <div
                        className="reference-mini-wire"
                        style={getCableStyle(
                          color
                        )}
                      />

                      <span>
                        {index + 1}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </aside>
      </section>

      {/* HASIL */}
      {result && (
        <section
          className={`cable-result ${result.type}`}
        >
          <div className="result-icon">
            {result.type === "success" && "✓"}
            {result.type === "error" && "!"}
            {result.type === "warning" && "!"}
          </div>

          <div>
            <h3>{result.title}</h3>

            <p>{result.message}</p>
          </div>
        </section>
      )}

      {/* BUTTON */}
      <section className="cable-controls">
        <button
          type="button"
          className="cable-reset-button"
          onClick={handleReset}
        >
          <span>↻</span>
          Reset
        </button>

        <button
          type="button"
          className="cable-check-button"
          onClick={handleCheck}
        >
          <span>✓</span>
          Check Cable
        </button>
      </section>

      {/* NAVIGATION */}
      <div className="cable-navigation">
        <Link
          to="/materi/kabel-lan"
          className="cable-nav-button"
        >
          ← Back to Materials
        </Link>

        <Link
          to="/materi/troubleshoot"
          className="cable-lab-next-button"
        >
          Next Material →
        </Link>
      </div>
    </div>
  );
}

export default CableLab;