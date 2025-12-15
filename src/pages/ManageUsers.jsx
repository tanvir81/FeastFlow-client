import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../firebase.init";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 🔑 get fresh ID token
        const token = await auth.currentUser.getIdToken(true);

        const res = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  // update role
  const handleRoleChange = async (id, role) => {
    try {
      const token = await auth.currentUser.getIdToken(true);

      await axios.patch(
        `http://localhost:3000/users/${id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Role updated to ${role}`);
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
    } catch {
      toast.error("Failed to update role");
    }
  };

  // Make fraud
  const handleMakeFraud = async (id) => {
    try {
      const token = await auth.currentUser.getIdToken(true);

      await axios.patch(
        `http://localhost:3000/users/${id}`,
        { status: "fraud" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User marked as fraud!");
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: "fraud" } : u))
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6 bg-gray-700 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-white">
              <td className="border p-2">
                {user.name || user.displayName || "N/A"}
              </td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 capitalize">{user.role || "user"}</td>
              <td className="border p-2 capitalize">
                <span
                  className={
                    user.status === "fraud"
                      ? "text-red-500 font-bold"
                      : "text-green-500"
                  }
                >
                  {user.status || "active"}
                </span>
              </td>
              <td className="border p-2 flex flex-wrap gap-2">
                <button
                  onClick={() => handleRoleChange(user._id, "user")}
                  className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 transition"
                >
                  User
                </button>
                <button
                  onClick={() => handleRoleChange(user._id, "chef")}
                  className="px-2 py-1 bg-green-600 rounded hover:bg-green-700 transition"
                >
                  Chef
                </button>
                <button
                  onClick={() => handleRoleChange(user._id, "admin")}
                  className="px-2 py-1 bg-red-600 rounded hover:bg-red-700 transition"
                >
                  Admin
                </button>

                {/* Make Fraud Button */}
                {user.role !== "admin" && user.status !== "fraud" && (
                  <button
                    onClick={() => handleMakeFraud(user._id)}
                    className="px-2 py-1 bg-orange-600 rounded hover:bg-orange-700 transition"
                  >
                    Make Fraud
                  </button>
                )}
                {user.status === "fraud" && (
                  <span className="px-2 py-1 bg-gray-500 rounded cursor-not-allowed">
                    Fraud
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
