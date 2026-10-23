import { Link, useNavigate } from "react-router-dom";

import "../MateriVideo.css";

function PerangkatJaringan() {
  const navigate = useNavigate();

  const devices = [
    {
      icon: "🔀",
      title: "Switch",
      description:
        "A switch connects multiple devices within a local network (LAN). It forwards data to the destination device based on its MAC address.",
      function:
        "Connects computers, printers, servers, and other network devices within a single LAN.",
      example:
        "Used in computer laboratories, offices, schools, and home networks.",
    },

    {
      icon: "📡",
      title: "Router",
      description:
        "A router connects two or more different networks and determines the path used by data packets to reach their destination.",
      function:
        "Connects a local network to another network or the internet.",
      example:
        "A home router connects the home Wi-Fi network to the internet.",
    },

    {
      icon: "🖥️",
      title: "Server",
      description:
        "A server is a computer that provides services, data, or resources that can be accessed by other computers on the network.",
      function:
        "Provides services such as file storage, websites, databases, and applications.",
      example:
        "A web server stores and provides website pages to clients.",
    },

    {
      icon: "📶",
      title: "Access Point",
      description:
        "An access point provides a wireless network connection, allowing devices such as laptops and smartphones to connect without cables.",
      function:
        "Connects wireless devices to a wired network.",
      example:
        "Used to provide Wi-Fi networks in schools, homes, or offices.",
    },

    {
      icon: "🌐",
      title: "Modem",
      description:
        "A modem is a device used to connect a network or device to an internet service provided by a network provider.",
      function:
        "Converts and forwards signals so devices can communicate with the internet service provider's network.",
      example:
        "A fiber modem connects a home network to an internet service.",
    },

    {
      icon: "💻",
      title: "Network Interface Card",
      description:
        "A Network Interface Card (NIC) is a component that allows a computer to connect to a network through a cable or wireless connection.",
      function:
        "Acts as an interface between a computer and a network.",
      example:
        "An Ethernet port on a computer is one example of a network interface.",
    },
  ];

  const handleOpen3DLab = () => {
    localStorage.setItem(
      "netlabLastActivity",
      "Perangkat Jaringan"
    );

    navigate("/ar-hardware");
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
          MATERIAL 02
        </div>

        <h1>
          Network Devices
        </h1>

        <p>
          Get to know the devices used to build,
          connect, and manage a computer network.
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
              Network Devices
            </h2>

            <p>
              Watch the following video to learn about
              various hardware devices used in computer networks.
            </p>
          </div>
        </div>

        <div className="materi-video-container">
          <iframe
            src="https://www.youtube.com/embed/N2CNS1N9gZo"
            title="Network Devices Learning Video"
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
            What Are Network Devices?
          </h2>

          <p>
            Network devices are hardware devices used
            to connect computers and other devices so
            they can communicate and exchange data.
          </p>

          <p>
            Each device has a different function.
            Some devices connect computers within
            the same network, connect different networks,
            provide wireless access, or provide services
            to users.
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
              Types of Network Devices
            </h2>

            <p>
              Learn the functions of common devices
              used in computer networks.
            </p>
          </div>
        </div>

        <div className="device-learning-grid">
          {devices.map((device, index) => (
            <article
              className="device-learning-card"
              key={device.title}
            >
              <div className="device-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="device-icon">
                {device.icon}
              </div>

              <h3>
                {device.title}
              </h3>

              <p className="device-description">
                {device.description}
              </p>

              <div className="device-info">
                <div>
                  <strong>
                    Function
                  </strong>

                  <p>
                    {device.function}
                  </p>
                </div>

                <div>
                  <strong>
                    Example Usage
                  </strong>

                  <p>
                    {device.example}
                  </p>
                </div>
              </div>
            </article>
          ))}
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
            Know the Function of Each Device
          </h2>

          <p>
            <strong>Switch</strong> connects devices
            within a LAN, while <strong>Router</strong>
            connects different networks.
            <strong> Access Point</strong> provides
            wireless connectivity, while
            <strong> Server</strong> provides services
            or resources to other devices.
          </p>
        </div>
      </section>

      {/* NAVIGATION */}
      <div className="materi-navigation">

        <a
          href="/materi/perangkat-jaringan.pdf"
          download="Network-Devices.pdf"
          className="materi-download-button"
        >
          📥 Download Material
        </a>

        <div className="materi-navigation-row">
          <Link
            to="/materi/dasar-jaringan"
            className="materi-nav-button materi-nav-prev"
          >
            ← Previous Material
          </Link>

          <button
            type="button"
            className="materi-nav-button materi-nav-next"
            onClick={handleOpen3DLab}
          >
            🖥️ Open 3D Lab →
          </button>
        </div>

      </div>

    </div>
  );
}

export default PerangkatJaringan;