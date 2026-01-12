import { motion } from "framer-motion";
import { Search, ShoppingBag, CreditCard, RotateCcw, UserCircle, MessageCircle } from "lucide-react";
import AccordionSection from "../components/home/AccordionSection";

export default function HelpSupport() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Search */}
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-glow-500/20 to-purple-500/20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            How can we help needed?
          </motion.h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search help articles (e.g. 'refund policy')..."
              className="w-full py-4 pl-12 pr-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-amber-glow-500/30 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShoppingBag, title: "Orders & Delivery", desc: "Track, cancel, or report issues" },
              { icon: CreditCard, title: "Payments & Billling", desc: "Methods, charges, and refunds" },
              { icon: UserCircle, title: "Account Settings", desc: "Profile, password, and preferences" },
              { icon: RotateCcw, title: "Returns & Refunds", desc: "Policies and status checks" },
              { icon: MessageCircle, title: "Chef Support", desc: "For our partner chefs" },
            ].map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-base-200 p-8 rounded-2xl hover:bg-amber-glow-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
              >
                <cat.icon size={32} className="text-amber-glow-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-base-content/70 text-sm">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs (Reusing Accordion) */}
      <section className="bg-base-200 py-10">
        <AccordionSection />
      </section>

      {/* Still Need Help */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-base-content/70 mb-8">Our support team is just a click away.</p>
          <a href="/contact" className="bg-amber-glow-500 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-glow-600 transition-colors">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
