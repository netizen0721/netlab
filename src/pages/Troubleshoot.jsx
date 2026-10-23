import { Link } from "react-router-dom";

import "./Troubleshoot.css";

import "../MateriVideo.css";

function Troubleshoot() {
  return (
    <div className="materi-detail-page">
      <div className="materi-detail-header">
        <Link to="/materi" className="materi-back-button">
          ← All Materials
        </Link>

        <div className="materi-detail-label">
          MATERIAL 05
        </div>

        <h1>
          Network Troubleshooting
        </h1>

        <p>
          Learn how to find, analyze, and fix various problems that
          occur in computer networks.
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
              Network Troubleshooting
            </h2>

            <p>
              Watch the following video to strengthen your understanding
              of how to troubleshoot computer networks.
            </p>
          </div>
        </div>

        <div className="materi-video-container">
          <iframe
            src="https://www.youtube.com/embed/2LhpLp1ZTuA"
            title="Network Troubleshooting Learning Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="materi-intro-card">
        <div className="materi-section-icon">
          🛠️
        </div>

        <div>
          <h2>
            What Is Troubleshooting?
          </h2>

          <p>
            Troubleshooting is the process of finding, identifying,
            analyzing, and fixing problems that occur in a system.
            In computer networks, troubleshooting is used when devices
            or network connections do not work as expected.
          </p>

          <p>
            A network technician needs to perform checks systematically
            to determine the cause of a problem before carrying out
            repairs.
          </p>

          <p>
            <strong>💡 Main principle:</strong> Do not immediately
            replace a device. First, find out the source of the problem
            through inspection and testing.
          </p>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>
            01
          </span>

          <div>
            <h2>
              Troubleshooting Method
            </h2>

            <p>
              Network troubleshooting should be performed systematically
              so that problems can be identified more easily.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid troubleshooting-step-grid">
          <div className="basic-learning-card">
            <div className="card-number">
              01
            </div>

            <h3>
              Identify
            </h3>

            <p>
              Identify the problem experienced by the user or device.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-number">
              02
            </div>

            <h3>
              Inspect
            </h3>

            <p>
              Check the condition of devices, cables, ports, and
              configurations.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-number">
              03
            </div>

            <h3>
              Test
            </h3>

            <p>
              Perform tests to determine which part of the network
              is experiencing a problem.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-number">
              04
            </div>

            <h3>
              Diagnose
            </h3>

            <p>
              Analyze the inspection results to find the cause of
              the problem.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-number">
              05
            </div>

            <h3>
              Repair
            </h3>

            <p>
              Perform repairs according to the cause of the problem.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-number">
              06
            </div>

            <h3>
              Verify
            </h3>

            <p>
              Make sure the network is functioning properly after
              the repair.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-number">
              07
            </div>

            <h3>
              Document
            </h3>

            <p>
              Record the problem, cause, and solution that were
              implemented.
            </p>
          </div>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>
            02
          </span>

          <div>
            <h2>
              Physical Issues
            </h2>

            <p>
              Before checking the configuration, first inspect the
              physical condition of the network devices.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid">
          <div className="basic-learning-card">
            <div className="card-icon">
              🔌
            </div>

            <h3>
              Cable
            </h3>

            <p>
              Make sure the cable is properly connected and not damaged.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-icon">
              🔗
            </div>

            <h3>
              Port
            </h3>

            <p>
              Check whether the ports on the switch, router, or computer
              are functioning and active.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-icon">
              💻
            </div>

            <h3>
              NIC
            </h3>

            <p>
              Make sure the Network Interface Card is installed and active.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-icon">
              📶
            </div>

            <h3>
              Wi-Fi
            </h3>

            <p>
              Check the access point power, uplink connection, and
              wireless network.
            </p>
          </div>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>
            03
          </span>

          <div>
            <h2>
              IP Configuration
            </h2>

            <p>
              Incorrect IP configuration can prevent a computer from
              communicating with other devices on the network.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid">
          <div className="basic-learning-card">
            <h3>
              IP Address
            </h3>

            <p>
              A unique address used to identify a device on a network.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              Subnet Mask
            </h3>

            <p>
              Used to determine the network and host portions of an
              IP address.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              Gateway
            </h3>

            <p>
              A device or address that serves as an exit path to
              another network.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              DHCP
            </h3>

            <p>
              A service that automatically provides network
              configuration such as an IP Address to clients.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              DNS
            </h3>

            <p>
              A system that translates domain names into IP addresses
              so devices can find network destinations.
            </p>
          </div>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>
            04
          </span>

          <div>
            <h2>
              Diagnostic Commands
            </h2>

            <p>
              Several commands can be used to help technicians
              determine the condition and communication path of a network.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid">
          <div className="basic-learning-card command-card">
            <code>
              ipconfig
            </code>

            <p>
              Displays IP configuration information on the computer.
            </p>
          </div>

          <div className="basic-learning-card command-card">
            <code>
              ping
            </code>

            <p>
              Tests whether a device can communicate with a specific
              destination.
            </p>
          </div>

          <div className="basic-learning-card command-card">
            <code>
              arp
            </code>

            <p>
              Displays IP and MAC Address mapping information.
            </p>
          </div>

          <div className="basic-learning-card command-card">
            <code>
              tracert
            </code>

            <p>
              Displays the path taken by packets to a destination.
            </p>
          </div>
        </div>

        <div className="terminal-example">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <span className="terminal-title">
              Network Diagnostic
            </span>
          </div>

          <div className="terminal-body">
            <p>
              <span className="terminal-prompt">
                &gt;
              </span>{" "}
              ipconfig
            </p>

            <p>
              <span className="terminal-prompt">
                &gt;
              </span>{" "}
              ping 192.168.10.1
            </p>

            <p>
              <span className="terminal-success">
                Reply received
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>
            05
          </span>

          <div>
            <h2>
              Wi-Fi Troubleshooting
            </h2>

            <p>
              Problems with wireless networks can originate from the
              access point, uplink connection, configuration, or
              client device connection.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid">
          <div className="basic-learning-card">
            <div className="card-number">
              01
            </div>

            <h3>
              AP Power
            </h3>

            <p>
              Make sure the access point has power and is turned on.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-number">
              02
            </div>

            <h3>
              SSID
            </h3>

            <p>
              Make sure the SSID being used is correct and can be found.
            </p>
          </div>

          <div className="basic-learning-card">
            <div className="card-number">
              03
            </div>

            <h3>
              Uplink
            </h3>

            <p>
              Check the access point connection to the main network device.
            </p>
          </div>
        </div>
      </section>

      <section className="materi-content-section">
        <div className="materi-section-heading">
          <span>
            06
          </span>

          <div>
            <h2>
              Network Services & Security
            </h2>

            <p>
              Network services and security can also cause communication
              problems.
            </p>
          </div>
        </div>

        <div className="basic-learning-grid">
          <div className="basic-learning-card">
            <h3>
              DHCP
            </h3>

            <p>
              Ensures that clients automatically receive IP configuration.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              DNS
            </h3>

            <p>
              Ensures that domain names can be translated into IP addresses.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              Firewall
            </h3>

            <p>
              Check whether the firewall is blocking certain connections
              or services.
            </p>
          </div>

          <div className="basic-learning-card">
            <h3>
              VLAN
            </h3>

            <p>
              Make sure devices are on the appropriate VLAN so they can
              communicate.
            </p>
          </div>
        </div>
      </section>

      <section className="materi-tip-card">
        <div className="materi-tip-icon">
          🛠️
        </div>

        <div>
          <span>
            KEY TAKEAWAY
          </span>

          <h2>
            Identify, diagnose, repair, then test again
          </h2>

          <p>
            After learning the basics of network troubleshooting, you can
            test your skills directly through the network problem
            simulation in Troubleshoot Lab.
          </p>
        </div>
      </section>

      <div className="troubleshoot-navigation">
        <div className="troubleshoot-download-wrapper">
          <a
            href="/materi/troubleshooting-jaringan.pdf"
            download="Troubleshooting-Jaringan.pdf"
            className="materi-download-button"
          >
            📥 Download Material
          </a>
        </div>

        <div className="troubleshoot-navigation-row">
          <Link
            to="/materi/kabel-lan"
            className="materi-nav-button secondary"
          >
            ← Previous Material
          </Link>

          <Link
            to="/troubleshoot-lab"
            className="materi-nav-button primary"
          >
            🛠️ Enter Troubleshoot Lab →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Troubleshoot;