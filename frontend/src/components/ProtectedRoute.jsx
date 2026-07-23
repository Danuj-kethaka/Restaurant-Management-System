// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/Auth/User.js";

export default function ProtectedRoute({ allowedRoles = ["admin", "manager", "staff"] }) {
  const { currentUser, accessToken } = useUserStore();

  if (!currentUser || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}