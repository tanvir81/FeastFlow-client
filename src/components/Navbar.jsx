import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const displayImage =
    user?.profileImage ||
    user?.photoURL ||
    "https://i.ibb.co/default-avatar.png";
  const displayName = user?.name || user?.displayName || "User";

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md font-sans">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Brand / Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 group relative z-10"
          >
            <motion.img
              whileHover={{ rotate: 10 }}
              src="/fest-flow.png"
              alt="FeastFlow Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <span className="text-xl sm:text-2xl font-bold text-[#F79A19] tracking-tight group-hover:text-[#e08912] transition-colors">
              FeastFlow
            </span>
          </NavLink>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#F79A19] font-bold border-b-2 border-[#F79A19]"
                      : "text-gray-600 hover:text-[#F79A19]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3 relative z-10">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="text-sm font-semibold text-[#F79A19] hover:text-[#e08912] px-3 py-2 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-[#F79A19] text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[#e08912] transition shadow-md hover:shadow-lg"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={logout}
                  className="text-sm font-semibold text-gray-500 hover:text-red-500 transition"
                >
                  Logout
                </button>
                <div className="tooltip tooltip-bottom" data-tip={displayName}>
                  <img
                    src={displayImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-[#FFE52A] object-cover"
                    onError={(e) => {
                      e.target.src = "https://i.ibb.co/default-avatar.png";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-[#F79A19] focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block w-full text-center px-3 py-3 rounded-lg text-base font-medium ${
                      isActive
                        ? "bg-orange-50 text-[#F79A19]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#F79A19]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="w-full h-px bg-gray-100 my-2"></div>

              {!user ? (
                <div className="flex flex-col w-full gap-3 px-2">
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center border border-[#F79A19] text-[#F79A19] font-semibold py-2 rounded-lg hover:bg-orange-50 transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center bg-[#F79A19] text-white font-bold py-2 rounded-lg hover:bg-[#e08912] transition shadow-sm"
                  >
                    Sign Up
                  </NavLink>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={displayImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border border-gray-200"
                    />
                    <span className="font-semibold text-gray-800">
                      {displayName}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-red-500 font-medium hover:text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
