import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import ChefDashboard from "./ChefDashboard";
import UserDashboard from "./UserDashboard";
import Loading from "../components/Loading";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { userRole, authLoading } = useAuth();

  if (authLoading) return <Loading message="Loading dashboard..." />;
  if (!userRole)
    return (
      <p className="text-center mt-10 text-xl font-semibold text-red-600">
        Please log in to access your dashboard.
      </p>
    );

  const getDashboardComponent = () => {
    if (userRole === "admin") return <AdminDashboard />;
    if (userRole === "chef") return <ChefDashboard />;
    return <UserDashboard />;
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/dashBorad.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6 md:p-12 text-white"
      >
        {getDashboardComponent()}
      </motion.div>
    </div>
  );
}
