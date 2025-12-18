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

export default function AdminDashboard() {
  return (
    <motion.section
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={itemVariants}
        className="text-3xl font-bold text[#F79A19] mb-4"
      >
        Admin Dashboard
      </motion.h1>
      <motion.p variants={itemVariants} className="text-white text-lg">
        Welcome, Admin! Here you can manage users, meals, and reviews.
      </motion.p>
    </motion.section>
  );
}
