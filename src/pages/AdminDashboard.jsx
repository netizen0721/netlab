import { Link } from "react-router-dom";

import "./Dashboard.css";

export default function AdminDashboard() {
  const users = JSON.parse(
    localStorage.getItem("netlabUsers") || "[]"
  );

  const students = users.filter(
    (user) => user.role === "student"
  );

  const teachers = users.filter(
    (user) => user.role === "teacher"
  );

  const admins = users.filter(
    (user) => user.role === "admin"
  );

  return (
    <div className="dashboard-page">
      <header className="dashboard-navbar">
        <Link
          to="/admin-dashboard"
          className="dashboard-brand"
        >
          <div className="dashboard-brand-icon">
            NET
          </div>

          <div>
            <strong>NETLAB</strong>
            <span>Admin Dashboard</span>
          </div>
        </Link>

        <div className="dashboard-user">
          <div className="dashboard-user-info">
            <strong>
              {admins[0]?.fullName || "Administrator"}
            </strong>

            <span>Administrator</span>
          </div>

          <button
            className="dashboard-logout"
            onClick={() => {
              localStorage.removeItem("netlabUser");
              localStorage.removeItem("netlabRole");
              localStorage.removeItem("netlabUserId");
              window.location.href = "/";
            }}
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-heading">
          <div>
            <p className="dashboard-label">
              ADMINISTRATION
            </p>

            <h1>Welcome, Administrator</h1>

            <p>
              Manage NETLAB users, learning activities,
              and platform information.
            </p>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="stat-icon">
              👨‍🎓
            </div>

            <div>
              <span>Total Students</span>
              <strong>{students.length}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">
              👨‍🏫
            </div>

            <div>
              <span>Total Teachers</span>
              <strong>{teachers.length}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">
              🛠️
            </div>

            <div>
              <span>Learning Labs</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">
              📚
            </div>

            <div>
              <span>Learning Materials</span>
              <strong>4</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <p className="panel-label">
                  USER MANAGEMENT
                </p>

                <h2>Registered Users</h2>
              </div>
            </div>

            <div className="user-table">
              <div className="user-table-header">
                <span>Name</span>
                <span>Username</span>
                <span>Role</span>
              </div>

              {users.map((user) => (
                <div
                  className="user-table-row"
                  key={user.id}
                >
                  <span>
                    {user.fullName}
                  </span>

                  <span>
                    @{user.username}
                  </span>

                  <span
                    className={`role-badge ${user.role}`}
                  >
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <p className="panel-label">
                  QUICK ACCESS
                </p>

                <h2>Platform Management</h2>
              </div>
            </div>

            <div className="quick-actions">
              <button className="quick-action">
                <span>👨‍🎓</span>

                <div>
                  <strong>
                    Manage Students
                  </strong>

                  <small>
                    View registered students
                  </small>
                </div>
              </button>

              <button className="quick-action">
                <span>👨‍🏫</span>

                <div>
                  <strong>
                    Manage Teachers
                  </strong>

                  <small>
                    Manage teacher accounts
                  </small>
                </div>
              </button>

              <button className="quick-action">
                <span>📊</span>

                <div>
                  <strong>
                    Learning Progress
                  </strong>

                  <small>
                    View student progress
                  </small>
                </div>
              </button>

              <button className="quick-action">
                <span>⚙️</span>

                <div>
                  <strong>
                    Platform Settings
                  </strong>

                  <small>
                    Configure NETLAB
                  </small>
                </div>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}