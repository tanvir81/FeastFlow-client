import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, ChefHat } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Card 1: For Eaters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-base-100 p-8 md:p-12 rounded-3xl shadow-xl border border-base-200 relative overflow-hidden group hover:border-amber-glow-300 transition-colors"
          >
            <div className="relative z-10">
              <span className="bg-amber-glow-100 text-amber-glow-600 px-4 py-1 rounded-full text-sm font-bold mb-6 inline-block">
                For Foodies
              </span>
              <h3 className="text-3xl font-bold text-base-content mb-4 group-hover:text-amber-glow-500 transition-colors">
                Hungry for Something Real?
              </h3>
              <p className="text-base-content/70 mb-8 text-lg">
                Discover authentic home-cooked meals in your neighborhood. Order
                now and taste the love in every bite.
              </p>
              <Link
                to="/meals"
                className="inline-flex items-center gap-2 text-amber-glow-600 font-bold hover:gap-3 transition-all"
              >
                Order Now <ArrowRight size={20} />
              </Link>
            </div>
            {/* Abstract bg visual */}
            <div className="absolute right-0 bottom-0 opacity-5 dark:opacity-5 group-hover:scale-110 transition-transform duration-500">
              <ArrowRight size={200} />
            </div>
          </motion.div>

          {/* Card 2: For Chefs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 inline-block">
                For Chefs
              </span>
              <h3 className="text-3xl font-bold mb-4">
                Cook, Share, Earn.
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Turn your kitchen into a business. Join our community of home
                chefs and start sharing your culinary passion today.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-white font-bold bg-amber-glow-500 px-6 py-3 rounded-xl hover:bg-amber-glow-600 transition-colors shadow-lg"
              >
                Join as Chef <ChefHat size={20} />
              </Link>
            </div>
            {/* Abstract bg visual */}
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <ChefHat size={200} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
