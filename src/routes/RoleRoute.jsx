import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function RoleRoute({ role, children }) {
  const { userRole, authLoading } = useAuth();

  if (authLoading) {
    return <Loading message="Loading..." />;
  }

  if (userRole !== role) {
    // redirect back to profile if role doesn't match
    return <Navigate to="/dashboard/profile" replace />;
  }

  return children;
}
