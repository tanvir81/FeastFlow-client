import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  LayoutDashboard,
  User,
  ShoppingBag,
  Star,
  Heart,
  Utensils,
  Plus,
  ClipboardList,
  Users as UsersIcon,
  ListChecks,
  BarChart,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const { user, logout, userRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const profileMenuRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isProfileMenuOpen]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Get menu items based on user role
  const getProfileMenuItems = () => {
    const baseItems = [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/dashboard",
      },
      { icon: User, label: "My Profile", path: "/dashboard/profile" },
      { icon: Star, label: "My Reviews", path: "/dashboard/my-review" },
      { icon: Heart, label: "Favorites", path: "/dashboard/favorites" },
    ];

    if (userRole === "user") {
      return [
        ...baseItems,
        { icon: ShoppingBag, label: "My Orders", path: "/dashboard/orders" },
      ];
    }

    if (userRole === "chef") {
      return [
        ...baseItems,
        { icon: Utensils, label: "My Meals", path: "/dashboard/my-meals" },
        {
          icon: Plus,
          label: "Create Meal",
          path: "/dashboard/create-meal",
        },
        {
          icon: ClipboardList,
          label: "Order Requests",
          path: "/dashboard/order-requests",
        },
      ];
    }

    if (userRole === "admin") {
      return [
        ...baseItems,
        {
          icon: UsersIcon,
          label: "Manage Users",
          path: "/dashboard/manage-users",
        },
        {
          icon: ListChecks,
          label: "Manage Requests",
          path: "/dashboard/manage-requests",
        },
        {
          icon: BarChart,
          label: "Statistics",
          path: "/dashboard/statistics",
        },
      ];
    }

    return baseItems;
  };

  const displayImage =
    user?.profileImage ||
    user?.photoURL ||
    "https://i.ibb.co/default-avatar.png";
  const displayName = user?.name || user?.displayName || "User";

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-md font-sans border-b border-base-200">
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
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
            <span className="text-xl sm:text-2xl font-serif font-bold text-amber-glow-500 tracking-tight group-hover:text-amber-glow-600 transition-colors">
              FeastFlow
            </span>
          </NavLink>

          {/* Desktop Menu  */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8 font-sans">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-amber-glow-500 font-bold border-b-2 border-amber-glow-500"
                      : "text-gray-600 hover:text-amber-glow-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3 relative z-10">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-base-200 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon size={20} className="text-gray-600" />
              ) : (
                <Sun size={20} className="text-gray-300" />
              )}
            </button>

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="text-sm font-semibold text-amber-glow-500 hover:text-amber-glow-600 px-3 py-2 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-amber-glow-500 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-amber-glow-600 transition shadow-md hover:shadow-lg"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={displayImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-amber-glow-300 object-cover"
                    onError={(e) => {
                      e.target.src = "https://i.ibb.co/default-avatar.png";
                    }}
                  />
                  <ChevronDown
                    size={16}
                    className={`text-base-content transition-transform ${
                      isProfileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-14 w-72 bg-base-100 border border-base-200 rounded-2xl shadow-2xl overflow-hidden z-50 font-sans"
                    >
                      {/* User Info Section */}
                      <div className="bg-gradient-to-r from-amber-glow-500 to-amber-glow-600 p-4 text-white">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={displayImage}
                            alt="Profile"
                            className="w-12 h-12 rounded-full border-2 border-white object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://i.ibb.co/default-avatar.png";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate">
                              {displayName}
                            </p>
                            <p className="text-xs opacity-90 truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              userRole === "admin"
                                ? "bg-purple-100 text-purple-700"
                                : userRole === "chef"
                                ? "bg-white/20 text-white"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {userRole?.charAt(0).toUpperCase() +
                              userRole?.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {getProfileMenuItems().map((item, index) => (
                          <NavLink
                            key={index}
                            to={item.path}
                            onClick={() => setIsProfileMenuOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-2.5 hover:bg-amber-glow-50 dark:hover:bg-amber-glow-900/20 transition-colors ${
                                isActive
                                  ? "bg-amber-glow-100 dark:bg-amber-glow-900/30 text-amber-glow-600"
                                  : "text-base-content"
                              }`
                            }
                          >
                            <item.icon size={18} />
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          </NavLink>
                        ))}
                      </div>

                      {/* Theme Toggle */}
                      <div className="border-t border-base-200 py-2">
                        <button
                          onClick={toggleTheme}
                          className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-amber-glow-50 dark:hover:bg-amber-glow-900/20 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {theme === "light" ? (
                              <Moon size={18} className="text-base-content" />
                            ) : (
                              <Sun size={18} className="text-base-content" />
                            )}
                            <span className="text-sm font-medium text-base-content">
                              {theme === "light" ? "Dark Mode" : "Light Mode"}
                            </span>
                          </div>
                          <div
                            className={`w-10 h-5 rounded-full transition-colors ${
                              theme === "dark"
                                ? "bg-amber-glow-500"
                                : "bg-gray-300"
                            } relative`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                                theme === "dark"
                                  ? "translate-x-5"
                                  : "translate-x-0.5"
                              }`}
                            />
                          </div>
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-base-200 py-2">
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                        >
                          <LogOut size={18} />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-base-200 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon size={20} className="text-gray-600" />
              ) : (
                <Sun size={20} className="text-gray-300" />
              )}
            </button>
            
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-amber-glow-500 focus:outline-none p-2"
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
            className="md:hidden bg-base-100 border-t border-base-200 overflow-hidden shadow-lg"
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
                        ? "bg-amber-glow-50 dark:bg-amber-glow-900/20 text-amber-glow-500"
                        : "text-base-content hover:bg-base-200 hover:text-amber-glow-500"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="w-full h-px bg-base-200 my-2"></div>

              {!user ? (
                <div className="flex flex-col w-full gap-3 px-2">
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center border border-amber-glow-500 text-amber-glow-500 font-semibold py-2 rounded-lg hover:bg-amber-glow-50 transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center bg-amber-glow-500 text-white font-bold py-2 rounded-lg hover:bg-amber-glow-600 transition shadow-sm"
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
                      className="w-10 h-10 rounded-full border border-base-300"
                    />
                    <span className="font-semibold text-base-content">
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
