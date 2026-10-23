import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CableDetective.css";

const stages = [
  {
    id: 1,
    title: "Initial Investigation",
    description:
      "Read the user's report before starting to inspect the devices.",
  },
  {
    id: 2,
    title: "Inspect Devices",
    description:
      "Inspect the condition of the PC, network cable, switch, and ports being used.",
  },
  {
    id: 3,
    title: "Find the Cause",
    description:
      "Use the available clues to determine the cause of the problem.",
  },
  {
    id: 4,
    title: "Repair the Network",
    description:
      "Choose the appropriate repair action for the problem you found.",
  },
  {
    id: 5,
    title: "Verification",
    description:
      "Test the connection again to make sure the network has returned to normal.",
  },
];

function CableDetective() {
  const navigate = useNavigate();

  const [currentStage, setCurrentStage] = useState(1);
  const [selectedClue, setSelectedClue] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedCause, setSelectedCause] = useState(null);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [verification, setVerification] = useState(null);
  const [completed, setCompleted] = useState(false);

  const markChecked = (item) => {
    setCheckedItems((previous) =>
      previous.includes(item) ? previous : [...previous, item]
    );
  };

  const goToStage = (stage) => {
    setCurrentStage(stage);
    setSelectedClue(null);
    setSelectedCause(null);
    setSelectedRepair(null);
    setVerification(null);
  };

  const handleCause = (cause) => {
    setSelectedCause(cause);
  };

  const handleRepair = (repair) => {
    setSelectedRepair(repair);
  };

  const handleVerification = (result) => {
    setVerification(result);

    if (result === "success") {
      const saved = JSON.parse(
        localStorage.getItem("netlabCompletedChallenges") || "[]"
      );

      if (!saved.includes(1)) {
        localStorage.setItem(
          "netlabCompletedChallenges",
          JSON.stringify([...saved, 1])
        );
      }

      setCompleted(true);
    }
  };

  return (
    <div className="cable-detective-page">
      <div className="cd-background-glow cd-glow-one"></div>
      <div className="cd-background-glow cd-glow-two"></div>

      <header className="cd-header">
        <div className="cd-header-content">
          <div className="cd-case-label">
            CASE 01 • CABLE DETECTIVE
          </div>

          <h1>
            Cable <span>Detective</span>
          </h1>

          <p>
            Investigate network connection problems and find out why
            the computer cannot connect to the network.
          </p>
        </div>
      </header>

      <main className="cd-content">
        <section className="cd-case-banner">
          <div className="cd-case-icon">🔌</div>

          <div className="cd-case-info">
            <span className="cd-case-tag">NETWORK INCIDENT</span>

            <h2>PC Lab 01 Is Not Connected to the Network</h2>

            <p>
              A student reports that PC Lab 01 cannot access the
              school network. The computer is powered on normally,
              but the network connection is not working.
            </p>
          </div>

          <div className="cd-case-status">
            <span>CASE STATUS</span>

            <strong>
              {completed ? "SOLVED ✓" : "INVESTIGATING"}
            </strong>
          </div>
        </section>

        <section className="cd-stage-navigation">
          {stages.map((stage) => (
            <button
              key={stage.id}
              className={`cd-stage-button ${
                currentStage === stage.id ? "active" : ""
              } ${
                completed && stage.id <= 5 ? "available" : ""
              }`}
              onClick={() => {
                if (
                  stage.id <= currentStage ||
                  (completed && stage.id <= 5)
                ) {
                  setCurrentStage(stage.id);
                }
              }}
              disabled={stage.id > currentStage && !completed}
            >
              <span className="cd-stage-number">
                {String(stage.id).padStart(2, "0")}
              </span>

              <span className="cd-stage-title">
                {stage.title}
              </span>
            </button>
          ))}
        </section>

        {currentStage === 1 && (
          <section className="cd-panel">
            <div className="cd-panel-header">
              <div>
                <span className="cd-panel-label">STAGE 01</span>
                <h2>Initial Investigation</h2>
              </div>

              <div className="cd-panel-icon">🔍</div>
            </div>

            <div className="cd-report-box">
              <div className="cd-report-header">
                <span>INCIDENT REPORT</span>
                <span>08:15 AM</span>
              </div>

              <p>
                "PC Lab 01 suddenly cannot open the school website.
                I have tried opening the browser several times, but
                there is no connection."
              </p>

              <div className="cd-report-user">
                <div className="cd-user-avatar">👨‍💻</div>

                <div>
                  <strong>Andi — TKJ Lab</strong>
                  <span>Reported from Computer Lab</span>
                </div>
              </div>
            </div>

            <div className="cd-investigation-grid">
              <button
                className={`cd-investigation-card ${
                  selectedClue === "network" ? "selected" : ""
                }`}
                onClick={() => setSelectedClue("network")}
              >
                <span className="cd-investigation-icon">🌐</span>
                <strong>Network Status</strong>
                <span>Check network connection information.</span>
              </button>

              <button
                className={`cd-investigation-card ${
                  selectedClue === "hardware" ? "selected" : ""
                }`}
                onClick={() => setSelectedClue("hardware")}
              >
                <span className="cd-investigation-icon">🖥️</span>
                <strong>Hardware</strong>
                <span>Inspect the computer hardware.</span>
              </button>

              <button
                className={`cd-investigation-card ${
                  selectedClue === "cable" ? "selected" : ""
                }`}
                onClick={() => setSelectedClue("cable")}
              >
                <span className="cd-investigation-icon">🔌</span>
                <strong>Network Cable</strong>
                <span>Inspect the UTP cable and its connectors.</span>
              </button>

              <button
                className={`cd-investigation-card ${
                  selectedClue === "switch" ? "selected" : ""
                }`}
                onClick={() => setSelectedClue("switch")}
              >
                <span className="cd-investigation-icon">🔀</span>
                <strong>Switch</strong>
                <span>Inspect the connection to the switch.</span>
              </button>
            </div>

            {selectedClue && (
              <div className="cd-clue-result">
                {selectedClue === "network" && (
                  <>
                    <strong>🌐 Network Status</strong>
                    <p>
                      Windows shows the status
                      <b> "Network cable unplugged"</b>.
                    </p>
                  </>
                )}

                {selectedClue === "hardware" && (
                  <>
                    <strong>🖥️ Hardware</strong>
                    <p>
                      The PC is powered on normally. The LAN
                      indicator light on the computer is not on.
                    </p>
                  </>
                )}

                {selectedClue === "cable" && (
                  <>
                    <strong>🔌 Network Cable</strong>
                    <p>
                      The UTP cable is connected to the PC, but the
                      RJ45 connector appears slightly loose.
                    </p>
                  </>
                )}

                {selectedClue === "switch" && (
                  <>
                    <strong>🔀 Switch</strong>
                    <p>
                      The switch port used by PC Lab 01 does not
                      show a link indicator.
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="cd-action-area">
              <button
                className="cd-primary-button"
                disabled={!selectedClue}
                onClick={() => goToStage(2)}
              >
                Continue Investigation →
              </button>
            </div>
          </section>
        )}

        {currentStage === 2 && (
          <section className="cd-panel">
            <div className="cd-panel-header">
              <div>
                <span className="cd-panel-label">STAGE 02</span>
                <h2>Inspect Devices</h2>
              </div>

              <div className="cd-panel-icon">🧰</div>
            </div>

            <p className="cd-panel-description">
              Inspect the following components one by one. Do not
              replace any component immediately before finding the
              correct clue.
            </p>

            <div className="cd-check-grid">
              <button
                className={`cd-check-card ${
                  checkedItems.includes("pc") ? "checked" : ""
                }`}
                onClick={() => markChecked("pc")}
              >
                <span>🖥️</span>
                <strong>PC Lab 01</strong>
                <small>Status: Operating normally</small>

                {checkedItems.includes("pc") && (
                  <em>✓ Checked</em>
                )}
              </button>

              <button
                className={`cd-check-card ${
                  checkedItems.includes("cable") ? "checked" : ""
                }`}
                onClick={() => markChecked("cable")}
              >
                <span>🔌</span>
                <strong>UTP Cable</strong>
                <small>Status: Connected</small>

                {checkedItems.includes("cable") && (
                  <em>✓ Checked</em>
                )}
              </button>

              <button
                className={`cd-check-card ${
                  checkedItems.includes("connector") ? "checked" : ""
                }`}
                onClick={() => markChecked("connector")}
              >
                <span>🔗</span>
                <strong>RJ45 Connector</strong>
                <small>Status: Requires inspection</small>

                {checkedItems.includes("connector") && (
                  <em>✓ Checked</em>
                )}
              </button>

              <button
                className={`cd-check-card ${
                  checkedItems.includes("switch") ? "checked" : ""
                }`}
                onClick={() => markChecked("switch")}
              >
                <span>🔀</span>
                <strong>Switch Port</strong>
                <small>Port 08 — Link OFF</small>

                {checkedItems.includes("switch") && (
                  <em>✓ Checked</em>
                )}
              </button>
            </div>

            {checkedItems.length >= 3 && (
              <div className="cd-evidence-box">
                <div className="cd-evidence-icon">⚠️</div>

                <div>
                  <strong>Clue Found</strong>

                  <p>
                    The switch port is not receiving a link. Notice
                    that the RJ45 connector on the cable does not
                    appear to be properly connected.
                  </p>
                </div>
              </div>
            )}

            <div className="cd-action-area">
              <button
                className="cd-primary-button"
                disabled={checkedItems.length < 3}
                onClick={() => goToStage(3)}
              >
                Analyze the Cause →
              </button>
            </div>
          </section>
        )}

        {currentStage === 3 && (
          <section className="cd-panel">
            <div className="cd-panel-header">
              <div>
                <span className="cd-panel-label">STAGE 03</span>
                <h2>Find the Cause</h2>
              </div>

              <div className="cd-panel-icon">🧩</div>
            </div>

            <p className="cd-panel-description">
              Based on the inspection results, choose the cause that
              best matches all of the evidence found.
            </p>

            <div className="cd-cause-list">
              <button
                className={`cd-cause-option ${
                  selectedCause === "pc" ? "selected" : ""
                }`}
                onClick={() => handleCause("pc")}
              >
                <span className="cd-option-number">A</span>

                <div>
                  <strong>PC network adapter is damaged</strong>
                  <p>
                    The computer's NIC is damaged and cannot
                    establish a connection.
                  </p>
                </div>
              </button>

              <button
                className={`cd-cause-option ${
                  selectedCause === "switch" ? "selected" : ""
                }`}
                onClick={() => handleCause("switch")}
              >
                <span className="cd-option-number">B</span>

                <div>
                  <strong>Switch is damaged</strong>
                  <p>
                    The switch port cannot be used to connect the
                    device.
                  </p>
                </div>
              </button>

              <button
                className={`cd-cause-option ${
                  selectedCause === "cable" ? "selected" : ""
                }`}
                onClick={() => handleCause("cable")}
              >
                <span className="cd-option-number">C</span>

                <div>
                  <strong>
                    RJ45 connector is not properly connected
                  </strong>

                  <p>
                    A loose connector causes the physical connection
                    between the PC and switch to be interrupted.
                  </p>
                </div>
              </button>

              <button
                className={`cd-cause-option ${
                  selectedCause === "ip" ? "selected" : ""
                }`}
                onClick={() => handleCause("ip")}
              >
                <span className="cd-option-number">D</span>

                <div>
                  <strong>Incorrect IP address configuration</strong>

                  <p>
                    The computer is using an IP configuration that
                    does not match the network.
                  </p>
                </div>
              </button>
            </div>

            {selectedCause && (
              <div
                className={`cd-answer-feedback ${
                  selectedCause === "cable"
                    ? "correct"
                    : "incorrect"
                }`}
              >
                {selectedCause === "cable" ? (
                  <>
                    <strong>✓ Correct Analysis</strong>

                    <p>
                      The evidence shows that the problem is with
                      the physical connection. A loose RJ45
                      connector can prevent the link between the PC
                      and switch from being established.
                    </p>
                  </>
                ) : (
                  <>
                    <strong>✕ Not Quite</strong>

                    <p>
                      Review the evidence again. There is no strong
                      indication that this component is the source
                      of the problem.
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="cd-action-area">
              <button
                className="cd-primary-button"
                disabled={selectedCause !== "cable"}
                onClick={() => goToStage(4)}
              >
                Continue to Repair →
              </button>
            </div>
          </section>
        )}

        {currentStage === 4 && (
          <section className="cd-panel">
            <div className="cd-panel-header">
              <div>
                <span className="cd-panel-label">STAGE 04</span>
                <h2>Repair the Network</h2>
              </div>

              <div className="cd-panel-icon">🔧</div>
            </div>

            <p className="cd-panel-description">
              Choose the action you will take to repair the PC Lab
              01 connection problem.
            </p>

            <div className="cd-repair-list">
              <button
                className={`cd-repair-option ${
                  selectedRepair === "restart" ? "selected" : ""
                }`}
                onClick={() => handleRepair("restart")}
              >
                <span className="cd-repair-icon">🔄</span>

                <div>
                  <strong>Restart the computer</strong>
                  <p>
                    Restart the PC and check the connection again.
                  </p>
                </div>
              </button>

              <button
                className={`cd-repair-option ${
                  selectedRepair === "ip" ? "selected" : ""
                }`}
                onClick={() => handleRepair("ip")}
              >
                <span className="cd-repair-icon">🌐</span>

                <div>
                  <strong>Reconfigure IP</strong>
                  <p>
                    Reset the computer's IP address and gateway.
                  </p>
                </div>
              </button>

              <button
                className={`cd-repair-option ${
                  selectedRepair === "connector"
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleRepair("connector")}
              >
                <span className="cd-repair-icon">🔌</span>

                <div>
                  <strong>
                    Inspect and reconnect the RJ45
                  </strong>

                  <p>
                    Make sure the RJ45 connector is firmly connected
                    to the PC and switch ports.
                  </p>
                </div>
              </button>

              <button
                className={`cd-repair-option ${
                  selectedRepair === "switch" ? "selected" : ""
                }`}
                onClick={() => handleRepair("switch")}
              >
                <span className="cd-repair-icon">🔀</span>

                <div>
                  <strong>Replace the switch</strong>

                  <p>
                    Replace the switch device with a new unit.
                  </p>
                </div>
              </button>
            </div>

            {selectedRepair === "connector" && (
              <div className="cd-repair-success">
                <span>✓</span>

                <div>
                  <strong>Correct Repair</strong>

                  <p>
                    The RJ45 connector has been reconnected
                    correctly. Now verify the network connection.
                  </p>
                </div>
              </div>
            )}

            {selectedRepair &&
              selectedRepair !== "connector" && (
                <div className="cd-repair-warning">
                  <span>⚠</span>

                  <div>
                    <strong>
                      This Action Did Not Solve the Problem
                    </strong>

                    <p>
                      The main problem is with the physical cable
                      connection. Check the RJ45 connector again.
                    </p>
                  </div>
                </div>
              )}

            <div className="cd-action-area">
              <button
                className="cd-primary-button"
                disabled={selectedRepair !== "connector"}
                onClick={() => goToStage(5)}
              >
                Verify Network →
              </button>
            </div>
          </section>
        )}

        {currentStage === 5 && (
          <section className="cd-panel">
            <div className="cd-panel-header">
              <div>
                <span className="cd-panel-label">STAGE 05</span>
                <h2>Verification</h2>
              </div>

              <div className="cd-panel-icon">✅</div>
            </div>

            <p className="cd-panel-description">
              The cable has been repaired. Now perform a test to
              make sure the network connection has truly returned
              to normal.
            </p>

            <div className="cd-verification-terminal">
              <div className="cd-terminal-header">
                <span></span>
                <span></span>
                <span></span>
                <strong>NETWORK TEST</strong>
              </div>

              <div className="cd-terminal-body">
                <p>
                  <span>$</span> checking network interface...
                </p>

                <p>
                  <span>$</span> checking ethernet link...
                </p>

                <p className="success-line">
                  ✓ Ethernet link detected
                </p>

                <p>
                  <span>$</span> testing gateway...
                </p>

                <p className="success-line">
                  ✓ Gateway 192.168.10.1 reachable
                </p>

                <p>
                  <span>$</span> testing local network...
                </p>

                <p className="success-line">
                  ✓ Network connection restored
                </p>
              </div>
            </div>

            <div className="cd-verification-question">
              <h3>
                Has the PC Lab 01 connection returned to normal?
              </h3>

              <p>
                Select the test result based on the information
                displayed.
              </p>

              <div className="cd-verification-buttons">
                <button
                  className={`cd-verification-button ${
                    verification === "success"
                      ? "selected success"
                      : ""
                  }`}
                  onClick={() =>
                    handleVerification("success")
                  }
                >
                  ✓ Yes, the connection is normal
                </button>

                <button
                  className={`cd-verification-button ${
                    verification === "failed"
                      ? "selected failed"
                      : ""
                  }`}
                  onClick={() =>
                    handleVerification("failed")
                  }
                >
                  ✕ No, there is still a problem
                </button>
              </div>
            </div>

            {verification === "failed" && (
              <div className="cd-repair-warning">
                <span>⚠</span>

                <div>
                  <strong>Check Again</strong>

                  <p>
                    The test result shows that the connection has
                    been detected. Review the test results above
                    again.
                  </p>
                </div>
              </div>
            )}

            {completed && (
              <div className="cd-complete-box">
                <div className="cd-complete-icon">✓</div>

                <div>
                  <span className="cd-complete-label">
                    CASE SOLVED
                  </span>

                  <h2>Cable Detective Completed!</h2>

                  <p>
                    You successfully found the problem with the
                    RJ45 connector and restored the PC Lab 01
                    connection.
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        <div className="cd-bottom-navigation">
          <Link
            to="/challenge"
            className="cd-navigation-button"
          >
            ← All Challenges
          </Link>

          {completed && (
            <button
              className="cd-next-button"
              onClick={() =>
                navigate("/challenge/ip-hunter")
              }
            >
              Next Challenge →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default CableDetective;