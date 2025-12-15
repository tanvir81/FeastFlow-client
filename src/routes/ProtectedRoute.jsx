import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    // redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
