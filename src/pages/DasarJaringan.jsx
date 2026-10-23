import { Link, useNavigate } from "react-router-dom";

import "../MateriVideo.css";

function DasarJaringan() {
  const navigate = useNavigate();

  const handleNextMaterial = () => {
    const activityName = "Dasar Jaringan";

    const saved = localStorage.getItem(
      "netlabCompletedActivities"
    );

    let completedActivities = [];

    try {
      const parsed = saved ? JSON.parse(saved) : [];

      if (Array.isArray(parsed)) {
        completedActivities = parsed;
      } else if (typeof parsed === "number") {
        completedActivities = Array(parsed).fill(
          "Aktivitas"
        );
      }
    } catch {
      completedActivities = [];
    }

    if (!completedActivities.includes(activityName)) {
      completedActivities.push(activityName);
    }

    localStorage.setItem(
      "netlabCompletedActivities",
      JSON.stringify(completedActivities)
    );

    localStorage.setItem(
      "netlabLastActivity",
      activityName
    );

    navigate("/materi/perangkat-jaringan");
  };

  return (
    <div className="materi-detail-page">

      {/* HEADER */}
      <div className="materi-detail-header">
        <Link
          to="/materi"
          className="materi-back-button"
        >
          ← All Materials
        </Link>

        <div className="materi-detail-label">
          MATERIAL 01
        </div>

        <h1>Network Fundamentals</h1>

        <p>
          Learn the basic concepts of computer networks,
          network types, network components, and how
          networks work.
        </p>
      </div>

      {/* LEARNING VIDEO */}
      <section className="materi-video-section">
        <div className="materi-video-heading">
          <div className="materi-video-icon">
            🎬
          </div>

          <div>
            <span>
              LEARNING VIDEO
            </span>

            <h2>
              Network Fundamentals
            </h2>

            <p>
              Watch the following video to strengthen
              your understanding of computer network
              fundamentals.
            </p>
          </div>
        </div>

        <div className="materi-video-container">
          <iframe
            src="https://www.youtube.com/embed/WPhjxoVDygk"
            title="Network Fundamentals Learning Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="materi-intro-card">
        <div className="materi-intro-content">
          <span className="materi-intro-label">
            INTRODUCTION
          </span>

          <h2>
            What Is a Computer Network?
          </h2>

          <p>
            A computer network is a group of devices
            connected to communicate and share data
            and resources. Networks allow computers,
            laptops, printers, servers, and other
            devices to exchange information with each
            other.
          </p>

          <p>
            In everyday life, computer networks are
            used to access the internet, share files,
            use shared printers, and connect various
            devices in environments such as schools,
            offices, and homes.
          </p>
        </div>
      </section>

      {/* MATERIAL 01 */}
      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>
            01
          </span>

          <div>
            <h2>
              Purpose and Benefits of Networks
            </h2>

            <p>
              Computer networks are created to make
              communication and shared resource usage
              easier.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid">

          <div className="basic-learning-card">
            <h3>
              Data Sharing
            </h3>

            <p>
              Networks allow users to send, receive,
              and share files with other devices.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              Resource Sharing
            </h3>

            <p>
              Devices such as printers and storage
              can be used by multiple computers
              through a network.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              Communication
            </h3>

            <p>
              Networks help devices communicate with
              each other and exchange information
              quickly.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              Internet Access
            </h3>

            <p>
              Networks allow various devices to
              connect to and access the internet.
            </p>
          </div>

        </div>
      </section>

      {/* MATERIAL 02 */}
      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>
            02
          </span>

          <div>
            <h2>
              Network Types by Coverage Area
            </h2>

            <p>
              Networks can be classified based on
              the area they cover.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid">

          <div className="basic-learning-card">
            <h3>
              PAN
            </h3>

            <p>
              Personal Area Network is a network
              with a very small coverage area,
              usually used to connect personal devices.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              LAN
            </h3>

            <p>
              Local Area Network is used in limited
              areas such as homes, laboratories,
              schools, or offices.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              MAN
            </h3>

            <p>
              Metropolitan Area Network has a wider
              coverage area and can cover an entire city.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              WAN
            </h3>

            <p>
              Wide Area Network covers a very large
              area and can connect networks across
              cities and even countries.
            </p>
          </div>

        </div>
      </section>

      {/* MATERIAL 03 */}
      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>
            03
          </span>

          <div>
            <h2>
              Basic Network Components
            </h2>

            <p>
              A network requires several devices
              to function properly.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid">

          <div className="basic-learning-card">
            <h3>
              Computer
            </h3>

            <p>
              Computers or end devices are used
              to send and receive data through
              a network.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              Switch
            </h3>

            <p>
              A switch is used to connect multiple
              devices within a local network.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              Router
            </h3>

            <p>
              A router is used to connect different
              networks and determine the path for
              data transmission.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              Transmission Media
            </h3>

            <p>
              Transmission media such as UTP cables
              and fiber optic cables are used as paths
              for transmitting data.
            </p>
          </div>

        </div>
      </section>

      {/* MATERIAL 04 */}
      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>
            04
          </span>

          <div>
            <h2>
              How Does a Network Work?
            </h2>

            <p>
              Data in a network is sent from one
              device to another through a communication path.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid">

          <div className="basic-learning-card">
            <h3>
              1. Data Is Created
            </h3>

            <p>
              Users create or send data through
              devices such as computers or laptops.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              2. Data Is Sent
            </h3>

            <p>
              Data is sent through network media
              such as cables or wireless connections.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              3. Data Is Routed
            </h3>

            <p>
              Network devices such as switches and
              routers help determine where the data
              should be sent.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              4. Data Is Received
            </h3>

            <p>
              The destination device receives and
              processes the data so that the information
              can be used by the user.
            </p>
          </div>

        </div>
      </section>

      {/* KEY TAKEAWAY */}
      <section className="materi-tip-card">
        <div className="materi-tip-icon">
          💡
        </div>

        <div>
          <span>
            KEY TAKEAWAY
          </span>

          <h2>
            Networks Connect Devices
          </h2>

          <p>
            Computer networks allow various devices
            to connect, communicate, exchange data,
            and share resources. Understanding these
            basic concepts will help you learn more
            advanced networking topics.
          </p>
        </div>
      </section>

      {/* NAVIGATION */}
      <div className="materi-navigation">

        <a
          href="/materi/dasar-jaringan.pdf"
          download="Network-Fundamentals.pdf"
          className="materi-download-button"
        >
          📥 Download Material
        </a>

        <button
          className="materi-nav-button materi-nav-next"
          onClick={handleNextMaterial}
        >
          Next Material →
        </button>

      </div>

    </div>
  );
}

export default DasarJaringan;