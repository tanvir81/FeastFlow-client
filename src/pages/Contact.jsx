import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-glow-500 to-amber-glow-600 py-20">
        <div className="container mx-auto px-6 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get in Touch
          </motion.h1>
          <p className="text-xl opacity-90">
            We'd love to hear from you. Here's how you can reach us.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold text-base-content mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-base-200 rounded-2xl">
                    <div className="bg-amber-glow-100 p-3 rounded-full text-amber-glow-600">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Our Office</h3>
                      <p className="text-base-content/70">
                        123 Foodie Lane, Culinary District<br/>
                        Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-base-200 rounded-2xl">
                    <div className="bg-amber-glow-100 p-3 rounded-full text-amber-glow-600">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email Us</h3>
                      <p className="text-base-content/70">support@feastflow.com</p>
                      <p className="text-base-content/70">partners@feastflow.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-base-200 rounded-2xl">
                    <div className="bg-amber-glow-100 p-3 rounded-full text-amber-glow-600">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Call Us</h3>
                      <p className="text-base-content/70">+880 123 456 7890</p>
                      <p className="text-sm text-base-content/50 mt-1">Mon-Fri from 8am to 5pm</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-base-100 border border-base-200 shadow-xl rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-base-200 border-transparent focus:border-amber-glow-500 focus:bg-base-100 focus:ring-0 transition-colors" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-base-200 border-transparent focus:border-amber-glow-500 focus:bg-base-100 focus:ring-0 transition-colors" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-base-200 border-transparent focus:border-amber-glow-500 focus:bg-base-100 focus:ring-0 transition-colors" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-base-200 border-transparent focus:border-amber-glow-500 focus:bg-base-100 focus:ring-0 transition-colors">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Become a Partner</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-base-200 border-transparent focus:border-amber-glow-500 focus:bg-base-100 focus:ring-0 transition-colors" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="w-full bg-amber-glow-500 text-white font-bold py-4 rounded-xl hover:bg-amber-glow-600 transition-colors flex items-center justify-center gap-2">
                  Send Message <Send size={20} />
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
