import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]"
        >
          {/* Image Grid Background */}
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-1">
            <div 
              className="col-span-2 row-span-2 bg-cover bg-center" 
              style={{ backgroundImage: "url('/Burger.jpg')" }} 
            />
            <div 
              className="hidden md:block bg-cover bg-center" 
              style={{ backgroundImage: "url('/cheeseburger.jpg')" }} 
            />
            <div 
              className="bg-cover bg-center" 
              style={{ backgroundImage: "url('/French fries.jpg')" }} 
            />
            <div 
              className="bg-cover bg-center" 
              style={{ backgroundImage: "url('/cheese pizza.jpg')" }} 
            />
            <div 
              className="hidden md:block bg-cover bg-center" 
              style={{ backgroundImage: "url('/crispy fried chicken.jpg')" }} 
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col justify-center h-full text-center text-white p-8 md:p-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join 15,000+ Food Lovers
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-10">
              Get weekly chef spotlights, exclusive discounts, and delicious
              recipes delivered straight to your inbox. No spam, just food love.
            </p>

            <form className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-glow-300 shadow-lg"
                />
              </div>
              <button
                type="button"
                className="bg-gray-900 text-white font-bold py-4 px-8 rounded-full hover:bg-black transition-colors shadow-lg"
              >
                Subscribe Now
              </button>
            </form>
            <p className="text-xs mt-4 opacity-70">
              By subscribing, you agree to our Terms & Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
