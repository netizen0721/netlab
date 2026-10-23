import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./IPHunter.css";

const stages = [
  {
    id: 1,
    title: "Laporan Insiden",
  },
  {
    id: 2,
    title: "Periksa Konfigurasi",
  },
  {
    id: 3,
    title: "Analisis IP",
  },
  {
    id: 4,
    title: "Perbaiki Konfigurasi",
  },
  {
    id: 5,
    title: "Verifikasi",
  },
];

function IPHunter() {
  const navigate = useNavigate();

  const [currentStage, setCurrentStage] = useState(1);
  const [selectedClue, setSelectedClue] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedCause, setSelectedCause] = useState(null);
  const [selectedFix, setSelectedFix] = useState(null);
  const [verification, setVerification] = useState(null);
  const [completed, setCompleted] = useState(false);

  const markChecked = (item) => {
    setCheckedItems((previous) =>
      previous.includes(item)
        ? previous
        : [...previous, item]
    );
  };

  const goToStage = (stage) => {
    setCurrentStage(stage);
    setSelectedClue(null);
    setSelectedCause(null);
    setSelectedFix(null);
    setVerification(null);
  };

  const handleVerification = (result) => {
    setVerification(result);

    if (result === "success") {
      const saved = JSON.parse(
        localStorage.getItem("netlabCompletedChallenges") || "[]"
      );

      if (!saved.includes(2)) {
        localStorage.setItem(
          "netlabCompletedChallenges",
          JSON.stringify([...saved, 2])
        );
      }

      setCompleted(true);
    }
  };

  return (
    <div className="ip-hunter-page">
      <div className="iph-background-glow iph-glow-one"></div>
      <div className="iph-background-glow iph-glow-two"></div>

      <header className="iph-header">
        <div className="iph-header-content">
          <div className="iph-case-label">
            CASE 02 • IP HUNTER
          </div>

          <h1>
            IP <span>Hunter</span>
          </h1>

          <p>
            Investigasi konfigurasi jaringan sebuah komputer dan
            temukan kesalahan IP address yang menyebabkan perangkat
            tidak dapat berkomunikasi dengan jaringan.
          </p>
        </div>
      </header>

      <main className="iph-content">
        <section className="iph-case-banner">
          <div className="iph-case-icon">🌐</div>

          <div className="iph-case-info">
            <span className="iph-case-tag">
              NETWORK INCIDENT
            </span>

            <h2>
              PC Lab 02 Tidak Dapat Mengakses Server
            </h2>

            <p>
              PC menyala dan kabel jaringan terhubung dengan baik,
              tetapi komputer tidak dapat mengakses server lokal
              maupun perangkat lain dalam jaringan.
            </p>
          </div>

          <div className="iph-case-status">
            <span>CASE STATUS</span>

            <strong>
              {completed ? "SOLVED ✓" : "INVESTIGATING"}
            </strong>
          </div>
        </section>

        <section className="iph-stage-navigation">
          {stages.map((stage) => (
            <button
              key={stage.id}
              className={`iph-stage-button ${
                currentStage === stage.id ? "active" : ""
              }`}
              onClick={() => {
                if (stage.id <= currentStage) {
                  setCurrentStage(stage.id);
                }
              }}
              disabled={stage.id > currentStage}
            >
              <span className="iph-stage-number">
                {String(stage.id).padStart(2, "0")}
              </span>

              <span className="iph-stage-title">
                {stage.title}
              </span>
            </button>
          ))}
        </section>

        {currentStage === 1 && (
          <section className="iph-panel">
            <div className="iph-panel-header">
              <div>
                <span className="iph-panel-label">
                  STAGE 01
                </span>

                <h2>Laporan Insiden</h2>
              </div>

              <div className="iph-panel-icon">
                📋
              </div>
            </div>

            <div className="iph-report-box">
              <div className="iph-report-header">
                <span>INCIDENT REPORT</span>
                <span>09:20 AM</span>
              </div>

              <p>
                "PC Lab 02 tidak dapat membuka server sekolah.
                Kabel LAN sudah terpasang dan lampu port switch
                menyala. PC juga bisa digunakan seperti biasa,
                tetapi tidak dapat terhubung ke komputer lain."
              </p>

              <div className="iph-report-user">
                <div className="iph-user-avatar">
                  👩‍💻
                </div>

                <div>
                  <strong>
                    Sinta — Lab TKJ
                  </strong>

                  <span>
                    Reported from Computer Lab
                  </span>
                </div>
              </div>
            </div>

            <div className="iph-clue-title">
              <span>
                PILIH PETUNJUK YANG INGIN DIPERIKSA
              </span>
            </div>

            <div className="iph-investigation-grid">
              <button
                className={`iph-investigation-card ${
                  selectedClue === "cable"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedClue("cable")
                }
              >
                <span className="iph-investigation-icon">
                  🔌
                </span>

                <strong>Kabel LAN</strong>

                <span>
                  Periksa koneksi fisik komputer.
                </span>
              </button>

              <button
                className={`iph-investigation-card ${
                  selectedClue === "switch"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedClue("switch")
                }
              >
                <span className="iph-investigation-icon">
                  🔀
                </span>

                <strong>Switch</strong>

                <span>
                  Periksa status port jaringan.
                </span>
              </button>

              <button
                className={`iph-investigation-card ${
                  selectedClue === "ip"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedClue("ip")
                }
              >
                <span className="iph-investigation-icon">
                  🌐
                </span>

                <strong>IP Configuration</strong>

                <span>
                  Periksa alamat IP komputer.
                </span>
              </button>

              <button
                className={`iph-investigation-card ${
                  selectedClue === "server"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedClue("server")
                }
              >
                <span className="iph-investigation-icon">
                  🖥️
                </span>

                <strong>Server</strong>

                <span>
                  Periksa kondisi server jaringan.
                </span>
              </button>
            </div>

            {selectedClue && (
              <div className="iph-clue-result">
                {selectedClue === "cable" && (
                  <>
                    <strong>🔌 Kabel LAN</strong>

                    <p>
                      Kabel terpasang dengan baik. Lampu
                      indikator Ethernet menyala.
                    </p>
                  </>
                )}

                {selectedClue === "switch" && (
                  <>
                    <strong>🔀 Switch</strong>

                    <p>
                      Port 12 aktif dan indikator link
                      menyala normal.
                    </p>
                  </>
                )}

                {selectedClue === "ip" && (
                  <>
                    <strong>🌐 IP Configuration</strong>

                    <p>
                      Konfigurasi menunjukkan alamat IP
                      <b> 192.168.20.55</b>.
                    </p>
                  </>
                )}

                {selectedClue === "server" && (
                  <>
                    <strong>🖥️ Server</strong>

                    <p>
                      Server aktif dan dapat diakses oleh
                      komputer lain di jaringan.
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="iph-action-area">
              <button
                className="iph-primary-button"
                disabled={!selectedClue}
                onClick={() => goToStage(2)}
              >
                Periksa Konfigurasi →
              </button>
            </div>
          </section>
        )}

        {currentStage === 2 && (
          <section className="iph-panel">
            <div className="iph-panel-header">
              <div>
                <span className="iph-panel-label">
                  STAGE 02
                </span>

                <h2>
                  Periksa Konfigurasi
                </h2>
              </div>

              <div className="iph-panel-icon">
                ⚙️
              </div>
            </div>

            <p className="iph-panel-description">
              Periksa setiap bagian konfigurasi jaringan PC
              Lab 02. Temukan informasi yang tidak sesuai
              dengan jaringan laboratorium.
            </p>

            <div className="iph-config-grid">
              <button
                className={`iph-config-card ${
                  checkedItems.includes("ip")
                    ? "checked"
                    : ""
                }`}
                onClick={() =>
                  markChecked("ip")
                }
              >
                <div className="iph-config-icon">
                  🌐
                </div>

                <span className="iph-config-label">
                  IP ADDRESS
                </span>

                <strong>
                  192.168.20.55
                </strong>

                <small>
                  Status: Perlu diperiksa
                </small>

                {checkedItems.includes("ip") && (
                  <em>✓ Checked</em>
                )}
              </button>

              <button
                className={`iph-config-card ${
                  checkedItems.includes("subnet")
                    ? "checked"
                    : ""
                }`}
                onClick={() =>
                  markChecked("subnet")
                }
              >
                <div className="iph-config-icon">
                  🧮
                </div>

                <span className="iph-config-label">
                  SUBNET MASK
                </span>

                <strong>
                  255.255.255.0
                </strong>

                <small>
                  Status: Normal
                </small>

                {checkedItems.includes("subnet") && (
                  <em>✓ Checked</em>
                )}
              </button>

              <button
                className={`iph-config-card ${
                  checkedItems.includes("gateway")
                    ? "checked"
                    : ""
                }`}
                onClick={() =>
                  markChecked("gateway")
                }
              >
                <div className="iph-config-icon">
                  🚪
                </div>

                <span className="iph-config-label">
                  DEFAULT GATEWAY
                </span>

                <strong>
                  192.168.10.1
                </strong>

                <small>
                  Status: Perlu diperiksa
                </small>

                {checkedItems.includes("gateway") && (
                  <em>✓ Checked</em>
                )}
              </button>

              <button
                className={`iph-config-card ${
                  checkedItems.includes("dns")
                    ? "checked"
                    : ""
                }`}
                onClick={() =>
                  markChecked("dns")
                }
              >
                <div className="iph-config-icon">
                  📡
                </div>

                <span className="iph-config-label">
                  DNS SERVER
                </span>

                <strong>
                  192.168.10.1
                </strong>

                <small>
                  Status: Normal
                </small>

                {checkedItems.includes("dns") && (
                  <em>✓ Checked</em>
                )}
              </button>
            </div>

            {checkedItems.length >= 3 && (
              <div className="iph-evidence-box">
                <div className="iph-evidence-icon">
                  ⚠️
                </div>

                <div>
                  <strong>
                    Ketidaksesuaian Ditemukan
                  </strong>

                  <p>
                    IP address menggunakan jaringan
                    192.168.20.0/24, sedangkan gateway
                    menggunakan jaringan 192.168.10.0/24.
                    Keduanya berada pada network yang berbeda.
                  </p>
                </div>
              </div>
            )}

            <div className="iph-action-area">
              <button
                className="iph-primary-button"
                disabled={checkedItems.length < 3}
                onClick={() => goToStage(3)}
              >
                Analisis IP →
              </button>
            </div>
          </section>
        )}

        {currentStage === 3 && (
          <section className="iph-panel">
            <div className="iph-panel-header">
              <div>
                <span className="iph-panel-label">
                  STAGE 03
                </span>

                <h2>
                  Analisis IP Address
                </h2>
              </div>

              <div className="iph-panel-icon">
                🧩
              </div>
            </div>

            <div className="iph-network-comparison">
              <div className="iph-network-side">
                <span>
                  PC LAB 02
                </span>

                <strong>
                  192.168.20.55
                </strong>

                <small>
                  Network: 192.168.20.0/24
                </small>
              </div>

              <div className="iph-network-divider">
                ≠
              </div>

              <div className="iph-network-side">
                <span>
                  GATEWAY
                </span>

                <strong>
                  192.168.10.1
                </strong>

                <small>
                  Network: 192.168.10.0/24
                </small>
              </div>
            </div>

            <p className="iph-panel-description">
              Berdasarkan data konfigurasi, tentukan penyebab
              utama PC Lab 02 tidak dapat berkomunikasi dengan
              gateway.
            </p>

            <div className="iph-cause-list">
              <button
                className={`iph-cause-option ${
                  selectedCause === "cable"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCause("cable")
                }
              >
                <span className="iph-option-number">
                  A
                </span>

                <div>
                  <strong>
                    Kabel jaringan rusak
                  </strong>

                  <p>
                    Kabel tidak dapat mengirimkan data
                    ke switch.
                  </p>
                </div>
              </button>

              <button
                className={`iph-cause-option ${
                  selectedCause === "gateway"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCause("gateway")
                }
              >
                <span className="iph-option-number">
                  B
                </span>

                <div>
                  <strong>
                    Gateway tidak aktif
                  </strong>

                  <p>
                    Gateway tidak dapat menerima paket
                    dari komputer.
                  </p>
                </div>
              </button>

              <button
                className={`iph-cause-option ${
                  selectedCause === "network"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCause("network")
                }
              >
                <span className="iph-option-number">
                  C
                </span>

                <div>
                  <strong>
                    IP berada pada network berbeda
                  </strong>

                  <p>
                    IP komputer dan gateway menggunakan
                    network address yang berbeda.
                  </p>
                </div>
              </button>

              <button
                className={`iph-cause-option ${
                  selectedCause === "dns"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCause("dns")
                }
              >
                <span className="iph-option-number">
                  D
                </span>

                <div>
                  <strong>
                    DNS server salah
                  </strong>

                  <p>
                    DNS tidak dapat menerjemahkan nama
                    domain.
                  </p>
                </div>
              </button>
            </div>

            {selectedCause && (
              <div
                className={`iph-answer-feedback ${
                  selectedCause === "network"
                    ? "correct"
                    : "incorrect"
                }`}
              >
                {selectedCause === "network" ? (
                  <>
                    <strong>
                      ✓ Analisis Benar
                    </strong>

                    <p>
                      PC menggunakan network
                      192.168.20.0/24 sedangkan gateway
                      berada pada network 192.168.10.0/24.
                      Konfigurasi tersebut tidak sesuai.
                    </p>
                  </>
                ) : (
                  <>
                    <strong>
                      ✕ Belum Tepat
                    </strong>

                    <p>
                      Periksa kembali hubungan antara
                      IP address, subnet mask, dan gateway.
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="iph-action-area">
              <button
                className="iph-primary-button"
                disabled={
                  selectedCause !== "network"
                }
                onClick={() => goToStage(4)}
              >
                Perbaiki Konfigurasi →
              </button>
            </div>
          </section>
        )}

        {currentStage === 4 && (
          <section className="iph-panel">
            <div className="iph-panel-header">
              <div>
                <span className="iph-panel-label">
                  STAGE 04
                </span>

                <h2>
                  Perbaiki Konfigurasi
                </h2>
              </div>

              <div className="iph-panel-icon">
                🔧
              </div>
            </div>

            <p className="iph-panel-description">
              Pilih konfigurasi yang tepat agar PC Lab 02
              dapat berada pada network yang sama dengan
              gateway.
            </p>

            <div className="iph-fix-list">
              <button
                className={`iph-fix-option ${
                  selectedFix === "fix1"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedFix("fix1")
                }
              >
                <span className="iph-fix-icon">
                  01
                </span>

                <div>
                  <strong>
                    Ubah IP menjadi 192.168.20.1
                  </strong>

                  <p>
                    Gunakan alamat IP yang sama dengan
                    gateway saat ini.
                  </p>
                </div>
              </button>

              <button
                className={`iph-fix-option ${
                  selectedFix === "fix2"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedFix("fix2")
                }
              >
                <span className="iph-fix-icon">
                  02
                </span>

                <div>
                  <strong>
                    Ubah gateway menjadi 192.168.20.1
                  </strong>

                  <p>
                    Sesuaikan gateway dengan network
                    IP komputer.
                  </p>
                </div>
              </button>

              <button
                className={`iph-fix-option ${
                  selectedFix === "fix3"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedFix("fix3")
                }
              >
                <span className="iph-fix-icon">
                  03
                </span>

                <div>
                  <strong>
                    Ubah IP menjadi 192.168.10.55
                  </strong>

                  <p>
                    Sesuaikan IP PC dengan network
                    gateway 192.168.10.0/24.
                  </p>
                </div>
              </button>

              <button
                className={`iph-fix-option ${
                  selectedFix === "fix4"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedFix("fix4")
                }
              >
                <span className="iph-fix-icon">
                  04
                </span>

                <div>
                  <strong>
                    Ubah subnet mask menjadi
                    255.255.0.0
                  </strong>

                  <p>
                    Perbesar subnet agar kedua network
                    dapat saling berkomunikasi.
                  </p>
                </div>
              </button>
            </div>

            {selectedFix === "fix3" && (
              <div className="iph-fix-success">
                <span>✓</span>

                <div>
                  <strong>
                    Konfigurasi Tepat
                  </strong>

                  <p>
                    IP 192.168.10.55 berada pada network
                    yang sama dengan gateway
                    192.168.10.1/24.
                  </p>
                </div>
              </div>
            )}

            {selectedFix &&
              selectedFix !== "fix3" && (
                <div className="iph-fix-warning">
                  <span>⚠</span>

                  <div>
                    <strong>
                      Konfigurasi Belum Tepat
                    </strong>

                    <p>
                      Pastikan PC menggunakan IP yang
                      berada pada network yang sama dengan
                      gateway.
                    </p>
                  </div>
                </div>
              )}

            <div className="iph-action-area">
              <button
                className="iph-primary-button"
                disabled={selectedFix !== "fix3"}
                onClick={() => goToStage(5)}
              >
                Verifikasi Jaringan →
              </button>
            </div>
          </section>
        )}

        {currentStage === 5 && (
          <section className="iph-panel">
            <div className="iph-panel-header">
              <div>
                <span className="iph-panel-label">
                  STAGE 05
                </span>

                <h2>
                  Verifikasi
                </h2>
              </div>

              <div className="iph-panel-icon">
                ✅
              </div>
            </div>

            <p className="iph-panel-description">
              Konfigurasi IP telah diperbaiki. Jalankan
              pengujian untuk memastikan PC Lab 02 dapat
              berkomunikasi dengan jaringan.
            </p>

            <div className="iph-terminal">
              <div className="iph-terminal-header">
                <span></span>
                <span></span>
                <span></span>

                <strong>
                  NETWORK DIAGNOSTIC
                </strong>
              </div>

              <div className="iph-terminal-body">
                <p>
                  <span>$</span> ipconfig
                </p>

                <p className="success-line">
                  IPv4 Address . . . : 192.168.10.55
                </p>

                <p className="success-line">
                  Subnet Mask . . . : 255.255.255.0
                </p>

                <p className="success-line">
                  Default Gateway . : 192.168.10.1
                </p>

                <p>
                  <span>$</span> ping 192.168.10.1
                </p>

                <p className="success-line">
                  ✓ Reply from 192.168.10.1
                </p>

                <p>
                  <span>$</span> ping 192.168.10.20
                </p>

                <p className="success-line">
                  ✓ Reply from 192.168.10.20
                </p>

                <p className="success-line">
                  ✓ Network connection restored
                </p>
              </div>
            </div>

            <div className="iph-verification-question">
              <h3>
                Apakah PC Lab 02 sudah dapat
                berkomunikasi?
              </h3>

              <p>
                Tentukan hasil akhir berdasarkan hasil
                pengujian di atas.
              </p>

              <div className="iph-verification-buttons">
                <button
                  className={`iph-verification-button ${
                    verification === "success"
                      ? "selected success"
                      : ""
                  }`}
                  onClick={() =>
                    handleVerification("success")
                  }
                >
                  ✓ Ya, koneksi normal
                </button>

                <button
                  className={`iph-verification-button ${
                    verification === "failed"
                      ? "selected failed"
                      : ""
                  }`}
                  onClick={() =>
                    handleVerification("failed")
                  }
                >
                  ✕ Tidak, masih bermasalah
                </button>
              </div>
            </div>

            {verification === "failed" && (
              <div className="iph-fix-warning">
                <span>⚠</span>

                <div>
                  <strong>
                    Periksa Kembali
                  </strong>

                  <p>
                    Hasil ping menunjukkan gateway dan
                    perangkat jaringan dapat dijangkau.
                    Perhatikan kembali hasil pengujian.
                  </p>
                </div>
              </div>
            )}

            {completed && (
              <div className="iph-complete-box">
                <div className="iph-complete-icon">
                  ✓
                </div>

                <div>
                  <span className="iph-complete-label">
                    CASE SOLVED
                  </span>

                  <h2>
                    IP Hunter Selesai!
                  </h2>

                  <p>
                    Kamu berhasil menemukan kesalahan
                    network configuration dan memperbaiki
                    IP PC Lab 02.
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        <div className="iph-bottom-navigation">
          <Link
            to="/challenge"
            className="iph-navigation-button"
          >
            ← Semua Challenge
          </Link>

          {completed && (
            <button
              className="iph-next-button"
              onClick={() =>
                navigate("/challenge/topology-failure")
              }
            >
              Challenge Berikutnya →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default IPHunter;