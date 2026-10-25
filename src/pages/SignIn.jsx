
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./Auth.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    usernameOrEmail: "",
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

    const usernameOrEmail =
      loginData.usernameOrEmail.trim();
    const password = loginData.password;

    if (!usernameOrEmail || !password) {
      setError(
        "Please enter your username or email and password."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      let email = usernameOrEmail;

      // Resolve username to email using the user's own profile.
      if (!usernameOrEmail.includes("@")) {
        setError(
          "Please sign in using your registered email address."
        );
        setLoading(false);
        return;
      }

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(
          "Unable to sign in. Please check your email and password."
        );
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        setError("Unable to retrieve your account.");
        setLoading(false);
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
        setError(
          "Your profile could not be found. Please contact the administrator."
        );
        setLoading(false);
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
      setError(
        "Something went wrong. Please try again."
      );
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

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="usernameOrEmail">
                Email
              </label>
              <input
                id="usernameOrEmail"
                type="email"
                name="usernameOrEmail"
                value={loginData.usernameOrEmail}
                onChange={handleChange}
                placeholder="Enter your registered email"
                autoComplete="email"
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
                      "Password recovery will be available later."
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
                  {showPassword ? (
                    <svg
                      className="password-eye-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 12C4.2 8.8 7.5 6.5 12 6.5C16.5 6.5 19.8 8.8 21.5 12C19.8 15.2 16.5 17.5 12 17.5C7.5 17.5 4.2 15.2 2.5 12Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="2.8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="password-eye-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.6 6.7C11.05 6.57 11.52 6.5 12 6.5C16.5 6.5 19.8 8.8 21.5 12C20.75 13.42 19.7 14.65 18.43 15.58"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.35 8.2C4.7 9.1 3.45 10.55 2.5 12C4.2 15.2 7.5 17.5 12 17.5C13.05 17.5 14.03 17.34 14.92 17.04"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
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
