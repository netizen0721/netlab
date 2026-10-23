import { useState } from "react";

import { Link } from "react-router-dom";

import { updateActivityProgress } from "../utils/progress";

import "./Materi.css";

function Materi() {
  const userId = localStorage.getItem("netlabUserId");

  const [completedMaterials, setCompletedMaterials] = useState(() => {
    if (!userId) {
      return [];
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem("netlabCompletedMaterials") || "{}"
      );

      if (
        saved &&
        typeof saved === "object" &&
        !Array.isArray(saved)
      ) {
        return saved[String(userId)] || [];
      }

      return [];
    } catch {
      return [];
    }
  });

  const handleMaterialClick = (
    activityId,
    activityName
  ) => {
    if (!userId) {
      return;
    }

    updateActivityProgress(
      Number(userId),
      activityId,
      100
    );

    let allCompletedMaterials = {};

    try {
      allCompletedMaterials = JSON.parse(
        localStorage.getItem(
          "netlabCompletedMaterials"
        ) || "{}"
      );
    } catch {
      allCompletedMaterials = {};
    }

    if (
      !allCompletedMaterials ||
      typeof allCompletedMaterials !== "object" ||
      Array.isArray(allCompletedMaterials)
    ) {
      allCompletedMaterials = {};
    }

    const currentUserMaterials =
      allCompletedMaterials[String(userId)] || [];

    if (!currentUserMaterials.includes(activityId)) {
      const updatedMaterials = [
        ...currentUserMaterials,
        activityId,
      ];

      allCompletedMaterials[String(userId)] =
        updatedMaterials;

      localStorage.setItem(
        "netlabCompletedMaterials",
        JSON.stringify(allCompletedMaterials)
      );

      setCompletedMaterials(updatedMaterials);
    }

    localStorage.setItem(
      "netlabLastActivity",
      activityName
    );
  };

  const isCompleted = (activityId) => {
    return completedMaterials.includes(activityId);
  };

  return (
    <div className="materi-page">
      <div className="materi-header">
        <p className="materi-header-title">
          LEARNING MATERIALS
        </p>

        <span>
          Choose a topic you want to learn and start
          building your understanding of computer networks.
        </span>
      </div>

      <div className="materi-grid">

        <div
          className={`materi-card ${
            isCompleted("dasar-jaringan")
              ? "completed"
              : ""
          }`}
        >
          <div className="materi-icon">🌐</div>

          <h2>Network Fundamentals</h2>

          <p>
            Learn the basic concepts of computer networks,
            their functions, network types, and how networks work.
          </p>

          <Link
            to="/materi/dasar-jaringan"
            className="materi-button"
            onClick={() =>
              handleMaterialClick(
                "dasar-jaringan",
                "Network Fundamentals"
              )
            }
          >
            {isCompleted("dasar-jaringan")
              ? "Completed ✓"
              : "Learn →"}
          </Link>
        </div>

        <div
          className={`materi-card ${
            isCompleted("perangkat-jaringan")
              ? "completed"
              : ""
          }`}
        >
          <div className="materi-icon">🖥️</div>

          <h2>Network Devices</h2>

          <p>
            Get to know various network devices such as
            routers, switches, servers, and other devices.
          </p>

          <Link
            to="/materi/perangkat-jaringan"
            className="materi-button"
            onClick={() =>
              handleMaterialClick(
                "perangkat-jaringan",
                "Network Devices"
              )
            }
          >
            {isCompleted("perangkat-jaringan")
              ? "Completed ✓"
              : "Learn →"}
          </Link>
        </div>

        <div
          className={`materi-card ${
            isCompleted("topologi-jaringan")
              ? "completed"
              : ""
          }`}
        >
          <div className="materi-icon">🔗</div>

          <h2>Network Topologies</h2>

          <p>
            Learn about different network topologies such as
            star, bus, ring, mesh, and tree.
          </p>

          <Link
            to="/materi/topologi-jaringan"
            className="materi-button"
            onClick={() =>
              handleMaterialClick(
                "topologi-jaringan",
                "Network Topologies"
              )
            }
          >
            {isCompleted("topologi-jaringan")
              ? "Completed ✓"
              : "Learn →"}
          </Link>
        </div>

        <div
          className={`materi-card ${
            isCompleted("kabel-lan")
              ? "completed"
              : ""
          }`}
        >
          <div className="materi-icon">🔌</div>

          <h2>Network Cables</h2>

          <p>
            Learn about LAN cables, network cable types,
            color arrangements, and the T568A and T568B standards.
          </p>

          <Link
            to="/materi/kabel-lan"
            className="materi-button"
            onClick={() =>
              handleMaterialClick(
                "kabel-lan",
                "Network Cables"
              )
            }
          >
            {isCompleted("kabel-lan")
              ? "Completed ✓"
              : "Learn →"}
          </Link>
        </div>

        <div
          className={`materi-card ${
            isCompleted("troubleshoot-materi")
              ? "completed"
              : ""
          }`}
        >
          <div className="materi-icon">🛠️</div>

          <h2>Network Troubleshooting</h2>

          <p>
            Learn the concepts of network troubleshooting,
            how to identify problems, analyze their causes,
            and perform network repairs.
          </p>

          <Link
            to="/materi/troubleshoot"
            className="materi-button"
            onClick={() =>
              handleMaterialClick(
                "troubleshoot-materi",
                "Network Troubleshooting"
              )
            }
          >
            {isCompleted("troubleshoot-materi")
              ? "Completed ✓"
              : "Learn →"}
          </Link>
        </div>

      </div>

      <div className="materi-home-navigation">
        <Link
          to="/home"
          className="materi-home-button"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Materi;