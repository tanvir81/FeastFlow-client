import { motion } from 'framer-motion';
// import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Home, UtensilsCrossed, ChefHat, AlertCircle } from 'lucide-react';

const ErrorPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const plateVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#FFE52A]/10 via-white to-[#F79A19]/10 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 text-[#FFE52A] opacity-20"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <UtensilsCrossed size={80} />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-[#F79A19] opacity-20"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <ChefHat size={70} />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-5 text-[#FFE52A] opacity-15"
        variants={plateVariants}
        animate="animate"
      >
        <div className="w-16 h-16 rounded-full border-4 border-current" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-20 text-[#F79A19] opacity-15"
        variants={plateVariants}
        animate="animate"
      >
        <div className="w-20 h-20 rounded-full border-4 border-current" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="max-w-2xl w-full text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated 404 with food icon */}
        <motion.div
          className="relative mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center leading-none">
            <motion.span
              className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-linear-to-r from-[#FFE52A] to-[#F79A19]"
              variants={floatingVariants}
              animate="animate"
            >
              4
            </motion.span>
            <motion.span
              className="inline-flex items-center justify-center mx-2 md:mx-6"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <UtensilsCrossed className="text-[#F79A19]" size={100} strokeWidth={2.5} />
            </motion.span>
            <motion.span
              className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-linear-to-r from-[#FFE52A] to-[#F79A19]"
              variants={floatingVariants}
              animate="animate"
            >
              4
            </motion.span>
          </div>
        </motion.div>

        {/* Error message */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            className="inline-flex items-center gap-2 bg-[#FFE52A]/20 px-6 py-3 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <AlertCircle className="text-[#F79A19]" size={24} />
            <span className="text-gray-800 font-semibold">Oops! Page Not Found</span>
          </motion.div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          Looks like this dish isn't on our menu!
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-gray-600 text-lg mb-8 max-w-md mx-auto"
        >
          The page you're looking for seems to have been eaten. Let's get you back to something delicious!
        </motion.p>

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-linear-to-r from-[#FFE52A] to-[#F79A19] text-gray-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Home size={20} />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/meals"
              className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow border-2 border-[#FFE52A]"
            >
              <UtensilsCrossed size={20} />
              Browse Meals
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated decorative elements */}
        <motion.div
          className="mt-12 flex justify-center gap-4"
          variants={itemVariants}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-linear-to-r from-[#FFE52A] to-[#F79A19]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
