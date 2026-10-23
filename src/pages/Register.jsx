import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import {
  initializeStudentProgress,
} from "../utils/progress";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      fullName,
      studentId,
      email,
      username,
      password,
      confirmPassword,
    } = formData;

    if (
      !fullName ||
      !studentId ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem("netlabUsers") || "[]"
    );

    const usernameExists = existingUsers.some(
      (user) =>
        user.username.toLowerCase() ===
        username.trim().toLowerCase()
    );

    if (usernameExists) {
      setError(
        "This username is already registered. Please choose another username."
      );
      return;
    }

    const emailExists = existingUsers.some(
      (user) =>
        user.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (emailExists) {
      setError(
        "This email is already registered. Please use another email address."
      );
      return;
    }

    const studentIdExists = existingUsers.some(
      (user) =>
        user.studentId &&
        user.studentId.toLowerCase() ===
          studentId.trim().toLowerCase()
    );

    if (studentIdExists) {
      setError(
        "This Student ID is already registered. Please check your information."
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName: fullName.trim(),
      studentId: studentId.trim(),
      email: email.trim(),
      username: username.trim(),
      password,
      role: "student",
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [
      ...existingUsers,
      newUser,
    ];

    localStorage.setItem(
      "netlabUsers",
      JSON.stringify(updatedUsers)
    );

    initializeStudentProgress(newUser.id);

    setSuccess(
      "Account created successfully! Redirecting to Sign In..."
    );

    setFormData({
      fullName: "",
      studentId: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      navigate("/sign-in");
    }, 1500);
  };

  return (
    <div className="auth-page">

      <div className="auth-glow auth-glow-one"></div>
      <div className="auth-glow auth-glow-two"></div>

      <div className="auth-container">

        <Link
          to="/"
          className="auth-brand"
        >
          <div className="auth-brand-icon">
            NET
          </div>

          <div>
            <strong>
              NETLAB
            </strong>

            <span>
              Interactive Network Learning
            </span>
          </div>
        </Link>

        <div className="auth-card">

          <div className="auth-header">

            <div className="auth-icon">
              ✨
            </div>

            <p className="auth-label">
              STUDENT REGISTRATION
            </p>

            <h1>
              Create Your Account
            </h1>

            <p>
              Create a NETLAB student account to
              start your learning journey.
            </p>

          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

            </div>

            <div className="form-group">

              <label>
                Student ID
              </label>

              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter your student ID"
              />

            </div>

            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

            </div>

            <div className="form-group">

              <label>
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Create a username"
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Password
                </label>

                <div className="password-input-wrapper">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
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

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <div className="password-input-wrapper">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showConfirmPassword ? (

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

            </div>

            {error && (
              <div className="auth-message error">
                {error}
              </div>
            )}

            {success && (
              <div className="auth-message success">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
            >
              Create Account
            </button>

          </form>

          <div className="auth-switch">

            <span>
              Already have a NETLAB account?
            </span>

            <Link to="/sign-in">
              Log In
            </Link>

          </div>

        </div>

        <Link
          to="/"
          className="back-home"
        >
          ← Back to Welcome
        </Link>

      </div>

    </div>
  );
}