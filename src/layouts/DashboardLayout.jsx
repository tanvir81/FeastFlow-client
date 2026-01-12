import { Link, NavLink, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  LuHouse,
  LuUser,
  LuShoppingBag,
  LuStar,
  LuHeart,
  LuUtensils,
  LuList,
  LuClipboardList,
  LuUsers,
  LuListTodo,
  LuChartPie,
  LuLogOut,
} from "react-icons/lu";

export default function DashboardLayout() {
  const { user, userRole, logout } = useAuth();

  // classes for sidebar links
  const getLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded font-medium transition-colors ${
      isActive
        ? "bg-amber-glow-500 text-white shadow-md"
        : "text-base-content hover:bg-amber-glow-300 hover:text-gray-900 dark:hover:text-gray-900"
    }`;

  const logoutClasses =
    "flex items-center gap-3 px-3 py-2 rounded font-medium transition-colors text-base-content hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400";

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr] bg-base-100">
      {/* Sidebar */}
      <aside className="border-r border-base-200 bg-base-100 text-base-content">
        <div className="p-4 border-b border-base-200">
          <div className="flex items-center gap-3">
            <img
              src={
                user?.profileImage ||
                user?.photoURL ||
                "https://i.ibb.co/default-avatar.png"
              }
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border border-base-300"
            />
            <div className="overflow-hidden">
              <p className="font-semibold truncate">
                {user?.name || user?.displayName || "Guest"}
              </p>
              <p className="text-xs text-base-content/70 capitalize">
                {userRole || "user"}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-xs text-green-600 font-medium capitalize">
                  {user?.status || "active"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {/*  Home Button */}
          <NavLink to="/" className={getLinkClasses}>
            <LuHouse className="text-xl" />
            Home
          </NavLink>

          <hr className="border-base-200 my-2" />

          {/* Profile */}
          <NavLink to="/dashboard/profile" className={getLinkClasses}>
            <LuUser className="text-xl" />
            Profile
          </NavLink>

          {userRole === "user" && (
            <>
              <NavLink to="/dashboard/orders" className={getLinkClasses}>
                <LuShoppingBag className="text-xl" />
                My Orders
              </NavLink>
              <NavLink to="/dashboard/my-review" className={getLinkClasses}>
                <LuStar className="text-xl" />
                My Review
              </NavLink>
              <NavLink to="/dashboard/favorites" className={getLinkClasses}>
                <LuHeart className="text-xl" />
                Favorite Meals
              </NavLink>
            </>
          )}

          {userRole === "chef" && (
            <>
              <NavLink to="/dashboard/create-meal" className={getLinkClasses}>
                <LuUtensils className="text-xl" />
                Create Meal
              </NavLink>
              <NavLink to="/dashboard/my-meals" className={getLinkClasses}>
                <LuList className="text-xl" />
                My Meals
              </NavLink>
              <NavLink
                to="/dashboard/order-requests"
                className={getLinkClasses}
              >
                <LuClipboardList className="text-xl" />
                Order Requests
              </NavLink>
            </>
          )}

          {userRole === "admin" && (
            <>
              <NavLink to="/dashboard/manage-users" className={getLinkClasses}>
                <LuUsers className="text-xl" />
                Manage Users
              </NavLink>
              <NavLink
                to="/dashboard/manage-requests"
                className={getLinkClasses}
              >
                <LuListTodo className="text-xl" />
                Manage Requests
              </NavLink>
              <NavLink to="/dashboard/statistics" className={getLinkClasses}>
                <LuChartPie className="text-xl" />
                Statistics
              </NavLink>
            </>
          )}

          <div className="pt-4 mt-auto">
            <button
              onClick={logout}
              className={`w-full ${logoutClasses} justify-start`}
            >
              <LuLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="bg-base-200">
        <div className="flex items-center justify-between p-4 border-b border-base-200 bg-base-100">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <span className="text-sm text-base-content/70">{user?.email}</span>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
