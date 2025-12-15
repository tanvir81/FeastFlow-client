import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function RoleRoute({ role, children }) {
  const { userRole, authLoading } = useAuth();

  if (authLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (userRole !== role) {
    // redirect back to profile if role doesn't match
    return <Navigate to="/dashboard/profile" replace />;
  }

  return children;
}
