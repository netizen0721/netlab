import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";

import { initializeUsers } from "./utils/initializeUsers";
import { getTrackedLearningStatus } from "./utils/progressTracker";

import Materi from "./pages/Materi";
import DasarJaringan from "./pages/DasarJaringan";
import PerangkatJaringan from "./pages/PerangkatJaringan";
import TopologiJaringan from "./pages/TopologiJaringan";
import KabelLAN from "./pages/KabelLAN";
import CableLab from "./pages/CableLab";
import NetworkLab from "./pages/NetworkLab";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ARHardware from "./pages/ARHardware";
import Welcome from "./pages/Welcome";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Troubleshoot from "./pages/Troubleshoot";
import ScrollToTop from "./components/ScrollToTop";
import TroubleshootLab from "./pages/TroubleshootLab";
import Challenge from "./pages/Challenge";
import CableDetective from "./pages/CableDetective";
import IPHunter from "./pages/IPHunter";
import TopologyFailure from "./pages/TopologyFailure";
import WifiRescue from "./pages/WifiRescue";
import NetworkCrisis from "./pages/NetworkCrisis";
import PreTest from "./pages/PreTest";
import PostTest from "./pages/PostTest";
import Progress from "./pages/Progress";

initializeUsers();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [username] = useState(
    localStorage.getItem("netlabUser")
  );

  const userId = localStorage.getItem(
    "netlabUserId"
  );

  const totalActivities = 9;

  const learningStatus = userId
    ? getTrackedLearningStatus(userId)
    : null;

  const completedActivities = learningStatus
    ? learningStatus.completedCount
    : 0;

  const progressPercentage = learningStatus
    ? learningStatus.progress
    : 0;

  const lastActivity = localStorage.getItem(
    "netlabLastActivity"
  );

  const handleSignOut = () => {
    localStorage.removeItem("netlabUser");
    localStorage.removeItem("netlabRole");
    localStorage.removeItem("netlabUserId");
    window.location.href = "/";
  };

  return (
    <div>
      {/* =========================
          NAVBAR
          ========================= */}

      <nav>
        <div className="navbar-left">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <div>
            <h2>NETLAB</h2>
          </div>
        </div>

        <div className="nav-links">
          <Link to="/home">
            Home
          </Link>

          <Link to="/materi">
            Materials
          </Link>

          <Link to="/ar-hardware">
            3D Lab
          </Link>

          <Link to="/network-lab">
            Network Lab
          </Link>

          <Link to="/cable-lab">
            Cable Lab
          </Link>

          <Link to="/troubleshoot-lab">
            Troubleshoot Lab
          </Link>

          <Link to="/challenge">
            Challenge
          </Link>

          <Link to="/pre-test">
            Pre-Test
          </Link>

          <Link to="/post-test">
            Post-Test
          </Link>

          {username ? (
            <span className="user-nav">
              👤 {username}
            </span>
          ) : (
            <Link
              to="/sign-in"
              className="signin-nav"
            >
              👤 Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* =========================
          SIDEBAR DASHBOARD
          ========================= */}

      {menuOpen && (
        <>
          <div
            className="sidebar-overlay"
            onClick={() => setMenuOpen(false)}
          ></div>

          <aside className="sidebar">

            {/* SIDEBAR HEADER */}

            <div className="sidebar-header">
              <div>
                <strong>
                  🌐 NETLAB
                </strong>

                <span>
                  Interactive Network Learning
                </span>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* PROFILE */}

            <div className="dashboard-profile">
              <div className="profile-avatar">
                👤
              </div>

              {username ? (
                <>
                  <h3>
                    Hi, {username}! 👋
                  </h3>

                  <p>
                    NETLAB Student
                  </p>
                </>
              ) : (
                <>
                  <h3>
                    Hi, Student! 👋
                  </h3>

                  <p>
                    Not Signed In
                  </p>
                </>
              )}
            </div>

            {/* SIGN IN MESSAGE */}

            {!username && (
              <div className="dashboard-message">
                <div className="dashboard-message-icon">
                  🔐
                </div>

                <h4>
                  Not Signed In
                </h4>

                <p>
                  Sign in to save your progress
                  and view your learning activity.
                </p>

                <Link
                  to="/sign-in"
                  className="dashboard-signin"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Sign In →
                </Link>
              </div>
            )}

            {/* LEARNING DASHBOARD */}

            <div className="dashboard-info">
              <div className="dashboard-label">
                YOUR LEARNING
              </div>

              {/* PROGRESS */}

              <Link
                to="/progress"
                className="dashboard-progress"
                onClick={() => setMenuOpen(false)}
              >
                <div className="dashboard-section-title">
                  <div className="section-icon purple">
                    📊
                  </div>

                  <div>
                    <strong>
                      Learning Progress
                    </strong>

                    <span>
                      Your learning progress
                    </span>
                  </div>
                </div>

                {username ? (
                  <>
                    <div className="progress-main">
                      <div className="progress-circle">
                        <strong>
                          {progressPercentage}%
                        </strong>
                      </div>

                      <div className="progress-info">
                        <strong>
                          {completedActivities} of{" "}
                          {totalActivities}
                        </strong>

                        <span>
                          activities completed
                        </span>
                      </div>
                    </div>

                    <div className="sidebar-progress-bar">
                      <div
                        className="sidebar-progress-fill"
                        style={{
                          width: `${progressPercentage}%`,
                        }}
                      ></div>
                    </div>

                    <p className="progress-status">
                      {progressPercentage === 100
                        ? "All activities completed! 🎉"
                        : progressPercentage > 0
                        ? "Keep learning! 🚀"
                        : "Start your learning journey! 🚀"}
                    </p>
                  </>
                ) : (
                  <p className="locked-text">
                    🔒 Sign in to view your progress
                  </p>
                )}
              </Link>
            </div>

            {/* SIDEBAR BOTTOM */}

            <div className="sidebar-bottom">
              {username ? (
                <button
                  className="signout-button"
                  onClick={handleSignOut}
                >
                  <span>
                    🚪
                  </span>

                  Sign Out
                </button>
              ) : (
                <div className="sidebar-footer-text">
                  <span>
                    NETLAB
                  </span>

                  <small>
                    Learn. Explore. Connect.
                  </small>
                </div>
              )}
            </div>

          </aside>
        </>
      )}

      {/* =========================
          HERO
          ========================= */}

      <main className="hero">
        <div className="hero-text">

          <p className="hero-label">
            🌐 INTERACTIVE NETWORK LEARNING
          </p>

          <h1>
            Build Your{" "}
            <span>
              Network.
            </span>
          </h1>

          <p className="hero-description">
            Learn computer networking through
            simulations and interactive experiences.
          </p>

          <Link
            to="/materi"
            className="hero-button"
          >
            Start Learning →
          </Link>

        </div>

        {/* NETWORK LOGO */}

        <div className="hero-card">
          <img
            src="/models/logo-netlab1.png"
            alt="Network connection"
            className="network-logo"
          />
        </div>

      </main>

      {/* =========================
          FEATURES
          ========================= */}

      <section className="features">

        <div className="section-title">
          <p>
            EXPLORE NETLAB
          </p>

          <h2>
            Learn in a Different Way
          </h2>
        </div>

        <div className="feature-grid">

          {/* MATERIALS */}

          <div className="feature-card">
            <div className="feature-icon">
              📚
            </div>

            <h3>
              Materials
            </h3>

            <p>
              Learn the fundamentals of networking,
              network devices, topologies, and LAN
              cables through easy-to-understand materials.
            </p>

            <Link to="/materi">
              Learn Materials →
            </Link>
          </div>

          {/* 3D LAB */}

          <div className="feature-card">
            <div className="feature-icon">
              📱
            </div>

            <h3>
              3D Lab
            </h3>

            <p>
              Explore various network devices
              through an interactive 3D
              learning experience.
            </p>

            <Link to="/ar-hardware">
              Explore 3D Lab →
            </Link>
          </div>

          {/* NETWORK LAB */}

          <div className="feature-card">
            <div className="feature-icon">
              🌐
            </div>

            <h3>
              Network Lab
            </h3>

            <p>
              Simulate different network topologies
              and connect devices interactively.
            </p>

            <Link to="/network-lab">
              Start Simulation →
            </Link>
          </div>

          {/* CABLE LAB */}

          <div className="feature-card">
            <div className="feature-icon">
              🔌
            </div>

            <h3>
              Cable Lab
            </h3>

            <p>
              Learn how to arrange LAN cables
              by matching cable colors to the
              correct RJ45 positions.
            </p>

            <Link to="/cable-lab">
              Build Cable →
            </Link>
          </div>

          {/* TROUBLESHOOT LAB */}

          <div className="feature-card">
            <div className="feature-icon">
              🔧
            </div>

            <h3>
              Troubleshoot Lab
            </h3>

            <p>
              Find and fix network problems
              through hands-on troubleshooting
              simulations.
            </p>

            <Link to="/troubleshoot-lab">
              Start Troubleshooting →
            </Link>
          </div>

          {/* CHALLENGE */}

          <div className="feature-card">
            <div className="feature-icon">
              🧠
            </div>

            <h3>
              Challenge
            </h3>

            <p>
              Test your understanding through
              quizzes and various learning
              challenges.
            </p>

            <Link to="/challenge">
              Start Challenge →
            </Link>
          </div>

          {/* PRE-TEST */}

          <div className="feature-card">
            <div className="feature-icon">
              📝
            </div>

            <h3>
              Pre-Test
            </h3>

            <p>
              Test your initial knowledge before
              learning networking materials.
            </p>

            <Link to="/pre-test">
              Start Pre-Test →
            </Link>
          </div>

          {/* POST-TEST */}

          <div className="feature-card">
            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Post-Test
            </h3>

            <p>
              Test your understanding after
              completing the networking lessons.
            </p>

            <Link to="/post-test">
              Start Post-Test →
            </Link>
          </div>

        </div>
      </section>

      {/* =========================
          PROGRESS SECTION
          ========================= */}

      <section className="progress-section">

        <div className="progress-content">

          <div>
            <p className="progress-label">
              YOUR PROGRESS
            </p>

            <h2>
              Your Learning Journey
            </h2>

            <p className="progress-description">
              Continue your learning journey and
              complete various activities to
              develop your networking skills.
            </p>
          </div>

          <div className="progress-card">

            <div className="progress-top">
              <span>
                Learning Progress
              </span>

              <strong>
                {progressPercentage}%
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progressPercentage}%`,
                }}
              ></div>
            </div>

            <p>
              {completedActivities} of{" "}
              {totalActivities} activities completed
            </p>

          </div>

        </div>
      </section>

      {/* =========================
          FOOTER
          ========================= */}

      <footer>

        <div>
          <h3>
            NETLAB
          </h3>

          <p>
            Interactive Network Learning
          </p>
        </div>

        <p>
         © 2026 PTI2025B NETLAB. An interactive platform for network learning.
        </p>

      </footer>

    </div>
  );
}

/* =========================
   APP ROUTES
   ========================= */

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* WELCOME */}

        <Route
          path="/"
          element={<Welcome />}
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <Home />
            </ProtectedRoute>
          }
        />

        {/* AUTHENTICATION */}

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/sign-in"
          element={<SignIn />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["teacher"]}
            >
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* MAIN PAGES */}

        <Route
          path="/materi"
          element={<Materi />}
        />

        <Route
          path="/network-lab"
          element={<NetworkLab />}
        />

        <Route
          path="/ar-hardware"
          element={<ARHardware />}
        />

        {/* MATERIALS */}

        <Route
          path="/materi/dasar-jaringan"
          element={<DasarJaringan />}
        />

        <Route
          path="/materi/perangkat-jaringan"
          element={<PerangkatJaringan />}
        />

        <Route
          path="/materi/topologi-jaringan"
          element={<TopologiJaringan />}
        />

        <Route
          path="/materi/kabel-lan"
          element={<KabelLAN />}
        />

        <Route
          path="/materi/troubleshoot"
          element={<Troubleshoot />}
        />

        {/* LAB */}

        <Route
          path="/cable-lab"
          element={<CableLab />}
        />

        <Route
          path="/troubleshoot-lab"
          element={<TroubleshootLab />}
        />

        <Route
          path="/challenge"
          element={<Challenge />}
        />

        <Route
          path="/challenge/cable-detective"
          element={<CableDetective />}
        />

        <Route
          path="/challenge/ip-hunter"
          element={<IPHunter />}
        />

        <Route
          path="/challenge/topology-failure"
          element={<TopologyFailure />}
        />

        <Route
          path="/challenge/wifi-rescue"
          element={<WifiRescue />}
        />

        <Route
          path="/challenge/network-crisis"
          element={<NetworkCrisis />}
        />

        <Route
          path="/pre-test"
          element={<PreTest />}
        />

        <Route
          path="/post-test"
          element={<PostTest />}
        />

        <Route
          path="/progress"
          element={<Progress />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;