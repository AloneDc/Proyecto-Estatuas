import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const isLoggedIn = localStorage.getItem("admin_token");

  if (!isLoggedIn) {
    return <Navigate to="/acceso" replace />;
  }

  return children;
}
