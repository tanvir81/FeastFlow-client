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

        const res = await axios.get("http://localhost:3000/users", {
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
    <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Manage Users
        </h2>

        {loading ? (
          <Loading message="Loading users..." />
        ) : users.length === 0 ? (
          <div className="text-center py-20">
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No users found.</p>
          </div>
        ) : (
          <>
            {/* Desktop View - Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#FFE52A] border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-[#FFA239] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-800">
                            {user.name || user.displayName || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 capitalize text-gray-700">
                          {user.role || "user"}
                        </td>
                        <td className="px-6 py-4 capitalize">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              user.status === "fraud"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {user.status || "active"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleRoleChange(user._id, "user")}
                              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
                            >
                              User
                            </button>
                            <button
                              onClick={() => handleRoleChange(user._id, "chef")}
                              className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition"
                            >
                              Chef
                            </button>
                            <button
                              onClick={() =>
                                handleRoleChange(user._id, "admin")
                              }
                              className="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-100 transition"
                            >
                              Admin
                            </button>

                            {/* Button */}
                            {user.role !== "admin" &&
                              user.status !== "fraud" && (
                                <button
                                  onClick={() => handleMakeFraud(user._id)}
                                  className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-100 transition"
                                >
                                  Make Fraud
                                </button>
                              )}
                            {user.status === "fraud" && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium cursor-not-allowed">
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
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {user.name || user.displayName || "N/A"}
                      </h3>
                      <p className="text-gray-500 text-sm">{user.email}</p>
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
                    <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold mr-2">
                      Role:
                    </span>
                    <span className="capitalize text-gray-700 font-medium">
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
                      <div className="px-3 py-2 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium cursor-not-allowed text-center col-span-2 flex items-center justify-center">
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
