import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WifiRescue.css";

const accessPoints = [
  {
    id: "ap01",
    name: "AP-01",
    location: "Lab TKJ 01",
    status: "Aktif",
    signal: "Baik",
  },
  {
    id: "ap02",
    name: "AP-02",
    location: "Lab TKJ 02",
    status: "Bermasalah",
    signal: "Lemah",
  },
  {
    id: "ap03",
    name: "AP-03",
    location: "Ruang Guru",
    status: "Aktif",
    signal: "Baik",
  },
];

const clues = [
  {
    id: 1,
    title: "SSID Terlihat",
    description:
      "Nama Wi-Fi NETLAB-CLASS masih muncul pada perangkat siswa.",
    icon: "📶",
  },
  {
    id: 2,
    title: "Sinyal Lemah",
    description:
      "Perangkat yang berada di dekat AP-02 hanya mendapatkan satu bar sinyal.",
    icon: "📡",
  },
  {
    id: 3,
    title: "Kabel Ethernet",
    description:
      "Kabel jaringan menuju AP-02 terpasang, tetapi indikator link tidak menyala.",
    icon: "🔌",
  },
  {
    id: 4,
    title: "AP Lain Normal",
    description:
      "AP-01 dan AP-03 masih dapat digunakan tanpa masalah.",
    icon: "🛜",
  },
];

const diagnosisOptions = [
  {
    id: "internet",
    title: "Koneksi internet dari ISP terputus",
    description:
      "Gangguan berasal dari koneksi internet utama laboratorium.",
  },
  {
    id: "ap",
    title: "Access Point AP-02 mengalami gangguan",
    description:
      "Masalah terpusat pada perangkat Access Point yang melayani area tersebut.",
  },
  {
    id: "password",
    title: "Password Wi-Fi salah",
    description:
      "Perangkat tidak dapat terhubung karena kredensial Wi-Fi berubah.",
  },
  {
    id: "client",
    title: "Semua perangkat siswa mengalami kerusakan",
    description:
      "Masalah terjadi pada perangkat client yang mencoba menggunakan Wi-Fi.",
  },
];

const repairOptions = [
  {
    id: "ethernet",
    title: "Pasang ulang kabel Ethernet AP-02",
    description:
      "Periksa kedua ujung kabel dan pastikan indikator link kembali menyala.",
  },
  {
    id: "password",
    title: "Ganti password Wi-Fi",
    description:
      "Ubah password SSID agar seluruh perangkat melakukan autentikasi ulang.",
  },
  {
    id: "router",
    title: "Restart router utama",
    description:
      "Matikan dan hidupkan kembali router utama laboratorium.",
  },
  {
    id: "ssid",
    title: "Ganti nama SSID AP-02",
    description:
      "Ubah nama jaringan untuk mengatasi gangguan koneksi.",
  },
];

const verificationOptions = [
  {
    id: "signal",
    title: "Periksa kekuatan sinyal",
    description: "Pastikan perangkat mendapatkan sinyal yang stabil.",
  },
  {
    id: "connect",
    title: "Hubungkan client ke NETLAB-CLASS",
    description: "Pastikan perangkat siswa berhasil tersambung.",
  },
  {
    id: "ping",
    title: "Uji koneksi jaringan",
    description: "Pastikan client dapat berkomunikasi dengan gateway.",
  },
];

function WifiRescue() {
  const navigate = useNavigate();

  const [stage, setStage] = useState("briefing");
  const [selectedClues, setSelectedClues] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [repair, setRepair] = useState("");
  const [verification, setVerification] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const toggleClue = (id) => {
    setSelectedClues((previous) =>
      previous.includes(id)
        ? previous.filter((clueId) => clueId !== id)
        : [...previous, id]
    );
  };

  const toggleVerification = (id) => {
    setVerification((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  };

  const startInvestigation = () => {
    setFeedback("");
    setStage("investigate");
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

    if (diagnosis === "ap") {
      setFeedback(
        "Diagnosis tepat. Gangguan terfokus pada Access Point AP-02."
      );

      setTimeout(() => {
        setFeedback("");
        setStage("repair");
      }, 900);
    } else {
      setFeedback(
        "Diagnosis belum tepat. Bandingkan kondisi AP-02 dengan perangkat jaringan lainnya."
      );
    }
  };

  const checkRepair = () => {
    if (!repair) {
      setFeedback("Pilih tindakan perbaikan terlebih dahulu.");
      return;
    }

    if (repair === "ethernet") {
      setFeedback(
        "Perbaikan berhasil. Link Ethernet AP-02 kembali aktif."
      );

      setTimeout(() => {
        setFeedback("");
        setStage("verify");
      }, 900);
    } else {
      setFeedback(
        "Tindakan tersebut belum menyelesaikan sumber masalah. Periksa kembali petunjuk yang ditemukan."
      );
    }
  };

  const completeChallenge = () => {
    if (verification.length < 3) {
      setFeedback(
        "Lakukan seluruh pemeriksaan verifikasi sebelum menyelesaikan challenge."
      );
      return;
    }

    const saved = JSON.parse(
      localStorage.getItem("netlabCompletedChallenges") || "[]"
    );

    if (!saved.includes(4)) {
      localStorage.setItem(
        "netlabCompletedChallenges",
        JSON.stringify([...saved, 4])
      );
    }

    setFeedback("");
    setCompleted(true);
    setStage("complete");
  };

  const resetChallenge = () => {
    setStage("briefing");
    setSelectedClues([]);
    setDiagnosis("");
    setRepair("");
    setVerification([]);
    setFeedback("");
    setCompleted(false);
  };

  return (
    <div className="wifi-rescue-page">
      <div className="wifi-background-glow wifi-glow-one"></div>
      <div className="wifi-background-glow wifi-glow-two"></div>

      <header className="wifi-rescue-header">
        <div className="wifi-header-inner">
          <div className="wifi-challenge-badge">
            <span>📡</span>
            NETLAB CHALLENGE
          </div>

          <div className="wifi-header-title">
            <p>MISSION 04</p>

            <h1>
              WI-FI <span>RESCUE</span>
            </h1>

            <span>
              Pulihkan koneksi Wi-Fi laboratorium dan temukan sumber gangguan
              pada Access Point.
            </span>
          </div>
        </div>
      </header>

      <main className="wifi-rescue-content">
        <section className="wifi-case-card">
          <div className="wifi-case-label">
            <span>CASE FILE #004</span>

            <span className="wifi-case-status">
              {stage === "complete" ? "SOLVED" : "ACTIVE"}
            </span>
          </div>

          <h2>Wi-Fi Laboratorium Tiba-Tiba Bermasalah</h2>

          <p>
            Siswa di Lab TKJ 02 melaporkan bahwa jaringan Wi-Fi
            NETLAB-CLASS sulit digunakan. SSID masih terlihat, tetapi koneksi
            sangat lemah dan beberapa perangkat tidak dapat mengakses jaringan.
          </p>

          <div className="wifi-case-details">
            <div>
              <span>LOCATION</span>
              <strong>Lab TKJ 02</strong>
            </div>

            <div>
              <span>NETWORK</span>
              <strong>NETLAB-CLASS</strong>
            </div>

            <div>
              <span>PROBLEM</span>
              <strong>Wi-Fi Connection Failure</strong>
            </div>
          </div>
        </section>

        <section className="wifi-stage-section">
          <div className="wifi-stage-header">
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

            <div className="wifi-stage-indicator">
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
            <div className="wifi-briefing-panel">
              <div className="wifi-briefing-icon">📡</div>

              <div className="wifi-briefing-content">
                <p className="wifi-panel-label">NETWORK TECHNICIAN BRIEFING</p>

                <h3>
                  Kamu dipanggil untuk memperbaiki Wi-Fi Lab TKJ 02.
                </h3>

                <p>
                  Jangan langsung mengganti Access Point. Periksa kondisi
                  jaringan, kumpulkan petunjuk, tentukan sumber masalah, lalu
                  lakukan perbaikan yang sesuai.
                </p>

                <div className="wifi-briefing-rules">
                  <div>
                    <span>01</span>
                    <p>Periksa kondisi Access Point.</p>
                  </div>

                  <div>
                    <span>02</span>
                    <p>Kumpulkan petunjuk jaringan.</p>
                  </div>

                  <div>
                    <span>03</span>
                    <p>Tentukan sumber gangguan.</p>
                  </div>

                  <div>
                    <span>04</span>
                    <p>Verifikasi koneksi setelah diperbaiki.</p>
                  </div>
                </div>

                <button
                  className="wifi-primary-button"
                  onClick={startInvestigation}
                >
                  Mulai Investigasi →
                </button>
              </div>
            </div>
          )}

          {stage === "investigate" && (
            <div className="wifi-investigation-panel">
              <div className="wifi-panel-heading">
                <div>
                  <p className="wifi-panel-label">WIRELESS NETWORK</p>
                  <h3>Periksa Kondisi Access Point</h3>
                </div>

                <span className="wifi-live-status">● LIVE NETWORK</span>
              </div>

              <div className="wifi-access-point-grid">
                {accessPoints.map((accessPoint) => (
                  <div
                    key={accessPoint.id}
                    className={`wifi-ap-card ${
                      accessPoint.status === "Bermasalah"
                        ? "wifi-ap-warning"
                        : ""
                    }`}
                  >
                    <div className="wifi-ap-icon">📡</div>

                    <div className="wifi-ap-name">
                      <strong>{accessPoint.name}</strong>
                      <span>{accessPoint.location}</span>
                    </div>

                    <div className="wifi-ap-status">
                      <span>STATUS</span>
                      <strong>{accessPoint.status}</strong>
                    </div>

                    <div className="wifi-signal">
                      <span>SIGNAL</span>

                      <div className="wifi-signal-bars">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>

                      <strong>{accessPoint.signal}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="wifi-clues-heading">
                <div>
                  <p className="wifi-panel-label">AVAILABLE CLUES</p>
                  <h3>Pilih petunjuk yang menurutmu penting</h3>
                </div>

                <span>{selectedClues.length} dipilih</span>
              </div>

              <div className="wifi-clues-grid">
                {clues.map((clue) => {
                  const selected = selectedClues.includes(clue.id);

                  return (
                    <button
                      key={clue.id}
                      className={`wifi-clue-card ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() => toggleClue(clue.id)}
                    >
                      <div className="wifi-clue-icon">{clue.icon}</div>

                      <div>
                        <strong>{clue.title}</strong>
                        <p>{clue.description}</p>
                      </div>

                      <span className="wifi-clue-check">
                        {selected ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              {feedback && (
                <div className="wifi-feedback warning">
                  ⚠️ {feedback}
                </div>
              )}

              <button
                className="wifi-primary-button"
                onClick={continueToDiagnosis}
              >
                Lanjut ke Diagnosis →
              </button>
            </div>
          )}

          {stage === "diagnose" && (
            <div className="wifi-choice-panel">
              <div className="wifi-panel-heading">
                <div>
                  <p className="wifi-panel-label">WIRELESS DIAGNOSTIC</p>

                  <h3>Apa penyebab utama gangguan?</h3>
                </div>
              </div>

              <p className="wifi-question-description">
                Gunakan hasil investigasi untuk menentukan sumber masalah pada
                jaringan Wi-Fi Lab TKJ 02.
              </p>

              <div className="wifi-option-list">
                {diagnosisOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`wifi-option-card ${
                      diagnosis === option.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setDiagnosis(option.id);
                      setFeedback("");
                    }}
                  >
                    <div className="wifi-option-radio">
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
                  className={`wifi-feedback ${
                    diagnosis === "ap" ? "success" : "warning"
                  }`}
                >
                  {diagnosis === "ap" ? "✓" : "⚠️"} {feedback}
                </div>
              )}

              <button
                className="wifi-primary-button"
                onClick={checkDiagnosis}
              >
                Periksa Diagnosis →
              </button>
            </div>
          )}

          {stage === "repair" && (
            <div className="wifi-choice-panel">
              <div className="wifi-panel-heading">
                <div>
                  <p className="wifi-panel-label">WIRELESS REPAIR</p>

                  <h3>Tentukan tindakan perbaikan</h3>
                </div>

                <span className="wifi-repair-status">
                  DIAGNOSIS CONFIRMED
                </span>
              </div>

              <p className="wifi-question-description">
                AP-02 mengalami masalah pada koneksi jaringan. Pilih tindakan
                yang paling sesuai berdasarkan hasil investigasi.
              </p>

              <div className="wifi-option-list">
                {repairOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`wifi-option-card ${
                      repair === option.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setRepair(option.id);
                      setFeedback("");
                    }}
                  >
                    <div className="wifi-option-number">
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
                <div className="wifi-feedback warning">
                  ⚠️ {feedback}
                </div>
              )}

              <button className="wifi-primary-button" onClick={checkRepair}>
                Terapkan Perbaikan →
              </button>
            </div>
          )}

          {stage === "verify" && (
            <div className="wifi-verification-panel">
              <div className="wifi-verification-icon">📶</div>

              <p className="wifi-panel-label">SYSTEM VERIFICATION</p>

              <h3>AP-02 berhasil diperbaiki</h3>

              <p>
                Kabel Ethernet telah dipasang ulang dan indikator link kembali
                aktif. Sekarang lakukan pemeriksaan akhir pada jaringan Wi-Fi.
              </p>

              <div className="wifi-verification-list">
                {verificationOptions.map((option) => {
                  const selected = verification.includes(option.id);

                  return (
                    <button
                      key={option.id}
                      className={`wifi-verification-item ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() => toggleVerification(option.id)}
                    >
                      <div className="wifi-verification-check">
                        {selected ? "✓" : "○"}
                      </div>

                      <div>
                        <strong>{option.title}</strong>
                        <p>{option.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {feedback && (
                <div className="wifi-feedback warning">
                  ⚠️ {feedback}
                </div>
              )}

              <button
                className="wifi-primary-button"
                onClick={completeChallenge}
              >
                Jalankan Final Verification →
              </button>
            </div>
          )}

          {stage === "complete" && completed && (
            <div className="wifi-complete-panel">
              <div className="wifi-complete-icon">✓</div>

              <p className="wifi-panel-label">MISSION COMPLETE</p>

              <h3>Wi-Fi Berhasil Dipulihkan!</h3>

              <p>
                Kamu berhasil mengidentifikasi gangguan pada AP-02, menemukan
                sumber masalah, melakukan perbaikan, dan memastikan koneksi
                Wi-Fi kembali normal.
              </p>

              <div className="wifi-complete-summary">
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

              <div className="wifi-complete-actions">
                <button
                  className="wifi-secondary-button"
                  onClick={resetChallenge}
                >
                  ↻ Ulangi Challenge
                </button>

                <button
                  className="wifi-primary-button"
                  onClick={() => navigate("/challenge/network-crisis")}
                >
                  Challenge Berikutnya →
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="wifi-bottom-navigation">
  <Link to="/challenge" className="wifi-nav-button">
    ← Semua Challenge
  </Link>
</div>
      </main>
    </div>
  );
}

export default WifiRescue;