import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const displayImage =
    user?.profileImage ||
    user?.photoURL ||
    "https://i.ibb.co/default-avatar.png";
  const displayName = user?.name || user?.displayName || "User";

  return (
    <nav className="navbar sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar-start">
        {/* Mobile Hamburger */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2  rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/meals">Meals</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex flex-col items-center gap-0">
          <img
            src="/feast-flow.png?v=2"
            alt="FeastFlow Logo"
            className="w-14 h-14 object-contain"
          />
          <span className="text-xl font-bold text-[#F79A19]">FeastFlow</span>
        </NavLink>
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `border border-[#FFE52A] px-3 py-1 rounded ${
                  isActive
                    ? "text-[#FFE52A] font-bold"
                    : "text-gray-600 hover:text-[#F79A19]"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meals"
              className={({ isActive }) =>
                `border border-[#FFE52A] px-3 py-1 rounded ${
                  isActive
                    ? "text-[#FFE52A] font-bold"
                    : "text-gray-600 hover:text-[#F79A19]"
                }`
              }
            >
              Meals
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `border border-[#FFE52A] px-3 py-1 rounded ${
                    isActive
                      ? "text-[#FFE52A] font-bold"
                      : "text-gray-600 hover:text-[#F79A19]"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className="navbar-end">
        {!user ? (
          <>
            <NavLink
              to="/login"
              className="btn btn-sm bg-transparent border border-[#FFE52A] text-[#FFE52A] hover:bg-[#FFE52A] hover:text-white mr-2"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-sm bg-[#F79A19] border-none text-white hover:bg-[#e08912]"
            >
              Sign Up
            </NavLink>
          </>
        ) : (
          <>
            <button
              onClick={logout}
              className="btn btn-sm bg-transparent border border-[#FFE52A] text-[#FFE52A] hover:bg-[#FFE52A] hover:text-white mr-2"
            >
              Logout
            </button>
            <img
              src={displayImage}
              alt={displayName}
              className="w-9 h-9 rounded-full object-cover"
              title={user?.email}
              onError={(e) => {
                e.target.src = "https://i.ibb.co/default-avatar.png";
              }}
            />
          </>
        )}
      </div>
    </nav>
  );
}
