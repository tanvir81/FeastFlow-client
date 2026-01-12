import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../firebase.init";
import { Users } from "lucide-react";
import Loading from "../components/Loading";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // get fresh ID token
        const token = await auth.currentUser.getIdToken(true);

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // update role
  const handleRoleChange = async (id, role) => {
    try {
      const token = await auth.currentUser.getIdToken(true);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
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
        `${import.meta.env.VITE_API_URL}/users/${id}`,
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
    <section className="min-h-screen bg-base-100 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-base-content text-center">
          Manage Users
        </h2>

        {loading ? (
          <Loading message="Loading users..." />
        ) : users.length === 0 ? (
          <div className="text-center py-20">
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-base-content/60 text-lg">No users found.</p>
          </div>
        ) : (
          <>
            {/* Desktop View - Table */}
            <div className="hidden md:block bg-base-100 rounded-xl shadow-md overflow-hidden border border-base-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-amber-glow-300 border-b border-base-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-amber-glow-400 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-base-content">
                            {user.name || user.displayName || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-base-content/70">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 capitalize text-base-content">
                          {user.role || "user"}
                        </td>
                        <td className="px-6 py-4 capitalize">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                              user.status === "fraud"
                                ? "bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                                : "bg-green-100 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                            }`}
                          >
                            {user.status || "active"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleRoleChange(user._id, "user")}
                              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/50"
                            >
                              User
                            </button>
                            <button
                              onClick={() => handleRoleChange(user._id, "chef")}
                              className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800 dark:hover:bg-green-900/50"
                            >
                              Chef
                            </button>
                            <button
                              onClick={() =>
                                handleRoleChange(user._id, "admin")
                              }
                              className="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-100 transition border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800 dark:hover:bg-purple-900/50"
                            >
                              Admin
                            </button>

                            {/* Button */}
                            {user.role !== "admin" &&
                              user.status !== "fraud" && (
                                <button
                                  onClick={() => handleMakeFraud(user._id)}
                                  className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-100 transition border border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800 dark:hover:bg-orange-900/50"
                                >
                                  Make Fraud
                                </button>
                              )}
                            {user.status === "fraud" && (
                              <span className="px-3 py-1 bg-base-200 text-base-content/60 rounded-lg text-xs font-medium cursor-not-allowed border border-base-300">
                                Fraud Account
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/*Cards */}
            <div className="md:hidden space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-base-100 rounded-xl shadow-sm border border-base-200 p-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-base-content text-lg">
                        {user.name || user.displayName || "N/A"}
                      </h3>
                      <p className="text-base-content/60 text-sm">{user.email}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                        user.status === "fraud"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.status || "active"}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm text-base-content/60 uppercase tracking-wider font-semibold mr-2">
                      Role:
                    </span>
                    <span className="capitalize text-base-content font-medium">
                      {user.role || "user"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleRoleChange(user._id, "user")}
                      className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition text-center"
                    >
                      User
                    </button>
                    <button
                      onClick={() => handleRoleChange(user._id, "chef")}
                      className="px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition text-center"
                    >
                      Chef
                    </button>
                    <button
                      onClick={() => handleRoleChange(user._id, "admin")}
                      className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-100 transition text-center col-span-2"
                    >
                      Admin
                    </button>

                    {/* Make Fraud Button */}
                    {user.role !== "admin" && user.status !== "fraud" && (
                      <button
                        onClick={() => handleMakeFraud(user._id)}
                        className="px-3 py-2 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-100 transition text-center col-span-2"
                      >
                        Make Fraud
                      </button>
                    )}
                    {user.status === "fraud" && (
                      <div className="px-3 py-2 bg-gray-100 text-base-content/60 rounded-lg text-xs font-medium cursor-not-allowed text-center col-span-2 flex items-center justify-center">
                        Fraud Account
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
