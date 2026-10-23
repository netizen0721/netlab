import { Link, useNavigate } from "react-router-dom";

import "../MateriVideo.css";

function KabelLAN() {
  const navigate = useNavigate();

  const cableTypes = [
    {
      icon: "🔌",
      title: "UTP",
      subtitle: "Unshielded Twisted Pair",
      description:
        "UTP cable is a network cable consisting of several pairs of twisted copper wires without additional shielding.",
      usage:
        "Commonly used for LAN networks in homes, schools, laboratories, and offices.",
      connector: "RJ45",
    },
    {
      icon: "🛡️",
      title: "FTP",
      subtitle: "Foiled Twisted Pair",
      description:
        "FTP cable has a foil layer as additional protection to help reduce electromagnetic interference.",
      usage:
        "Used in environments that require additional protection from signal interference.",
      connector: "RJ45",
    },
    {
      icon: "💡",
      title: "Fiber Optic",
      subtitle: "Optical Fiber",
      description:
        "Fiber optic uses glass or plastic fibers to transmit data in the form of light.",
      usage:
        "Used for high-speed connections and networks over long distances.",
      connector: "SC • LC",
    },
    {
      icon: "📺",
      title: "Coaxial",
      subtitle: "Coaxial Cable",
      description:
        "Coaxial cable has a copper conductor in the center surrounded by an insulating and shielding layer.",
      usage:
        "Used for cable television, communication systems, and certain network applications.",
      connector: "BNC",
    },
  ];

  const colors = [
    {
      color: "White-Orange",
      function: "Transmit +",
    },
    {
      color: "Orange",
      function: "Transmit −",
    },
    {
      color: "White-Green",
      function: "Receive +",
    },
    {
      color: "Blue",
      function: "Wire Pair",
    },
    {
      color: "White-Blue",
      function: "Wire Pair",
    },
    {
      color: "Green",
      function: "Receive −",
    },
    {
      color: "White-Brown",
      function: "Wire Pair",
    },
    {
      color: "Brown",
      function: "Wire Pair",
    },
  ];

  const handleOpenCableLab = () => {
    localStorage.setItem("netlabLastActivity", "Kabel Jaringan");
    navigate("/cable-lab");
  };

  return (
    <div className="materi-detail-page">
      <div className="materi-detail-header">
        <Link to="/materi" className="materi-back-button">
          ← All Materials
        </Link>

        <div className="materi-detail-label">
          MATERIAL 04
        </div>

        <h1>LAN Cable</h1>

        <p>
          Learn about LAN cables, types of network media, connectors,
          and cable arrangements used in computer networks.
        </p>
      </div>

      <section className="materi-video-section">
        <div className="materi-video-heading">
          <div className="materi-video-icon">🎬</div>

          <div>
            <span>LEARNING VIDEO</span>

            <h2>Network Cables</h2>

            <p>
              Watch the following video to strengthen your understanding
              of network cables and transmission media.
            </p>
          </div>
        </div>

        <div className="materi-video-container">
          <iframe
            src="https://www.youtube.com/embed/3_lP74Z_Oe8"
            title="Network Cable Learning Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="materi-intro-card">
        <div className="materi-intro-content">
          <span className="materi-intro-label">
            INTRODUCTION
          </span>

          <h2>What Is a LAN Cable?</h2>

          <p>
            A LAN cable is a cable used as a transmission medium to
            connect devices within a local network or Local Area
            Network (LAN).
          </p>

          <p>
            Using network cables, devices such as computers, laptops,
            switches, routers, and other devices can communicate and
            exchange data with each other.
          </p>

          <p>
            Network cables come in several types with different
            characteristics. The choice depends on network requirements,
            communication distance, speed, and environmental conditions.
          </p>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>01</span>

          <div>
            <h2>Functions of LAN Cables</h2>

            <p>
              LAN cables have several important functions in computer
              networks.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid">
          <article className="basic-learning-card">
            <div className="basic-card-icon">
              🔗
            </div>

            <h3>Connect Devices</h3>

            <p>
              Connect computers and network devices so they can
              communicate with each other.
            </p>
          </article>

          <article className="basic-learning-card">
            <div className="basic-card-icon">
              📡
            </div>

            <h3>Transmit Data</h3>

            <p>
              Serve as a medium for transmitting data from one device
              to another.
            </p>
          </article>

          <article className="basic-learning-card">
            <div className="basic-card-icon">
              ⚡
            </div>

            <h3>Stable Connection</h3>

            <p>
              Wired connections are generally more stable than wireless
              connections under certain conditions.
            </p>
          </article>

          <article className="basic-learning-card">
            <div className="basic-card-icon">
              🌐
            </div>

            <h3>Build a LAN</h3>

            <p>
              Used to build local networks in homes, schools,
              laboratories, and offices.
            </p>
          </article>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>02</span>

          <div>
            <h2>Types of Network Cables</h2>

            <p>
              Learn about several types of cables that can be used as
              network transmission media.
            </p>
          </div>
        </div>

        <div className="cable-type-grid">
          {cableTypes.map((cable) => (
            <article
              className="cable-type-card"
              key={cable.title}
            >
              <div className="cable-type-icon">
                {cable.icon}
              </div>

              <div className="cable-title-row">
                <h3>{cable.title}</h3>

                <span>{cable.connector}</span>
              </div>

              <div className="cable-subtitle">
                {cable.subtitle}
              </div>

              <p>{cable.description}</p>

              <div className="cable-example">
                <span>Usage</span>

                <strong>{cable.usage}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>03</span>

          <div>
            <h2>UTP Cable and RJ45 Connector</h2>

            <p>
              UTP is one of the most commonly used cables in LAN
              networks.
            </p>
          </div>
        </div>

        <div className="materi-intro-card cable-inner-card">
          <div className="materi-section-icon">
            🧵
          </div>

          <div>
            <h2>UTP Cable Structure</h2>

            <p>
              UTP cable consists of four pairs of copper wires, each
              consisting of a solid-colored wire and a white wire with
              a colored stripe.
            </p>

            <p>
              The eight wire cores are then arranged inside an RJ45
              connector according to a specific standard before being
              used for network connections.
            </p>
          </div>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>04</span>

          <div>
            <h2>Cable Types Based on Wire Arrangement</h2>

            <p>
              The color arrangement of UTP cables determines the type
              of connection that can be created.
            </p>
          </div>
        </div>

        <div className="cable-type-grid cable-connection-grid">
          <article className="cable-type-card">
            <div className="cable-type-icon">
              ➡️
            </div>

            <h3>Straight-Through</h3>

            <p>
              Both ends of the cable use the same color arrangement.
              This cable is commonly used to connect different types
              of devices.
            </p>

            <div className="cable-example">
              <span>Example</span>

              <strong>PC → Switch</strong>
            </div>
          </article>

          <article className="cable-type-card">
            <div className="cable-type-icon">
              🔄
            </div>

            <h3>Crossover</h3>

            <p>
              Both ends of the cable use different color arrangements.
              Conceptually, the transmit and receive pairs are
              swapped.
            </p>

            <div className="cable-example">
              <span>Example</span>

              <strong>PC → PC</strong>
            </div>
          </article>

          <article className="cable-type-card">
            <div className="cable-type-icon">
              🔧
            </div>

            <h3>Rollover</h3>

            <p>
              The pin arrangement on one end of the cable is reversed
              relative to the other end and is used for certain console
              connection needs.
            </p>

            <div className="cable-example">
              <span>Example</span>

              <strong>PC → Console</strong>
            </div>
          </article>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>05</span>

          <div>
            <h2>T568A and T568B Standards</h2>

            <p>
              Standards used to determine the color sequence of wires
              in an RJ45 connector.
            </p>
          </div>
        </div>

        <div className="standard-grid">
          <article className="standard-card">
            <div className="standard-header">
              <div>
                <span>STANDARD</span>

                <h3>T568A</h3>
              </div>

              <div className="standard-badge">
                A
              </div>
            </div>

            <div className="wire-list">
              <div>1. White-Green</div>
              <div>2. Green</div>
              <div>3. White-Orange</div>
              <div>4. Blue</div>
              <div>5. White-Blue</div>
              <div>6. Orange</div>
              <div>7. White-Brown</div>
              <div>8. Brown</div>
            </div>
          </article>

          <article className="standard-card">
            <div className="standard-header">
              <div>
                <span>STANDARD</span>

                <h3>T568B</h3>
              </div>

              <div className="standard-badge">
                B
              </div>
            </div>

            <div className="wire-list">
              <div>1. White-Orange</div>
              <div>2. Orange</div>
              <div>3. White-Green</div>
              <div>4. Blue</div>
              <div>5. White-Blue</div>
              <div>6. Green</div>
              <div>7. White-Brown</div>
              <div>8. Brown</div>
            </div>
          </article>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>06</span>

          <div>
            <h2>UTP Cable Color Sequence</h2>

            <p>
              Learn the eight pin positions on an RJ45 connector.
            </p>
          </div>
        </div>

        <div className="wire-table">
          <div className="wire-table-row wire-table-header">
            <div>Pin</div>
            <div>Color</div>
            <div>Function</div>
          </div>

          {colors.map((item, index) => (
            <div
              className="wire-table-row"
              key={item.color}
            >
              <div className="wire-pin">
                {index + 1}
              </div>

              <div className="wire-color-name">
                <span
                  className={`wire-dot wire-${index + 1}`}
                ></span>

                {item.color}
              </div>

              <div>{item.function}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cable-comparison-card">
        <div className="materi-section-heading">
          <span>07</span>

          <div>
            <h2>Comparison of Cable Types</h2>

            <p>
              Each cable type has different characteristics and uses.
            </p>
          </div>
        </div>

        <div className="cable-comparison-table">
          <div className="cable-comparison-row cable-comparison-header">
            <div>Type</div>
            <div>Medium</div>
            <div>Characteristics</div>
            <div>Usage</div>
          </div>

          <div className="cable-comparison-row">
            <div>UTP</div>
            <div>Copper</div>
            <div>Practical and common</div>
            <div>Home, school, and office LAN</div>
          </div>

          <div className="cable-comparison-row">
            <div>FTP</div>
            <div>Copper + foil</div>
            <div>Additional protection</div>
            <div>
              Environments with electromagnetic interference
            </div>
          </div>

          <div className="cable-comparison-row">
            <div>Fiber Optic</div>
            <div>Optical fiber</div>
            <div>High speed and long distance</div>
            <div>
              Backbone and high-speed connections
            </div>
          </div>

          <div className="cable-comparison-row">
            <div>Coaxial</div>
            <div>Copper</div>
            <div>Multi-layer shielding</div>
            <div>
              Cable television and certain communication systems
            </div>
          </div>
        </div>
      </section>

      <section className="cable-lab-preview">
        <div className="cable-preview-icon">
          🧪
        </div>

        <div>
          <span className="cable-preview-label">
            PRACTICAL LAB
          </span>

          <h2>Ready to Build a Cable?</h2>

          <p>
            After learning about LAN cables and UTP color arrangements,
            you can try assembling a LAN cable through the interactive
            simulation in Cable Lab.
          </p>

          <Link
            to="/cable-lab"
            className="cable-lab-button"
          >
            Start Cable Lab →
          </Link>
        </div>
      </section>

      <section className="materi-tip-card">
        <div className="materi-tip-icon">
          💡
        </div>

        <div>
          <h2>Key Takeaway</h2>

          <p>
            <strong>LAN cables</strong> are used as transmission media
            to connect devices within a local network. The cable types
            studied include <strong>UTP</strong>, <strong>FTP</strong>,
            <strong> Fiber Optic</strong>, and <strong> Coaxial</strong>.
            For UTP cables with RJ45 connectors, the color arrangement
            can follow the <strong> T568A</strong> or
            <strong> T568B</strong> standard.
          </p>
        </div>
      </section>

      <div className="materi-navigation cable-navigation">
        <div className="cable-download-wrapper">
          <a
            href="/materi/kabel-LAN.pdf"
            download="kabel-LAN.pdf"
            className="materi-nav-button download-button"
          >
            📥 Download Material
          </a>
        </div>

        <div className="cable-navigation-row">
          <Link
            to="/materi/topologi-jaringan"
            className="materi-nav-button"
          >
            ← Previous Material
          </Link>

          <button
            type="button"
            className="materi-nav-button primary"
            onClick={handleOpenCableLab}
          >
            🔌 Enter Cable Lab →
          </button>
        </div>
      </div>
    </div>
  );
}

export default KabelLAN;