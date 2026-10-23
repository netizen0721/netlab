import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const username =
    localStorage.getItem("netlabUser");

  const role =
    localStorage.getItem("netlabRole");

  if (!username || !role) {
    return <Navigate to="/" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    if (role === "admin") {
      return (
        <Navigate
          to="/admin-dashboard"
          replace
        />
      );
    }

    if (role === "teacher") {
      return (
        <Navigate
          to="/teacher-dashboard"
          replace
        />
      );
    }

    return <Navigate to="/home" replace />;
  }

  return children;
}