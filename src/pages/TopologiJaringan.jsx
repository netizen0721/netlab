import { Link } from "react-router-dom";

import "./TopologiJaringan.css";

function TopologiJaringan() {
  return (
    <div className="topologi-page">
      {/* TOP NAVIGATION */}
      <div className="topologi-top-navigation">
        <Link
          to="/materi"
          className="topologi-back-button"
        >
          ← All Materials
        </Link>
        <span className="topologi-material-number">
          MATERIAL 03
        </span>
      </div>

      {/* HEADER */}
      <div className="topologi-header">
        <h1>Network Topology</h1>
        <span>
          Learn about various forms and patterns of connections
          between devices in a computer network.
        </span>
      </div>

      {/* VIDEO */}
      <section className="topologi-video-section">
        <div className="topologi-video-heading">
          <div className="topologi-video-icon">
            ▶
          </div>
          <div>
            <span>LEARNING VIDEO</span>
            <h2>
              TYPES OF NETWORKS AND COMPUTER NETWORK TOPOLOGIES
            </h2>
            <p>
              Watch the following video to understand the basic concepts
              of computer network topology.
            </p>
          </div>
        </div>

        <div className="topologi-video-container">
          <iframe
            src="https://www.youtube.com/embed/_ucbrmxMHDM"
            title="TYPES OF NETWORKS AND COMPUTER NETWORK TOPOLOGIES"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* INTRO */}
      <section className="topologi-intro-card">
        <span className="topologi-intro-label">
          INTRODUCTION
        </span>
        <h2>
          What Is Network Topology?
        </h2>
        <p>
          Network topology is the pattern or structure of connections
          between devices within a computer network.
        </p>
        <p>
          Topology determines how computers, switches, routers,
          servers, and other devices are connected and communicate
          with each other.
        </p>
      </section>

      {/* MATERI */}
      <section className="topologi-content">
        {/* =========================
            TOPOLOGI STAR
        ========================= */}
        <div className="topologi-section-card">
          <div className="topologi-section-number">
            01
          </div>
          <div className="topologi-section-content">
            <h2>Star Topology</h2>
            <p>
              Star topology is a topology in which every device
              is connected to a central device, usually a
              switch or hub.
            </p>

            {/* VISUAL STAR */}
            <div className="topologi-diagram">
              <div className="diagram-title">
                Star Topology Example
              </div>
              <svg
                className="topologi-svg"
                viewBox="0 0 700 320"
                preserveAspectRatio="xMidYMid meet"
              >
                <line
                  x1="350"
                  y1="145"
                  x2="350"
                  y2="65"
                  className="network-line"
                />
                <line
                  x1="310"
                  y1="160"
                  x2="145"
                  y2="110"
                  className="network-line"
                />
                <line
                  x1="390"
                  y1="160"
                  x2="555"
                  y2="110"
                  className="network-line"
                />
                <line
                  x1="350"
                  y1="195"
                  x2="350"
                  y2="275"
                  className="network-line"
                />
                <rect
                  x="302"
                  y="145"
                  width="96"
                  height="50"
                  rx="12"
                  className="network-switch"
                />
                <text
                  x="350"
                  y="176"
                  textAnchor="middle"
                  className="network-text"
                >
                  SWITCH
                </text>
                <rect
                  x="305"
                  y="35"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="350"
                  y="63"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="100"
                  y="88"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="145"
                  y="116"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="510"
                  y="88"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="555"
                  y="116"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="305"
                  y="275"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="350"
                  y="303"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
              </svg>
            </div>

            <div className="topologi-info-grid">
              <div>
                <h3>Characteristics</h3>
                <ul>
                  <li>
                    Has one central device.
                  </li>
                  <li>
                    Each device is connected to the central device.
                  </li>
                  <li>
                    Easy to manage the network.
                  </li>
                </ul>
              </div>
              <div>
                <h3>Advantages</h3>
                <ul>
                  <li>
                    Easy to detect faults.
                  </li>
                  <li>
                    Devices can be added relatively easily.
                  </li>
                  <li>
                    If one cable fails, other devices can still
                    remain connected.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            TOPOLOGI BUS
        ========================= */}
        <div className="topologi-section-card">
          <div className="topologi-section-number">
            02
          </div>
          <div className="topologi-section-content">
            <h2>Bus Topology</h2>
            <p>
              Bus topology uses a single main cable as a communication
              path shared by multiple devices.
            </p>

            {/* VISUAL BUS */}
            <div className="topologi-diagram">
              <div className="diagram-title">
                Bus Topology Example
              </div>
              <svg
                className="topologi-svg"
                viewBox="0 0 700 320"
                preserveAspectRatio="xMidYMid meet"
              >
                <line
                  x1="100"
                  y1="180"
                  x2="600"
                  y2="180"
                  className="network-main-line"
                />
                <line
                  x1="150"
                  y1="180"
                  x2="150"
                  y2="125"
                  className="network-line"
                />
                <line
                  x1="285"
                  y1="180"
                  x2="285"
                  y2="125"
                  className="network-line"
                />
                <line
                  x1="420"
                  y1="180"
                  x2="420"
                  y2="125"
                  className="network-line"
                />
                <line
                  x1="555"
                  y1="180"
                  x2="555"
                  y2="125"
                  className="network-line"
                />
                <rect
                  x="105"
                  y="80"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="150"
                  y="108"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="240"
                  y="80"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="285"
                  y="108"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="375"
                  y="80"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="420"
                  y="108"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="510"
                  y="80"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="555"
                  y="108"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <text
                  x="350"
                  y="220"
                  textAnchor="middle"
                  className="network-label"
                >
                  MAIN CABLE
                </text>
                <circle
                  cx="100"
                  cy="180"
                  r="6"
                  className="network-end"
                />
                <circle
                  cx="600"
                  cy="180"
                  r="6"
                  className="network-end"
                />
              </svg>
            </div>

            <div className="topologi-info-grid">
              <div>
                <h3>Characteristics</h3>
                <ul>
                  <li>
                    Uses a single main cable.
                  </li>
                  <li>
                    Devices are connected to the main cable.
                  </li>
                  <li>
                    The network structure is relatively simple.
                  </li>
                </ul>
              </div>
              <div>
                <h3>Disadvantages</h3>
                <ul>
                  <li>
                    Damage to the main cable can disrupt the network.
                  </li>
                  <li>
                    It is difficult to locate faults.
                  </li>
                  <li>
                    Less suitable for large networks.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            TOPOLOGI RING
        ========================= */}
        <div className="topologi-section-card">
          <div className="topologi-section-number">
            03
          </div>
          <div className="topologi-section-content">
            <h2>Ring Topology</h2>
            <p>
              Ring topology connects each device to form a circle
              or ring.
            </p>

            {/* VISUAL RING */}
            <div className="topologi-diagram">
              <div className="diagram-title">
                Ring Topology Example
              </div>
              <svg
                className="topologi-svg"
                viewBox="0 0 700 320"
                preserveAspectRatio="xMidYMid meet"
              >
                <circle
                  cx="350"
                  cy="170"
                  r="105"
                  className="network-ring"
                />
                <rect
                  x="305"
                  y="35"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="350"
                  y="63"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="510"
                  y="148"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="555"
                  y="176"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="305"
                  y="260"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="350"
                  y="288"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="100"
                  y="148"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="145"
                  y="176"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
              </svg>
            </div>

            <div className="topologi-info-grid">
              <div>
                <h3>Characteristics</h3>
                <ul>
                  <li>
                    Each device is connected to the next device.
                  </li>
                  <li>
                    Forms a circular path.
                  </li>
                  <li>
                    Data can travel along the network path.
                  </li>
                </ul>
              </div>
              <div>
                <h3>Disadvantages</h3>
                <ul>
                  <li>
                    Damage to one part can affect the network.
                  </li>
                  <li>
                    Adding devices can be more difficult.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            TOPOLOGI MESH
        ========================= */}
        <div className="topologi-section-card">
          <div className="topologi-section-number">
            04
          </div>
          <div className="topologi-section-content">
            <h2>Mesh Topology</h2>
            <p>
              Mesh topology connects devices through multiple
              connection paths, providing several communication paths.
            </p>

            {/* VISUAL MESH */}
            <div className="topologi-diagram">
              <div className="diagram-title">
                Mesh Topology Example
              </div>
              <svg
                className="topologi-svg"
                viewBox="0 0 700 320"
                preserveAspectRatio="xMidYMid meet"
              >
                <line
                  x1="145"
                  y1="95"
                  x2="555"
                  y2="95"
                  className="network-line"
                />
                <line
                  x1="145"
                  y1="95"
                  x2="145"
                  y2="225"
                  className="network-line"
                />
                <line
                  x1="555"
                  y1="95"
                  x2="555"
                  y2="225"
                  className="network-line"
                />
                <line
                  x1="145"
                  y1="225"
                  x2="555"
                  y2="225"
                  className="network-line"
                />
                <line
                  x1="145"
                  y1="95"
                  x2="555"
                  y2="225"
                  className="network-line"
                />
                <line
                  x1="555"
                  y1="95"
                  x2="145"
                  y2="225"
                  className="network-line"
                />
                <rect
                  x="100"
                  y="73"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="145"
                  y="101"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="510"
                  y="73"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="555"
                  y="101"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="100"
                  y="203"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="145"
                  y="231"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="510"
                  y="203"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="555"
                  y="231"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
              </svg>
            </div>

            <div className="topologi-info-grid">
              <div>
                <h3>Characteristics</h3>
                <ul>
                  <li>
                    Has multiple connection paths.
                  </li>
                  <li>
                    Provides alternative paths.
                  </li>
                  <li>
                    Has a high level of redundancy.
                  </li>
                </ul>
              </div>
              <div>
                <h3>Disadvantages</h3>
                <ul>
                  <li>
                    Requires many cables.
                  </li>
                  <li>
                    Installation is more complex.
                  </li>
                  <li>
                    Implementation costs are relatively higher.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            TOPOLOGI TREE
        ========================= */}
        <div className="topologi-section-card">
          <div className="topologi-section-number">
            05
          </div>
          <div className="topologi-section-content">
            <h2>Tree Topology</h2>
            <p>
              Tree topology is a combination of several topologies
              arranged hierarchically to resemble a tree structure.
            </p>

            {/* VISUAL TREE */}
            <div className="topologi-diagram">
              <div className="diagram-title">
                Tree Topology Example
              </div>
              <svg
                className="topologi-svg"
                viewBox="0 0 700 350"
                preserveAspectRatio="xMidYMid meet"
              >
                <line
                  x1="350"
                  y1="70"
                  x2="350"
                  y2="125"
                  className="network-line"
                />
                <line
                  x1="350"
                  y1="125"
                  x2="205"
                  y2="180"
                  className="network-line"
                />
                <line
                  x1="350"
                  y1="125"
                  x2="495"
                  y2="180"
                  className="network-line"
                />
                <line
                  x1="205"
                  y1="215"
                  x2="145"
                  y2="275"
                  className="network-line"
                />
                <line
                  x1="205"
                  y1="215"
                  x2="265"
                  y2="275"
                  className="network-line"
                />
                <line
                  x1="495"
                  y1="215"
                  x2="435"
                  y2="275"
                  className="network-line"
                />
                <line
                  x1="495"
                  y1="215"
                  x2="555"
                  y2="275"
                  className="network-line"
                />
                <rect
                  x="302"
                  y="25"
                  width="96"
                  height="45"
                  rx="10"
                  className="network-switch"
                />
                <text
                  x="350"
                  y="53"
                  textAnchor="middle"
                  className="network-text"
                >
                  SWITCH
                </text>
                <rect
                  x="160"
                  y="180"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-switch"
                />
                <text
                  x="205"
                  y="208"
                  textAnchor="middle"
                  className="network-text"
                >
                  SWITCH
                </text>
                <rect
                  x="450"
                  y="180"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-switch"
                />
                <text
                  x="495"
                  y="208"
                  textAnchor="middle"
                  className="network-text"
                >
                  SWITCH
                </text>
                <rect
                  x="100"
                  y="275"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="145"
                  y="303"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="220"
                  y="275"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="265"
                  y="303"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="390"
                  y="275"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="435"
                  y="303"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
                <rect
                  x="510"
                  y="275"
                  width="90"
                  height="45"
                  rx="10"
                  className="network-pc"
                />
                <text
                  x="555"
                  y="303"
                  textAnchor="middle"
                  className="network-text"
                >
                  PC
                </text>
              </svg>
            </div>

            <div className="topologi-info-grid">
              <div>
                <h3>Characteristics</h3>
                <ul>
                  <li>
                    Has a hierarchical structure.
                  </li>
                  <li>
                    Suitable for networks with many groups of devices.
                  </li>
                  <li>
                    Can be expanded into a larger network.
                  </li>
                </ul>
              </div>
              <div>
                <h3>Advantages</h3>
                <ul>
                  <li>
                    The network structure is more organized.
                  </li>
                  <li>
                    Easy to expand.
                  </li>
                  <li>
                    Network management can be performed based on groups.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIP */}
      <section className="topologi-tip-card">
        <div className="topologi-tip-icon">
          💡
        </div>
        <div>
          <span>
            KEY TAKEAWAY
          </span>
          <h2>
            Choose a topology based on your network needs.
          </h2>
          <p>
            Each topology has different characteristics, advantages,
            and disadvantages. The choice of topology should be
            adjusted to the number of devices, network requirements,
            cost, and environmental conditions.
          </p>
        </div>
      </section>

      {/* BOTTOM NAVIGATION */}
      <div className="materi-navigation">
        <a
          href="/materi/topologi-jaringan.pdf"
          download="Topologi-Jaringan.pdf"
          className="materi-download-button"
        >
          📥 Download Material
        </a>

        <Link
          to="/materi/perangkat-jaringan"
          className="materi-nav-button materi-nav-prev secondary"
        >
          ← Previous Material
        </Link>

        <Link
          to="/network-lab"
          className="materi-nav-button materi-nav-next primary"
        >
          🔗 Enter Network Lab →
        </Link>
      </div>
    </div>
  );
}

export default TopologiJaringan;