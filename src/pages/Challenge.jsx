import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./Challenge.css";

const challenges = [
  {
    id: 1,
    icon: "🔌",
    title: "Cable Detective",
    category: "NETWORK CABLES",
    description:
      "Find out why a PC cannot connect to the network and fix its cable connection.",
    difficulty: "Beginner",
    estimatedTime: "5–10 minutes",
    route: "/challenge/cable-detective",
  },

  {
    id: 2,
    icon: "🌐",
    title: "IP Hunter",
    category: "IP ADDRESS",
    description:
      "Investigate a computer's IP configuration and find the error that prevents the network from being used.",
    difficulty: "Beginner",
    estimatedTime: "5–10 minutes",
    route: "/challenge/ip-hunter",
  },

  {
    id: 3,
    icon: "🔗",
    title: "Topology Failure",
    category: "TOPOLOGY",
    description:
      "A network is experiencing a problem. Check the devices and connections to find the source of the issue.",
    difficulty: "Intermediate",
    estimatedTime: "10–15 minutes",
    route: "/challenge/topology-failure",
  },

  {
    id: 4,
    icon: "📡",
    title: "Wi-Fi Rescue",
    category: "WIRELESS NETWORK",
    description:
      "Help a user who cannot connect to Wi-Fi by checking the Access Point and network configuration.",
    difficulty: "Intermediate",
    estimatedTime: "10–15 minutes",
    route: "/challenge/wifi-rescue",
  },

  {
    id: 5,
    icon: "🛠️",
    title: "Network Crisis",
    category: "TROUBLESHOOTING",
    description:
      "A laboratory is experiencing a network outage. Investigate the entire system and restore the affected network.",
    difficulty: "Advanced",
    estimatedTime: "15–20 minutes",
    route: "/challenge/network-crisis",
  },
];

function Challenge() {
  const navigate = useNavigate();

  const [completedChallenges, setCompletedChallenges] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("netlabCompletedChallenges") || "[]"
      );
    } catch {
      return [];
    }
  });

  const isCompleted = (id) => completedChallenges.includes(id);

  const isUnlocked = (id) => {
    if (id === 1) return true;

    return completedChallenges.includes(id - 1);
  };

  const handleChallengeClick = (challenge) => {
    if (!isUnlocked(challenge.id)) return;

    navigate(challenge.route);
  };

  return (
    <div className="challenge-page">
      <div className="challenge-background-glow challenge-glow-one"></div>

      <div className="challenge-background-glow challenge-glow-two"></div>

      <header className="challenge-header">
        <div className="challenge-header-content">
          <div className="challenge-badge">
            <span>⚡</span>
            NETLAB CHALLENGE
          </div>

          <h1>
            NETWORK
            <span> CHALLENGE</span>
          </h1>

          <p>
            Solve various network cases like a TKJ technician.
            Investigate problems, find their causes, and restore the network.
          </p>
        </div>
      </header>

      <main className="challenge-content">
        <section className="challenge-introduction">
          <div className="challenge-introduction-icon">🧠</div>

          <div className="challenge-introduction-text">
            <h2>Ready to Face the Cases?</h2>

            <p>
              Each mission presents a different network problem. You must
              investigate the situation and take the right steps to solve it.
            </p>
          </div>
        </section>

        <section className="challenge-progress-section">
          <div className="challenge-progress-header">
            <div>
              <p className="challenge-section-label">MISSION PROGRESS</p>

              <h2>
                {completedChallenges.length} / {challenges.length} Mission
                Completed
              </h2>
            </div>

            <div className="challenge-progress-icon">🎯</div>
          </div>

          <div className="challenge-progress-bar">
            <div
              className="challenge-progress-fill"
              style={{
                width: `${
                  (completedChallenges.length / challenges.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </section>

        <section className="challenge-list-section">
          <div className="challenge-list-heading">
            <div>
              <p className="challenge-section-label">AVAILABLE MISSIONS</p>

              <h2>Network Cases</h2>
            </div>

            <span className="challenge-list-count">
              {challenges.length} Missions
            </span>
          </div>

          <div className="challenge-grid">
            {challenges.map((challenge) => {
              const completed = isCompleted(challenge.id);

              const unlocked = isUnlocked(challenge.id);

              return (
                <article
                  key={challenge.id}
                  className={`challenge-card ${
                    completed ? "completed" : ""
                  } ${!unlocked ? "locked" : ""}`}
                  onClick={() => handleChallengeClick(challenge)}
                >
                  <div className="challenge-card-top">
                    <div className="challenge-number">
                      {String(challenge.id).padStart(2, "0")}
                    </div>

                    <div className="challenge-status">
                      {completed ? (
                        <span className="challenge-completed-status">
                          ✓ COMPLETED
                        </span>
                      ) : unlocked ? (
                        <span className="challenge-open-status">
                          AVAILABLE
                        </span>
                      ) : (
                        <span className="challenge-locked-status">
                          🔒 LOCKED
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="challenge-card-icon">
                    {unlocked ? challenge.icon : "🔒"}
                  </div>

                  <p className="challenge-category">
                    {challenge.category}
                  </p>

                  <h3>{challenge.title}</h3>

                  <p className="challenge-description">
                    {challenge.description}
                  </p>

                  <div className="challenge-card-info">
                    <span>◈ {challenge.difficulty}</span>

                    <span>◷ {challenge.estimatedTime}</span>
                  </div>

                  <button
                    className={`challenge-start-button ${
                      completed ? "completed-button" : ""
                    }`}
                    disabled={!unlocked}
                    onClick={(event) => {
                      event.stopPropagation();

                      handleChallengeClick(challenge);
                    }}
                  >
                    {completed
                      ? "✓ Challenge Completed"
                      : unlocked
                      ? "Start Challenge →"
                      : "🔒 Complete the Previous Challenge"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="challenge-how-section">
          <div className="challenge-how-header">
            <p className="challenge-section-label">HOW IT WORKS</p>

            <h2>How Does the Challenge Work?</h2>
          </div>

          <div className="challenge-how-grid">
            <div className="challenge-how-card">
              <div className="challenge-how-number">01</div>

              <div className="challenge-how-icon">🔍</div>

              <h3>Investigate</h3>

              <p>
                Check the available information and devices to find clues.
              </p>
            </div>

            <div className="challenge-how-card">
              <div className="challenge-how-number">02</div>

              <div className="challenge-how-icon">🧩</div>

              <h3>Analyze</h3>

              <p>
                Connect the clues and determine the cause of the network
                problem.
              </p>
            </div>

            <div className="challenge-how-card">
              <div className="challenge-how-number">03</div>

              <div className="challenge-how-icon">🔧</div>

              <h3>Repair</h3>

              <p>
                Choose the right configuration or action to fix the problem.
              </p>
            </div>

            <div className="challenge-how-card">
              <div className="challenge-how-number">04</div>

              <div className="challenge-how-icon">✅</div>

              <h3>Verify</h3>

              <p>
                Perform a test to make sure the network is working properly
                again.
              </p>
            </div>
          </div>
        </section>

        <div className="challenge-bottom-navigation">
          <Link to="/home" className="challenge-back-button">
            ← Back to Home
          </Link>

          <Link to="/materi" className="challenge-material-button">
            View Materials →
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Challenge;