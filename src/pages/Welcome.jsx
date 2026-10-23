import { Link } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-page">

      <div className="welcome-glow glow-one"></div>
      <div className="welcome-glow glow-two"></div>

      <main className="welcome-container">

        <div className="welcome-logo">
          <div className="welcome-logo-icon">
            NET
          </div>

          <div>
            <h1>NETLAB</h1>
            <p>Interactive Network Learning</p>
          </div>
        </div>

        <div className="welcome-content">

          <p className="welcome-label">
            🌐 NETWORK LEARNING PLATFORM
          </p>

          <h2>
            Welcome to
            <span> NETLAB</span>
          </h2>

          <p className="welcome-description">
            Learn computer networking through
            interactive materials, virtual labs,
            and practical simulations.
          </p>

          <div className="welcome-actions">

            <Link
              to="/register"
              className="welcome-button primary"
            >
              Create Account
            </Link>

            <Link
              to="/sign-in"
              className="welcome-button secondary"
            >
              Log In
            </Link>

          </div>

          <p className="welcome-footer-text">
            New to NETLAB? Create an account to
            start your learning journey.
          </p>

        </div>

      </main>

    </div>
  );
}