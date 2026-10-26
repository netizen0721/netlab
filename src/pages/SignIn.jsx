import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./Auth.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = loginData.username.trim();
    const password = loginData.password;

    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data: email, error: lookupError } =
        await supabase.rpc("get_login_email", {
          input_username: username,
        });

      if (lookupError) {
        console.error("Username lookup error:", lookupError);
        setError("Unable to find your account. Please try again.");
        return;
      }

      if (!email) {
        setError("Username or password is incorrect.");
        return;
      }

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        console.error("Sign-in error:", signInError);

        if (signInError.message === "Email not confirmed") {
          setError(
            "Your account email has not been confirmed. Please confirm it before signing in."
          );
        } else {
          setError("Username or password is incorrect.");
        }

        return;
      }

      const user = data.user;

      if (!user) {
        setError("Unable to retrieve your account.");
        return;
      }

      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select("id, full_name, username, role, student_id")
          .eq("id", user.id)
          .maybeSingle();

      if (profileError || !profile) {
        await supabase.auth.signOut();
        setError("Your profile could not be found. Please contact the administrator.");
        return;
      }

      localStorage.setItem(
        "netlabUser",
        profile.username || profile.full_name || user.email
      );
      localStorage.setItem("netlabRole", profile.role);
      localStorage.setItem("netlabUserId", user.id);
      localStorage.setItem("netlabEmail", user.email || "");

      if (profile.role === "admin") {
        navigate("/admin-dashboard");
      } else if (profile.role === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Unexpected sign-in error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-one"></div>
      <div className="auth-glow auth-glow-two"></div>

      <div className="auth-container">
        <Link to="/" className="auth-brand">
          <div className="auth-brand-icon">NET</div>
          <div>
            <strong>NETLAB</strong>
            <span>Interactive Network Learning</span>
          </div>
        </Link>

        <div className="auth-card login-card">
          <div className="auth-header">
            <div className="auth-icon">🔐</div>
            <p className="auth-label">NETLAB ACCOUNT</p>
            <h1>Welcome Back</h1>
            <p>
              Log in to continue your networking
              learning journey.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className="forgot-button"
                  onClick={() =>
                    setError(
                      "Password recovery is not available yet."
                    )
                  }
                >
                  Forgot Password?
                </button>
              </div>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="auth-message error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Log In"}
            </button>
          </form>

          <div className="auth-switch">
            <span>Don't have a NETLAB account?</span>
            <Link to="/register">Create Account</Link>
          </div>
        </div>

        <Link to="/" className="back-home">
          ← Back to Welcome
        </Link>
      </div>
    </div>
  );
}