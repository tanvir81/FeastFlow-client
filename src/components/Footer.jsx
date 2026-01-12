import React from "react";
import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/fest-flow.png"
              alt="FeastFlow Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-glow-400 to-amber-glow-600 bg-clip-text text-transparent">
              FeastFlow
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Connecting home chefs with food lovers. Experience the magic of authentic home cooking delivered to your doorstep.
          </p>
          <div className="flex gap-4 pt-2">
            <Link
              to="https://facebook.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-glow-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <Facebook size={20} />
            </Link>
            <Link
              to="https://twitter.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-glow-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <Twitter size={20} />
            </Link>
            <Link
              to="https://instagram.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-glow-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <Instagram size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-glow-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Our Meals", path: "/meals" },
              { name: "Featured Chefs", path: "/meals" }, // Redirects to meals for now as chefs are featured there
              { name: "Blog", path: "/blog" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-gray-400 hover:text-amber-glow-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-glow-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Legal */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
            Support
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-glow-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Help Center", path: "/help" },
              { name: "Terms of Service", path: "/terms" },
              { name: "Privacy Policy", path: "/privacy" },
   
              { name: "Become a Chef", path: "/register" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-gray-400 hover:text-amber-glow-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-glow-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
            Contact Us
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-glow-500 rounded-full"></span>
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-gray-400">
              <MapPin className="text-amber-glow-500 shrink-0 mt-1" size={18} />
              <span>123 Foodie Lane, Culinary District, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Phone className="text-amber-glow-500 shrink-0" size={18} />
              <span>+880 123 456 7890</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Mail className="text-amber-glow-500 shrink-0" size={18} />
              <span>support@feastflow.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 pt-8 mt-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FeastFlow. All rights reserved. | Build: 2026-01-12 14:47
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-amber-glow-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-amber-glow-400 transition-colors">Terms</Link>
            <Link to="#" className="hover:text-amber-glow-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
