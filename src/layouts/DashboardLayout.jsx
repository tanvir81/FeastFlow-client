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

  // Shared classes for sidebar links
  const linkClasses =
    "flex items-center gap-3 px-3 py-2 rounded font-medium hover:bg-yellow-100 transition-colors";

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
      {/* Sidebar - White BG, Black Text */}
      <aside className="border-r bg-white text-black">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src={
                user?.profileImage ||
                user?.photoURL ||
                "https://i.ibb.co/default-avatar.png"
              }
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div className="overflow-hidden">
              <p className="font-semibold truncate">
                {user?.name || user?.displayName || "Guest"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
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
          <NavLink to="/" className={linkClasses}>
            <LuHouse className="text-xl" />
            Home
          </NavLink>

          <hr className="border-gray-200 my-2" />

          {/* Profile */}
          <NavLink to="/dashboard/profile" className={linkClasses}>
            <LuUser className="text-xl" />
            Profile
          </NavLink>

          {userRole === "user" && (
            <>
              <NavLink to="/dashboard/orders" className={linkClasses}>
                <LuShoppingBag className="text-xl" />
                My Orders
              </NavLink>
              <Link to="/dashboard/my-review" className={linkClasses}>
                <LuStar className="text-xl" />
                My Review
              </Link>
              <NavLink to="/dashboard/favorites" className={linkClasses}>
                <LuHeart className="text-xl" />
                Favorite Meals
              </NavLink>
            </>
          )}

          {userRole === "chef" && (
            <>
              <NavLink to="/dashboard/create-meal" className={linkClasses}>
                <LuUtensils className="text-xl" />
                Create Meal
              </NavLink>
              <NavLink to="/dashboard/my-meals" className={linkClasses}>
                <LuList className="text-xl" />
                My Meals
              </NavLink>
              <NavLink to="/dashboard/order-requests" className={linkClasses}>
                <LuClipboardList className="text-xl" />
                Order Requests
              </NavLink>
            </>
          )}

          {userRole === "admin" && (
            <>
              <NavLink to="/dashboard/manage-users" className={linkClasses}>
                <LuUsers className="text-xl" />
                Manage Users
              </NavLink>
              <NavLink to="/dashboard/manage-requests" className={linkClasses}>
                <LuListTodo className="text-xl" />
                Manage Requests
              </NavLink>
              <NavLink to="/dashboard/statistics" className={linkClasses}>
                <LuChartPie className="text-xl" />
                Statistics
              </NavLink>
            </>
          )}

          <div className="pt-4 mt-auto">
            <button
              onClick={logout}
              className={`w-full ${linkClasses} bg-gray-100 hover:bg-yellow-200 justify-start`}
            >
              <LuLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="bg-gray-50">
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <span className="text-sm text-gray-600">{user?.email}</span>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
