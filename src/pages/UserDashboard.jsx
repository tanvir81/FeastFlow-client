import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.5, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold text-[#F79A19] mb-4"
      >
        Welcome Back,{" "}
        <span className="text-[#F79A19]">
          {user?.displayName || user?.name || "User"}
        </span>
        !
      </motion.h1>
      <motion.p variants={itemVariants} className="text-white text-lg">
        Here you can view your favorite meals, reviews, and manage your profile.
      </motion.p>
      {/* Add user-specific controls here */}
    </motion.section>
  );
}
