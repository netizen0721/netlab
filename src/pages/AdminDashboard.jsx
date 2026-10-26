import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  console.log("ADMIN DASHBOARD FILE AKTIF");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadUsers = useCallback(async () => {
    console.log("AdminDashboard component is running");
    setLoadingUsers(true);
    setErrorMessage("");

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      if (!session) {
        throw new Error(
          "No active Supabase session. Please sign in again using Supabase Auth."
        );
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, username, role, created_at")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Supabase profiles query failed:", error);
        throw error;
      }

      console.log("Profiles loaded:", data);

      setUsers(
        (data || []).map((user) => ({
          ...user,
          fullName:
            user.full_name || user.username || "Unnamed User",
        }))
      );
    } catch (error) {
      console.error("Admin dashboard error:", error);
      setUsers([]);
      setErrorMessage(
        error.message || "Failed to load users from Supabase."
      );
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const students = users.filter(
    (user) => user.role === "student"
  );

  const teachers = users.filter(
    (user) => user.role === "teacher"
  );

  const admins = users.filter(
    (user) => user.role === "admin"
  );

  const currentUsername = localStorage.getItem("netlabUser");

  const currentAdmin =
    admins.find((user) => user.username === currentUsername) ||
    admins[0];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Supabase sign-out error:", error);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("netlabUser");
      localStorage.removeItem("netlabRole");
      localStorage.removeItem("netlabUserId");

      window.location.href = "/";
    }
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-navbar">
        <Link to="/admin-dashboard" className="dashboard-brand">
          <div className="dashboard-brand-icon">NET</div>
          <div>
            <strong>NETLAB</strong>
            <span>Admin Dashboard</span>
          </div>
        </Link>

        <div className="dashboard-user">
          <div className="dashboard-user-info">
            <strong>
              {currentAdmin?.fullName || "Administrator"}
            </strong>
            <span>Administrator</span>
          </div>

          <button
            className="dashboard-logout"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-heading">
          <div>
            <p className="dashboard-label">ADMINISTRATION</p>
            <h1>Welcome, Administrator</h1>
            <p>
              Manage NETLAB users, learning activities,
              and platform information.
            </p>
          </div>
        </section>

        {errorMessage && (
          <div
            role="alert"
            style={{
              color: "#ff6b6b",
              background: "rgba(255, 107, 107, 0.08)",
              border: "1px solid rgba(255, 107, 107, 0.3)",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "20px",
              overflowWrap: "anywhere",
            }}
          >
            <strong>Unable to load users</strong>
            <p>{errorMessage}</p>
            <button
              type="button"
              onClick={loadUsers}
              style={{
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                marginTop: "8px",
              }}
            >
              Try Again
            </button>
          </div>
        )}

        <section className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div>
              <span>Total Students</span>
              <strong>
                {loadingUsers ? "..." : students.length}
              </strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">👨‍🏫</div>
            <div>
              <span>Total Teachers</span>
              <strong>
                {loadingUsers ? "..." : teachers.length}
              </strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">🛠️</div>
            <div>
              <span>Learning Labs</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">📚</div>
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
                <p className="panel-label">USER MANAGEMENT</p>
                <h2>Registered Users</h2>
              </div>

              <button
                type="button"
                onClick={loadUsers}
                disabled={loadingUsers}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: loadingUsers ? "wait" : "pointer",
                }}
              >
                {loadingUsers ? "Loading..." : "Refresh"}
              </button>
            </div>

            <div className="user-table">
              <div className="user-table-header">
                <span>Name</span>
                <span>Username</span>
                <span>Role</span>
              </div>

              {loadingUsers ? (
                <div className="user-table-row">
                  <span>Loading users...</span>
                </div>
              ) : errorMessage ? (
                <div className="user-table-row">
                  <span>Could not load users. Check the error above.</span>
                </div>
              ) : users.length === 0 ? (
                <div className="user-table-row">
                  <span>No registered users found.</span>
                </div>
              ) : (
                users.map((user) => (
                  <div className="user-table-row" key={user.id}>
                    <span>{user.fullName}</span>
                    <span>@{user.username || "-"}</span>
                    <span className={`role-badge ${user.role}`}>
                      {user.role || "unknown"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <p className="panel-label">QUICK ACCESS</p>
                <h2>Platform Management</h2>
              </div>
            </div>

            <div className="quick-actions">
              <button
                className="quick-action"
                onClick={() =>
                  document
                    .querySelector(".user-table")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span>👨‍🎓</span>
                <div>
                  <strong>Manage Students</strong>
                  <small>View registered students</small>
                </div>
              </button>

              <button
                className="quick-action"
                onClick={() =>
                  document
                    .querySelector(".user-table")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span>👨‍🏫</span>
                <div>
                  <strong>Manage Teachers</strong>
                  <small>Manage teacher accounts</small>
                </div>
              </button>

              <Link
                to="/progress"
                className="quick-action"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span>📊</span>
                <div>
                  <strong>Learning Progress</strong>
                  <small>View student progress</small>
                </div>
              </Link>

              <button
                className="quick-action"
                onClick={() =>
                  window.alert(
                    "Platform settings are not available yet."
                  )
                }
              >
                <span>⚙️</span>
                <div>
                  <strong>Platform Settings</strong>
                  <small>Configure NETLAB</small>
                </div>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}