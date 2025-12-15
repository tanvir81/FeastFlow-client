import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer*/}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} FeastFlow — Order. Enjoy. Repeat.
      </footer>
    </div>
  );
}
