import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-red-50 to-orange-50 min-h-[90vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[#F79A19] font-bold tracking-wider uppercase mb-2 block"
          >
            Hungry? We got you.
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6"
          >
            Taste the <span className="text-[#FFE52A]">Magic</span> <br />
            of Home Cooking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 mb-8 max-w-lg"
          >
            Connect with local chefs and enjoy authentic, health-conscious meals delivered straight to your door.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex gap-4"
          >
            <Link
              to="/meals"
              className="px-8 py-3 bg-[#F79A19] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-[#e08912] transition-all transform hover:-translate-y-1"
            >
              Order Now
            </Link>
            <Link
              to="/reviews"
              className="px-8 py-3 bg-white text-[#F79A19] border-2 border-[#F79A19] font-bold rounded-full hover:bg-orange-50 transition-all"
            >
              See Reviews
            </Link>
          </motion.div>
        </motion.div>

        {/* Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-0"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
             {/* Decorative blob background */}
            <div className="absolute inset-0 bg-[#FFE52A]/20 rounded-full blur-3xl animate-pulse"></div>
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Delicious Bowl"
              className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
             {/* Floating Badge */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
               className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
            >
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <div>
                        <p className="font-bold text-gray-800">Hot & Fresh</p>
                        <p className="text-xs text-gray-500">Delivered in 30m</p>
                    </div>
                </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
