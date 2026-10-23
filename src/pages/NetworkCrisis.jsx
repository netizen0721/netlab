import { useState } from "react";
import { Link } from "react-router-dom";
import "./NetworkCrisis.css";

const crisisClues = [
  {
    id: 1,
    icon: "🌐",
    title: "Internet Terputus",
    description:
      "Semua komputer di laboratorium tidak dapat mengakses internet.",
  },
  {
    id: 2,
    icon: "🔀",
    title: "Switch Tidak Normal",
    description:
      "Lampu indikator pada beberapa port switch mati secara bersamaan.",
  },
  {
    id: 3,
    icon: "📡",
    title: "Router Tidak Merespons",
    description:
      "Router tidak memberikan respons ketika dilakukan pemeriksaan koneksi.",
  },
  {
    id: 4,
    icon: "🖥️",
    title: "PC Masih Menyala",
    description:
      "Komputer tetap menyala dan dapat berkomunikasi secara lokal.",
  },
];

const diagnosisOptions = [
  {
    id: "router",
    title: "Router bermasalah",
    description:
      "Router menjadi pusat masalah karena koneksi menuju internet tidak berjalan.",
  },
  {
    id: "switch",
    title: "Switch bermasalah",
    description:
      "Switch mengalami gangguan sehingga koneksi beberapa perangkat terputus.",
  },
  {
    id: "pc",
    title: "Semua PC bermasalah",
    description:
      "Gangguan berasal dari komputer-komputer yang digunakan pengguna.",
  },
  {
    id: "cable",
    title: "Semua kabel LAN rusak",
    description:
      "Seluruh kabel jaringan mengalami kerusakan pada waktu yang sama.",
  },
];

const repairOptions = [
  {
    id: "restart-router",
    title: "Restart dan periksa router",
    description:
      "Periksa koneksi router kemudian lakukan restart untuk memulihkan layanan.",
  },
  {
    id: "replace-switch",
    title: "Ganti switch",
    description:
      "Mengganti switch meskipun router menjadi perangkat yang tidak merespons.",
  },
  {
    id: "replace-pcs",
    title: "Ganti semua PC",
    description:
      "Mengganti komputer yang digunakan oleh seluruh pengguna laboratorium.",
  },
  {
    id: "replace-cables",
    title: "Ganti seluruh kabel LAN",
    description:
      "Mengganti semua kabel LAN tanpa melakukan pemeriksaan perangkat utama.",
  },
];

const verificationItems = [
  {
    id: 1,
    title: "Router kembali merespons",
    description: "Router dapat diperiksa dan memberikan respons jaringan.",
  },
  {
    id: 2,
    title: "Switch kembali aktif",
    description: "Port jaringan kembali menunjukkan aktivitas normal.",
  },
  {
    id: 3,
    title: "PC terhubung kembali",
    description: "Komputer dapat berkomunikasi dengan jaringan.",
  },
  {
    id: 4,
    title: "Internet kembali tersedia",
    description: "Akses internet berhasil dipulihkan.",
  },
];

function NetworkCrisis() {
  const [stage, setStage] = useState("briefing");
  const [selectedClues, setSelectedClues] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [repair, setRepair] = useState("");
  const [verification, setVerification] = useState([]);
  const [feedback, setFeedback] = useState("");

  const toggleClue = (id) => {
    setSelectedClues((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const startInvestigation = () => {
    setStage("investigate");
    setFeedback("");
  };

  const continueToDiagnosis = () => {
    if (selectedClues.length < 2) {
      setFeedback(
        "Pilih minimal 2 petunjuk sebelum melanjutkan ke tahap diagnosis."
      );
      return;
    }

    setStage("diagnose");
    setFeedback("");
  };

  const checkDiagnosis = () => {
    if (diagnosis !== "router") {
      setFeedback(
        "Diagnosis belum tepat. Perhatikan perangkat yang tidak merespons pemeriksaan jaringan."
      );
      return;
    }

    setFeedback(
      "Diagnosis tepat. Router merupakan sumber utama gangguan pada kasus ini."
    );
  };

  const continueToRepair = () => {
    if (diagnosis !== "router") {
      setFeedback("Tentukan diagnosis yang tepat terlebih dahulu.");
      return;
    }

    setStage("repair");
    setFeedback("");
  };

  const checkRepair = () => {
    if (repair !== "restart-router") {
      setFeedback(
        "Solusi belum tepat. Periksa kembali perangkat yang menjadi sumber gangguan."
      );
      return;
    }

    setFeedback(
      "Perbaikan tepat. Router berhasil dipulihkan dan jaringan mulai kembali normal."
    );
  };

  const continueToVerification = () => {
    if (repair !== "restart-router") {
      setFeedback("Selesaikan perbaikan jaringan terlebih dahulu.");
      return;
    }

    setStage("verify");
    setFeedback("");
  };

  const toggleVerification = (id) => {
    setVerification((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const completeChallenge = () => {
    if (verification.length < 3) {
      setFeedback(
        "Lakukan minimal 3 pemeriksaan untuk memastikan jaringan benar-benar pulih."
      );
      return;
    }

    const completed =
      JSON.parse(localStorage.getItem("netlabCompletedChallenges")) || [];

    if (!completed.includes(5)) {
      completed.push(5);
      localStorage.setItem(
        "netlabCompletedChallenges",
        JSON.stringify(completed)
      );
    }

    setStage("complete");
    setFeedback("");
  };

  const resetChallenge = () => {
    setStage("briefing");
    setSelectedClues([]);
    setDiagnosis("");
    setRepair("");
    setVerification([]);
    setFeedback("");
  };

  return (
    <div className="network-crisis-page">
      <div className="network-crisis-background-glow network-crisis-glow-one"></div>
      <div className="network-crisis-background-glow network-crisis-glow-two"></div>

      <header className="network-crisis-header">
        <div className="network-crisis-header-inner">
          <div className="network-crisis-challenge-badge">
            ⚠️ CHALLENGE 05 • FINAL MISSION
          </div>

          <div className="network-crisis-header-title">
            <p>NETWORK TROUBLESHOOTING</p>
            <h1>
              NETWORK <span>CRISIS</span>
            </h1>
            <span>
              Satu laboratorium mengalami gangguan jaringan besar. Temukan
              sumber masalah, lakukan perbaikan, lalu pastikan seluruh jaringan
              kembali normal.
            </span>
          </div>
        </div>
      </header>

      <main className="network-crisis-content">
        <section className="network-crisis-case-card">
          <div className="network-crisis-case-label">
            <span>CASE FILE / NETLAB-005</span>
            <span className="network-crisis-case-status">
              ● SYSTEM CRITICAL
            </span>
          </div>

          <h2>Laboratorium TKJ Mengalami Krisis Jaringan</h2>

          <p>
            Seluruh komputer di laboratorium kehilangan akses internet secara
            tiba-tiba. Beberapa perangkat jaringan menunjukkan kondisi yang
            tidak normal. Sebagai teknisi jaringan, kamu harus menemukan akar
            masalah dan memulihkan sistem.
          </p>

          <div className="network-crisis-case-details">
            <div>
              <span>LOKASI</span>
              <strong>Lab TKJ 02</strong>
            </div>

            <div>
              <span>PERANGKAT</span>
              <strong>Router + Switch + PC</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong>Critical Network Failure</strong>
            </div>
          </div>
        </section>

        <section className="network-crisis-stage-section">
          <div className="network-crisis-stage-header">
            <div>
              <p>MISSION PROGRESS</p>
              <h2>
                {stage === "briefing" && "Briefing"}
                {stage === "investigate" && "Investigation"}
                {stage === "diagnose" && "Diagnosis"}
                {stage === "repair" && "Repair"}
                {stage === "verify" && "Verification"}
                {stage === "complete" && "Mission Complete"}
              </h2>
            </div>

            <div className="network-crisis-stage-indicator">
              <span className={stage === "briefing" ? "active" : "done"}>
                1
              </span>
              <i></i>
              <span
                className={
                  stage === "investigate"
                    ? "active"
                    : ["diagnose", "repair", "verify", "complete"].includes(
                        stage
                      )
                    ? "done"
                    : ""
                }
              >
                2
              </span>
              <i></i>
              <span
                className={
                  stage === "diagnose"
                    ? "active"
                    : ["repair", "verify", "complete"].includes(stage)
                    ? "done"
                    : ""
                }
              >
                3
              </span>
              <i></i>
              <span
                className={
                  stage === "repair"
                    ? "active"
                    : ["verify", "complete"].includes(stage)
                    ? "done"
                    : ""
                }
              >
                4
              </span>
              <i></i>
              <span
                className={
                  stage === "verify"
                    ? "active"
                    : stage === "complete"
                    ? "done"
                    : ""
                }
              >
                5
              </span>
            </div>
          </div>

          {stage === "briefing" && (
            <div className="network-crisis-briefing-panel">
              <div className="network-crisis-briefing-icon">🚨</div>

              <div className="network-crisis-briefing-content">
                <p className="network-crisis-panel-label">MISSION BRIEFING</p>
                <h3>Jaringan Dalam Kondisi Kritis</h3>

                <p>
                  Jangan langsung mengganti perangkat. Kumpulkan informasi
                  terlebih dahulu, tentukan sumber masalah berdasarkan bukti,
                  lalu lakukan perbaikan yang sesuai.
                </p>

                <div className="network-crisis-briefing-rules">
                  <div>
                    <span>01</span>
                    <p>Amati seluruh petunjuk yang tersedia.</p>
                  </div>

                  <div>
                    <span>02</span>
                    <p>Tentukan perangkat yang menjadi sumber masalah.</p>
                  </div>

                  <div>
                    <span>03</span>
                    <p>Pilih tindakan perbaikan yang sesuai.</p>
                  </div>

                  <div>
                    <span>04</span>
                    <p>Pastikan jaringan kembali normal.</p>
                  </div>
                </div>

                <button
                  className="network-crisis-primary-button"
                  onClick={startInvestigation}
                >
                  Mulai Investigasi →
                </button>
              </div>
            </div>
          )}

          {stage === "investigate" && (
            <div className="network-crisis-investigation-panel">
              <div className="network-crisis-panel-heading">
                <div>
                  <p className="network-crisis-panel-label">PHASE 01</p>
                  <h3>Kumpulkan Petunjuk</h3>
                </div>

                <span className="network-crisis-live-status">
                  ● SYSTEM MONITORING
                </span>
              </div>

              <div className="network-crisis-clues-heading">
                <h3>Network Evidence</h3>
                <span>{selectedClues.length} petunjuk dipilih</span>
              </div>

              <div className="network-crisis-clues-grid">
                {crisisClues.map((clue) => (
                  <button
                    key={clue.id}
                    className={`network-crisis-clue-card ${
                      selectedClues.includes(clue.id) ? "selected" : ""
                    }`}
                    onClick={() => toggleClue(clue.id)}
                  >
                    <span className="network-crisis-clue-icon">
                      {clue.icon}
                    </span>

                    <div>
                      <strong>{clue.title}</strong>
                      <p>{clue.description}</p>
                    </div>

                    {selectedClues.includes(clue.id) && (
                      <span className="network-crisis-clue-check">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {feedback && (
                <div className="network-crisis-feedback warning">
                  {feedback}
                </div>
              )}

              <button
                className="network-crisis-primary-button"
                onClick={continueToDiagnosis}
              >
                Lanjut ke Diagnosis →
              </button>
            </div>
          )}

          {stage === "diagnose" && (
            <div className="network-crisis-choice-panel">
              <p className="network-crisis-panel-label">PHASE 02</p>
              <h3>Tentukan Sumber Masalah</h3>

              <p className="network-crisis-question-description">
                Berdasarkan petunjuk yang telah dikumpulkan, perangkat mana
                yang paling sesuai dengan kondisi gangguan?
              </p>

              <div className="network-crisis-option-list">
                {diagnosisOptions.map((option, index) => (
                  <button
                    key={option.id}
                    className={`network-crisis-option-card ${
                      diagnosis === option.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setDiagnosis(option.id);
                      setFeedback("");
                    }}
                  >
                    <span className="network-crisis-option-number">
                      {index + 1}
                    </span>

                    <div>
                      <strong>{option.title}</strong>
                      <p>{option.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {feedback && (
                <div
                  className={`network-crisis-feedback ${
                    diagnosis === "router" ? "success" : "warning"
                  }`}
                >
                  {feedback}
                </div>
              )}

              <div className="network-crisis-action-row">
                <button
                  className="network-crisis-secondary-button"
                  onClick={() => setStage("investigate")}
                >
                  ← Kembali
                </button>

                <button
                  className="network-crisis-primary-button"
                  onClick={() => {
                    checkDiagnosis();
                    if (diagnosis === "router") {
                      setTimeout(() => {
                        setStage("repair");
                        setFeedback("");
                      }, 500);
                    }
                  }}
                >
                  Periksa Diagnosis →
                </button>
              </div>
            </div>
          )}

          {stage === "repair" && (
            <div className="network-crisis-choice-panel">
              <p className="network-crisis-panel-label">PHASE 03</p>
              <h3>Lakukan Perbaikan</h3>

              <p className="network-crisis-question-description">
                Diagnosis menunjukkan adanya masalah pada router. Pilih
                tindakan yang paling sesuai untuk memulihkan jaringan.
              </p>

              <div className="network-crisis-option-list">
                {repairOptions.map((option, index) => (
                  <button
                    key={option.id}
                    className={`network-crisis-option-card ${
                      repair === option.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setRepair(option.id);
                      setFeedback("");
                    }}
                  >
                    <span className="network-crisis-option-number">
                      {index + 1}
                    </span>

                    <div>
                      <strong>{option.title}</strong>
                      <p>{option.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {feedback && (
                <div
                  className={`network-crisis-feedback ${
                    repair === "restart-router" ? "success" : "warning"
                  }`}
                >
                  {feedback}
                </div>
              )}

              <div className="network-crisis-action-row">
                <button
                  className="network-crisis-secondary-button"
                  onClick={() => setStage("diagnose")}
                >
                  ← Kembali
                </button>

                <button
                  className="network-crisis-primary-button"
                  onClick={() => {
                    checkRepair();
                    if (repair === "restart-router") {
                      setTimeout(() => {
                        setStage("verify");
                        setFeedback("");
                      }, 500);
                    }
                  }}
                >
                  Terapkan Perbaikan →
                </button>
              </div>
            </div>
          )}

          {stage === "verify" && (
            <div className="network-crisis-verification-panel">
              <div className="network-crisis-verification-icon">🔍</div>

              <p className="network-crisis-panel-label">PHASE 04</p>
              <h3>Verifikasi Jaringan</h3>

              <p>
                Pastikan beberapa indikator jaringan telah kembali normal
                sebelum menyelesaikan misi.
              </p>

              <div className="network-crisis-verification-list">
                {verificationItems.map((item) => (
                  <button
                    key={item.id}
                    className={`network-crisis-verification-item ${
                      verification.includes(item.id) ? "selected" : ""
                    }`}
                    onClick={() => toggleVerification(item.id)}
                  >
                    <span className="network-crisis-verification-check">
                      {verification.includes(item.id) ? "✓" : "○"}
                    </span>

                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {feedback && (
                <div className="network-crisis-feedback warning">
                  {feedback}
                </div>
              )}

              <button
                className="network-crisis-primary-button"
                onClick={completeChallenge}
              >
                Selesaikan Verifikasi →
              </button>
            </div>
          )}

          {stage === "complete" && (
            <div className="network-crisis-complete-panel">
              <div className="network-crisis-complete-icon">✓</div>

              <p className="network-crisis-panel-label">MISSION COMPLETE</p>
              <h3>Network Crisis Berhasil Diselesaikan!</h3>

              <p>
                Kamu berhasil menemukan sumber gangguan, memperbaiki jaringan,
                dan melakukan verifikasi terhadap sistem.
              </p>

              <div className="network-crisis-complete-summary">
                <div>
                  <span>Diagnosis</span>
                  <strong>ROUTER</strong>
                </div>

                <div>
                  <span>Perbaikan</span>
                  <strong>BERHASIL</strong>
                </div>

                <div>
                  <span>Verifikasi</span>
                  <strong>LULUS</strong>
                </div>

                <div>
                  <span>Challenge</span>
                  <strong>SELESAI</strong>
                </div>
              </div>

              <div className="network-crisis-complete-actions">
                <button
                  className="network-crisis-secondary-button"
                  onClick={resetChallenge}
                >
                  ↻ Ulangi Challenge
                </button>

                <Link
                  to="/challenge"
                  className="network-crisis-primary-button"
                >
                  ← Semua Challenge
                </Link>
              </div>
            </div>
          )}
        </section>

        <div className="network-crisis-bottom-navigation">
          <Link
            to="/challenge"
            className="network-crisis-nav-button"
          >
            ← Semua Challenge
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NetworkCrisis;