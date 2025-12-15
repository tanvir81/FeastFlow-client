import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const iconVariant = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.2, 
    rotate: [0, -10, 10, -10, 0],
    transition: { duration: 0.5 } 
  },
};

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Choose Your Meal",
      description: "Browse through a variety of authentic homemade meals.",
      icon: "🍔",
    },
    {
      id: 2,
      title: "Chef Cooks with Love",
      description: "Local chefs prepare your order with fresh ingredients.",
      icon: "👨‍🍳",
    },
    {
      id: 3,
      title: "Fast Delivery",
      description: "Hot and fresh food delivered straight to your doorstep.",
      icon: "🚀",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-orange-50/30 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-6"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            How It <span className="text-[#F79A19]">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Ordering your favorite homemade food has never been easier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {/* Connecting Line (Desktop) */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="hidden md:block absolute top-[50px] left-10 right-10 h-1 bg-gradient-to-r from-[#FFE52A] via-[#F79A19] to-[#FFE52A] rounded-full -z-10 origin-left"
          ></motion.div>

          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={item}
              whileHover="hover"
              initial="rest"
              className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 text-center relative group backdrop-blur-sm hover:border-[#F79A19]/30 transition-colors duration-300"
            >
              <motion.div 
                variants={iconVariant}
                className="w-24 h-24 mx-auto bg-gradient-to-tr from-[#FFE52A] to-[#F79A19] rounded-2xl flex items-center justify-center text-5xl shadow-lg mb-8 transform rotate-3 transition-transform group-hover:rotate-0"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#F79A19] transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">{step.description}</p>
              
              {/* Step Number Badge */}
              <div className="absolute -top-5 -right-5 w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  {step.id}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
