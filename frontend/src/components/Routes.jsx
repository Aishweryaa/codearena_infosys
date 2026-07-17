import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Loader } from "./Common.jsx";

export function ProtectedRoute() {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return <Loader message="Loading CodeArena..." />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export function AdminRoute() {
  const {
    isAuthenticated,
    isAdmin,
    initializing,
  } = useAuth();

  if (initializing) {
    return <Loader message="Checking administrator access..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}
