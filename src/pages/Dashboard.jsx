import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import ChefDashboard from "./ChefDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
  const { userRole, authLoading } = useAuth();

  if (authLoading) return <p>Loading...</p>;
  if (!userRole) return <p>Please log in to access your dashboard.</p>;

  if (userRole === "admin") return <AdminDashboard />;
  if (userRole === "chef") return <ChefDashboard />;
  return <UserDashboard />;
}
