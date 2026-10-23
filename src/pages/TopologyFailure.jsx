import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopologyFailure.css";

const devices = [
  {
    id: "pc1",
    name: "PC-01",
    type: "PC",
    icon: "🖥️",
    status: "Tidak Terhubung",
  },
  {
    id: "pc2",
    name: "PC-02",
    type: "PC",
    icon: "🖥️",
    status: "Terhubung",
  },
  {
    id: "pc3",
    name: "PC-03",
    type: "PC",
    icon: "🖥️",
    status: "Tidak Terhubung",
  },
  {
    id: "pc4",
    name: "PC-04",
    type: "PC",
    icon: "🖥️",
    status: "Terhubung",
  },
  {
    id: "switch1",
    name: "SW-01",
    type: "Switch",
    icon: "🔀",
    status: "Aktif",
  },
  {
    id: "router",
    name: "R-01",
    type: "Router",
    icon: "📡",
    status: "Aktif",
  },
];

const clues = [
  {
    id: 1,
    title: "Lampu Port Switch",
    description:
      "Port yang terhubung ke PC-01 dan PC-03 tidak menunjukkan aktivitas.",
    icon: "💡",
  },
  {
    id: 2,
    title: "PC-02 dan PC-04",
    description:
      "Kedua komputer masih dapat melakukan komunikasi dengan router.",
    icon: "🖥️",
  },
  {
    id: 3,
    title: "Router",
    description:
      "Router R-01 menunjukkan status normal dan dapat diakses dari beberapa komputer.",
    icon: "📡",
  },
  {
    id: 4,
    title: "Switch",
    description:
      "SW-01 menyala normal, tetapi beberapa port tidak menunjukkan link.",
    icon: "🔀",
  },
];

const diagnosisOptions = [
  {
    id: "router",
    title: "Router mengalami kerusakan",
    description: "Router menjadi sumber utama gangguan jaringan.",
  },
  {
    id: "switch",
    title: "Switch mengalami gangguan koneksi",
    description:
      "Beberapa koneksi dari komputer menuju switch mengalami masalah.",
  },
  {
    id: "pc",
    title: "Semua PC mengalami kerusakan",
    description:
      "PC-01 dan PC-03 menjadi penyebab utama gangguan jaringan.",
  },
  {
    id: "topology",
    title: "Jalur koneksi topologi terputus",
    description:
      "Ada bagian jalur jaringan yang menyebabkan beberapa perangkat kehilangan koneksi.",
  },
];

const repairOptions = [
  {
    id: "replace-switch-cable",
    title: "Periksa dan pasang ulang kabel PC-01 dan PC-03",
    description:
      "Pastikan kedua kabel terpasang dengan benar pada PC dan switch.",
  },
  {
    id: "restart-router",
    title: "Restart router R-01",
    description:
      "Matikan kemudian hidupkan kembali router untuk memulihkan jaringan.",
  },
  {
    id: "replace-router",
    title: "Ganti router R-01",
    description:
      "Router dianggap rusak dan langsung diganti dengan perangkat baru.",
  },
  {
    id: "change-topology",
    title: "Ubah topologi menjadi Ring",
    description:
      "Seluruh koneksi jaringan diubah menggunakan topologi Ring.",
  },
];

function TopologyFailure() {
  const navigate = useNavigate();

  const [stage, setStage] = useState("briefing");
  const [selectedClues, setSelectedClues] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [repair, setRepair] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const toggleClue = (id) => {
    setSelectedClues((previous) =>
      previous.includes(id)
        ? previous.filter((clueId) => clueId !== id)
        : [...previous, id]
    );
  };

  const startInvestigation = () => {
    setStage("investigate");
    setFeedback("");
  };

  const continueToDiagnosis = () => {
    if (selectedClues.length < 2) {
      setFeedback(
        "Kumpulkan minimal dua petunjuk sebelum menentukan diagnosis."
      );
      return;
    }

    setFeedback("");
    setStage("diagnose");
  };

  const checkDiagnosis = () => {
    if (!diagnosis) {
      setFeedback("Pilih diagnosis terlebih dahulu.");
      return;
    }

    if (diagnosis === "topology") {
      setFeedback(
        "Diagnosis tepat. Gangguan terjadi pada jalur koneksi beberapa perangkat."
      );

      setTimeout(() => {
        setFeedback("");
        setStage("repair");
      }, 900);
    } else {
      setFeedback(
        "Diagnosis belum tepat. Periksa kembali perangkat mana yang masih berfungsi normal."
      );
    }
  };

  const checkRepair = () => {
    if (!repair) {
      setFeedback("Pilih tindakan perbaikan terlebih dahulu.");
      return;
    }

    if (repair === "replace-switch-cable") {
      setFeedback(
        "Perbaikan berhasil. Koneksi PC-01 dan PC-03 kembali tersambung."
      );

      setTimeout(() => {
        setFeedback("");
        setStage("verify");
      }, 900);
    } else {
      setFeedback(
        "Tindakan tersebut tidak menyelesaikan sumber masalah. Periksa kembali hasil investigasi."
      );
    }
  };

  const completeChallenge = () => {
    const saved = JSON.parse(
      localStorage.getItem("netlabCompletedChallenges") || "[]"
    );

    if (!saved.includes(3)) {
      localStorage.setItem(
        "netlabCompletedChallenges",
        JSON.stringify([...saved, 3])
      );
    }

    setCompleted(true);
    setStage("complete");
  };

  const resetChallenge = () => {
    setStage("briefing");
    setSelectedClues([]);
    setDiagnosis("");
    setRepair("");
    setFeedback("");
    setCompleted(false);
  };

  return (
    <div className="topology-failure-page">
      <div className="topology-background-glow topology-glow-one"></div>
      <div className="topology-background-glow topology-glow-two"></div>

      <header className="topology-failure-header">
        <div className="topology-header-inner">
          <div className="topology-challenge-badge">
            <span>🔗</span>
            NETLAB CHALLENGE
          </div>

          <div className="topology-header-title">
            <p>MISSION 03</p>

            <h1>
              TOPOLOGY <span>FAILURE</span>
            </h1>

            <span>
              Investigasi gangguan pada jaringan laboratorium dan temukan
              titik masalahnya.
            </span>
          </div>
        </div>
      </header>

      <main className="topology-failure-content">
        <section className="topology-case-card">
          <div className="topology-case-label">
            <span>CASE FILE #003</span>

            <span className="case-status">
              {stage === "complete" ? "SOLVED" : "ACTIVE"}
            </span>
          </div>

          <h2>Laboratorium TKJ Kehilangan Koneksi</h2>

          <p>
            Sebuah laboratorium memiliki empat komputer yang terhubung melalui
            switch dan router. Tiba-tiba PC-01 dan PC-03 tidak dapat
            berkomunikasi dengan jaringan, sementara PC-02 dan PC-04 masih
            berjalan normal.
          </p>

          <div className="topology-case-details">
            <div>
              <span>LOCATION</span>
              <strong>Lab TKJ 01</strong>
            </div>

            <div>
              <span>DEVICES</span>
              <strong>6 Perangkat</strong>
            </div>

            <div>
              <span>PROBLEM</span>
              <strong>Partial Network Failure</strong>
            </div>
          </div>
        </section>

        <section className="topology-stage-section">
          <div className="topology-stage-header">
            <div>
              <p>MISSION PROGRESS</p>

              <h2>
                {stage === "briefing" && "01 — Briefing"}
                {stage === "investigate" && "02 — Investigasi"}
                {stage === "diagnose" && "03 — Diagnosis"}
                {stage === "repair" && "04 — Perbaikan"}
                {stage === "verify" && "05 — Verifikasi"}
                {stage === "complete" && "✓ — Mission Complete"}
              </h2>
            </div>

            <div className="topology-stage-indicator">
              <span className={stage !== "briefing" ? "done" : "active"}>
                01
              </span>

              <i></i>

              <span
                className={
                  [
                    "investigate",
                    "diagnose",
                    "repair",
                    "verify",
                    "complete",
                  ].includes(stage)
                    ? "active"
                    : ""
                }
              >
                02
              </span>

              <i></i>

              <span
                className={
                  ["diagnose", "repair", "verify", "complete"].includes(stage)
                    ? "active"
                    : ""
                }
              >
                03
              </span>

              <i></i>

              <span
                className={
                  ["repair", "verify", "complete"].includes(stage)
                    ? "active"
                    : ""
                }
              >
                04
              </span>

              <i></i>

              <span
                className={
                  ["verify", "complete"].includes(stage) ? "active" : ""
                }
              >
                05
              </span>
            </div>
          </div>

          {stage === "briefing" && (
            <div className="topology-briefing-panel">
              <div className="briefing-icon">🕵️</div>

              <div className="briefing-content">
                <p className="topology-panel-label">TECHNICIAN BRIEFING</p>

                <h3>
                  Kamu menerima laporan gangguan dari Lab TKJ 01.
                </h3>

                <p>
                  Jangan langsung mengganti perangkat. Periksa kondisi jaringan
                  terlebih dahulu dan gunakan informasi yang tersedia untuk
                  menentukan sumber gangguan.
                </p>

                <div className="briefing-rules">
                  <div>
                    <span>01</span>
                    <p>Periksa perangkat dan koneksi.</p>
                  </div>

                  <div>
                    <span>02</span>
                    <p>Kumpulkan petunjuk sebelum mendiagnosis.</p>
                  </div>

                  <div>
                    <span>03</span>
                    <p>Pilih tindakan perbaikan yang sesuai.</p>
                  </div>

                  <div>
                    <span>04</span>
                    <p>Verifikasi bahwa jaringan kembali normal.</p>
                  </div>
                </div>

                <button
                  className="topology-primary-button"
                  onClick={startInvestigation}
                >
                  Mulai Investigasi →
                </button>
              </div>
            </div>
          )}

          {stage === "investigate" && (
            <div className="topology-investigation-panel">
              <div className="topology-panel-heading">
                <div>
                  <p className="topology-panel-label">NETWORK OVERVIEW</p>
                  <h3>Periksa Kondisi Laboratorium</h3>
                </div>

                <span className="topology-live-status">
                  ● LIVE NETWORK
                </span>
              </div>

              <div className="topology-network-map">
                <div className="topology-device-row">
                  {devices.slice(0, 2).map((device) => (
                    <div
                      key={device.id}
                      className={`topology-device ${
                        device.status === "Tidak Terhubung"
                          ? "device-warning"
                          : ""
                      }`}
                    >
                      <span>{device.icon}</span>
                      <strong>{device.name}</strong>
                      <small>{device.status}</small>
                    </div>
                  ))}
                </div>

                <div className="topology-connection-line">
                  <span></span>

                  <div className="topology-switch">
                    <span>🔀</span>
                    <strong>SW-01</strong>
                    <small>ACTIVE</small>
                  </div>

                  <span></span>
                </div>

                <div className="topology-device-row">
                  {devices.slice(2, 4).map((device) => (
                    <div
                      key={device.id}
                      className={`topology-device ${
                        device.status === "Tidak Terhubung"
                          ? "device-warning"
                          : ""
                      }`}
                    >
                      <span>{device.icon}</span>
                      <strong>{device.name}</strong>
                      <small>{device.status}</small>
                    </div>
                  ))}
                </div>

                <div className="topology-router-line">
                  <span></span>

                  <div className="topology-router">
                    <span>📡</span>
                    <strong>R-01</strong>
                    <small>ACTIVE</small>
                  </div>

                  <span></span>
                </div>
              </div>

              <div className="topology-clues-heading">
                <div>
                  <p className="topology-panel-label">AVAILABLE CLUES</p>
                  <h3>Pilih petunjuk yang menurutmu penting</h3>
                </div>

                <span>{selectedClues.length} dipilih</span>
              </div>

              <div className="topology-clues-grid">
                {clues.map((clue) => {
                  const selected = selectedClues.includes(clue.id);

                  return (
                    <button
                      key={clue.id}
                      className={`topology-clue-card ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() => toggleClue(clue.id)}
                    >
                      <div className="topology-clue-icon">
                        {clue.icon}
                      </div>

                      <div>
                        <strong>{clue.title}</strong>
                        <p>{clue.description}</p>
                      </div>

                      <span className="clue-check">
                        {selected ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              {feedback && (
                <div className="topology-feedback warning">
                  ⚠️ {feedback}
                </div>
              )}

              <button
                className="topology-primary-button"
                onClick={continueToDiagnosis}
              >
                Lanjut ke Diagnosis →
              </button>
            </div>
          )}

          {stage === "diagnose" && (
            <div className="topology-choice-panel">
              <div className="topology-panel-heading">
                <div>
                  <p className="topology-panel-label">
                    DIAGNOSTIC ANALYSIS
                  </p>

                  <h3>Apa penyebab utama gangguan?</h3>
                </div>
              </div>

              <p className="topology-question-description">
                Berdasarkan hasil investigasi, tentukan sumber masalah yang
                paling sesuai dengan kondisi jaringan.
              </p>

              <div className="topology-option-list">
                {diagnosisOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`topology-option-card ${
                      diagnosis === option.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setDiagnosis(option.id);
                      setFeedback("");
                    }}
                  >
                    <div className="topology-option-radio">
                      {diagnosis === option.id ? "●" : "○"}
                    </div>

                    <div>
                      <strong>{option.title}</strong>
                      <p>{option.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {feedback && (
                <div
                  className={`topology-feedback ${
                    diagnosis === "topology" ? "success" : "warning"
                  }`}
                >
                  {diagnosis === "topology" ? "✓" : "⚠️"} {feedback}
                </div>
              )}

              <button
                className="topology-primary-button"
                onClick={checkDiagnosis}
              >
                Periksa Diagnosis →
              </button>
            </div>
          )}

          {stage === "repair" && (
            <div className="topology-choice-panel">
              <div className="topology-panel-heading">
                <div>
                  <p className="topology-panel-label">
                    REPAIR PROTOCOL
                  </p>

                  <h3>Tentukan tindakan perbaikan</h3>
                </div>

                <span className="topology-repair-status">
                  DIAGNOSIS CONFIRMED
                </span>
              </div>

              <p className="topology-question-description">
                Jalur koneksi PC-01 dan PC-03 perlu diperiksa. Pilih tindakan
                yang akan kamu lakukan sebagai teknisi.
              </p>

              <div className="topology-option-list">
                {repairOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`topology-option-card ${
                      repair === option.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setRepair(option.id);
                      setFeedback("");
                    }}
                  >
                    <div className="topology-option-number">
                      {repair === option.id ? "✓" : "○"}
                    </div>

                    <div>
                      <strong>{option.title}</strong>
                      <p>{option.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {feedback && (
                <div className="topology-feedback warning">
                  ⚠️ {feedback}
                </div>
              )}

              <button
                className="topology-primary-button"
                onClick={checkRepair}
              >
                Terapkan Perbaikan →
              </button>
            </div>
          )}

          {stage === "verify" && (
            <div className="topology-verification-panel">
              <div className="verification-icon">🔧</div>

              <p className="topology-panel-label">
                SYSTEM VERIFICATION
              </p>

              <h3>Perbaikan telah diterapkan</h3>

              <p>
                Kabel PC-01 dan PC-03 telah dipasang ulang. Sekarang lakukan
                pemeriksaan akhir untuk memastikan semua perangkat dapat
                berkomunikasi.
              </p>

              <div className="verification-results">
                <div className="verification-item">
                  <span>PC-01 → SW-01</span>
                  <strong>✓ CONNECTED</strong>
                </div>

                <div className="verification-item">
                  <span>PC-02 → SW-01</span>
                  <strong>✓ CONNECTED</strong>
                </div>

                <div className="verification-item">
                  <span>PC-03 → SW-01</span>
                  <strong>✓ CONNECTED</strong>
                </div>

                <div className="verification-item">
                  <span>PC-04 → SW-01</span>
                  <strong>✓ CONNECTED</strong>
                </div>

                <div className="verification-item">
                  <span>SW-01 → R-01</span>
                  <strong>✓ CONNECTED</strong>
                </div>
              </div>

              <button
                className="topology-primary-button"
                onClick={completeChallenge}
              >
                Jalankan Final Verification →
              </button>
            </div>
          )}

          {stage === "complete" && completed && (
            <div className="topology-complete-panel">
              <div className="complete-icon">✓</div>

              <p className="topology-panel-label">
                MISSION COMPLETE
              </p>

              <h3>Network Berhasil Dipulihkan!</h3>

              <p>
                Kamu berhasil menemukan gangguan pada jalur koneksi,
                menentukan diagnosis, melakukan perbaikan, dan memverifikasi
                seluruh jaringan.
              </p>

              <div className="complete-summary">
                <div>
                  <span>INVESTIGASI</span>
                  <strong>✓ SELESAI</strong>
                </div>

                <div>
                  <span>DIAGNOSIS</span>
                  <strong>✓ BENAR</strong>
                </div>

                <div>
                  <span>PERBAIKAN</span>
                  <strong>✓ BERHASIL</strong>
                </div>

                <div>
                  <span>VERIFIKASI</span>
                  <strong>✓ NORMAL</strong>
                </div>
              </div>

              <div className="topology-complete-actions">
                <button
                  className="topology-secondary-button"
                  onClick={resetChallenge}
                >
                  ↻ Ulangi Challenge
                </button>

                <button
                  className="topology-primary-button"
                  onClick={() => navigate("/challenge/wifi-rescue")}
                >
                  Challenge Berikutnya →
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="topology-bottom-navigation">
          <Link
            to="/challenge"
            className="topology-nav-button"
          >
            ← Semua Challenge
          </Link>

          <Link
            to="/materi/topologi-jaringan"
            className="topology-nav-button"
          >
            📚 Pelajari Topologi
          </Link>
        </div>
      </main>
    </div>
  );
}

export default TopologyFailure;