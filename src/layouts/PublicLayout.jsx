import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      <Footer />
    </div>
  );
}
