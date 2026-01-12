import { motion } from "framer-motion";

const Loading = ({ message = "Loading...", size = "large" }) => {
  const sizeClasses = {
    small: "h-8 w-8 border-t-2 border-b-2",
    medium: "h-12 w-12 border-t-3 border-b-3",
    large: "h-16 w-16 border-t-4 border-b-4",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-amber-glow-300`}
      ></div>
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-gray-600 text-lg"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Loading;
