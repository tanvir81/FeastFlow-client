import React from "react";
import { motion } from "framer-motion";
import { Search, User, MapPin } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Choose Your Meal",
    description: "Browse through a variety of authentic homemade meals.",
    color: "#F79A19",
    bgColor: "bg-orange-100",
    shape:
      "rounded-tr-[100px] rounded-br-[100px] rounded-tl-[50px] rounded-bl-[50px]",
  },
  {
    id: "02",
    title: "Chef Cooks with Love",
    description: "Local chefs prepare your order with fresh ingredients.",
    color: "#FFE52A",
    bgColor: "bg-yellow-100",
    shape: "rounded-full",
  },
  {
    id: "03",
    title: "Fast Delivery",
    description: "Hot and fresh food delivered straight to your doorstep.",
    color: "#F79A19",
    bgColor: "bg-orange-100",
    shape:
      "rounded-tl-[100px] rounded-bl-[100px] rounded-tr-[50px] rounded-br-[50px]",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How it <span style={{ color: "#F79A19" }}>works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            It's about you and your family, having a comfortable payment,
            exceptional service and a lender.
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 relative flex justify-center md:justify-end"
            >
              <div className="relative">
                {/* Background Blob */}
                <div className="absolute -left-12 -top-12 w-64 h-64 bg-[#F79A19]/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -right-8 top-20 w-72 h-72 bg-[#FFE52A]/20 rounded-full blur-3xl -z-10"></div>

                {/* Number Background Shape  */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -left-32 md:-left-48 top-10 text-[120px] md:text-[200px] font-bold text-[#F79A19]/10 leading-none select-none z-0"
                >
                  01
                </motion.div>

                {/*  Card */}
                <div className="bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[280px] sm:w-[320px] relative z-10 border border-gray-50">
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                    <img
                      src="/3998.jpg"
                      alt="Delicious Meal"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-[#F79A19] shadow-sm">
                      $12.99
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          Special Chicken Biryani
                        </h4>
                        <p className="text-gray-500 text-sm">By Chef Ayesha</p>
                      </div>
                      <div className="flex items-center gap-1 text-[#F79A19] text-sm font-bold">
                        <span>★</span> 4.8
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      Freshly cooked with authentic spices and delivered hot.
                    </p>
                  </div>

                  <div className="h-10 w-full bg-[#F79A19] rounded-lg flex items-center justify-center text-white font-medium text-sm hover:bg-[#e08810] transition-colors cursor-pointer shadow-lg shadow-orange-200">
                    Choose Meal
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Meal
              </h3>
              <p className="text-gray-500 leading-relaxed text-lg max-w-md mx-auto md:mx-0">
                Browse through a variety of authentic homemade meals. We know
                your home is more than just a place to live, that's why we're
                committed to providing the best home loan.
              </p>
            </motion.div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 text-center md:text-left pl-0 md:pl-20"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Chef Cooks with Love
              </h3>
              <p className="text-gray-500 leading-relaxed text-lg max-w-md mx-auto md:mx-0">
                Local chefs prepare your order with fresh ingredients. It's the
                fast, easy way to apply for your mortgage and access your
                application anytime, anywhere.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 relative flex justify-center md:justify-start"
            >
              <div className="relative">
                {/* Background */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFE52A]/10 rounded-full -z-10 translate-x-1/4 -translate-y-1/4"></div>

                {/* Number  */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -right-32 md:-right-48 top-0 text-[120px] md:text-[200px] font-bold text-[#FFE52A]/20 leading-none select-none z-0"
                >
                  02
                </motion.div>

                {/* Card  */}
                <div className="bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[280px] sm:w-[320px] relative z-10 border border-gray-50">
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                    <img
                      src="/chef.jpg"
                      alt="Master Chef"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h4 className="text-white font-bold text-lg">
                        Chef Michael
                      </h4>
                      <p className="text-gray-200 text-xs text-white/80">
                        Expert in Italian Cuisine
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center flex-1 border-r border-gray-100">
                      <div className="text-lg font-bold text-gray-900">
                        120+
                      </div>
                      <div className="text-xs text-gray-400">Meals</div>
                    </div>
                    <div className="text-center flex-1 flex flex-col items-center border-r border-gray-100">
                      <div className="flex text-[#F79A19] font-bold">4.9 ★</div>
                      <div className="text-xs text-gray-400">Rating</div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-lg font-bold text-green-500">
                        Active
                      </div>
                      <div className="text-xs text-gray-400">Status</div>
                    </div>
                  </div>

                  <div className="h-10 w-full bg-white border border-[#FFE52A] text-gray-800 rounded-lg flex items-center justify-center font-medium text-sm hover:bg-[#FFE52A] hover:text-white transition-colors cursor-pointer">
                    View Profile
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 relative flex justify-center md:justify-end"
            >
              <div className="relative">
                {/* Background Shape */}
                <div className="absolute -bottom-10 -left-10 w-full h-full bg-[#F79A19]/10 rounded-t-full -z-10 scale-125"></div>

                {/* Number */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -left-32 md:-left-48 -top-16 text-[120px] md:text-[200px] font-bold text-gray-200 leading-none select-none z-0"
                >
                  03
                </motion.div>

                {/* Image */}
                <div className="w-[300px] h-[180px] rounded-t-[150px] bg-[#FFE52A]/30 backdrop-blur-sm relative flex items-end justify-center pb-8 border border-white/50 z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 shadow-lg flex items-center justify-center text-[#F79A19]">
                      <MapPin size={32} />
                    </div>
                    <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                      Tracking Order...
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Fast Delivery
              </h3>
              <p className="text-gray-500 leading-relaxed text-lg max-w-md mx-auto md:mx-0">
                Hot and fresh food delivered straight to your doorstep. It's
                about you and your family, having a comfortable payment,
                exceptional service and a lender.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
