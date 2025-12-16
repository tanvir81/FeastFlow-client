import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return <Loading message="Authenticating..." />;
  }

  if (!user) {
    // redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
