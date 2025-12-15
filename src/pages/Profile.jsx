import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, userRole } = useAuth();

  const sendRoleRequest = async (requestedRole) => {
    try {
      const token = await auth.currentUser?.getIdToken();

      const res = await axios.post(
        "http://localhost:3000/requests",
        {
          email: user.email,
          requestedRole,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        toast.success(`Request to be ${requestedRole} sent!`);
      } else {
        toast.error(res.data?.error || "Failed to send request.");
      }
    } catch (err) {
      console.error("Role request error:", err);
      toast.error(err.response?.data?.error || "Failed to send request.");
    }
  };

  // Logic to determine what to show
  const displayName = user?.name || user?.displayName || "Anonymous";
  const displayImage =
    user?.profileImage ||
    user?.photoURL ||
    "https://i.ibb.co/default-avatar.png";
  const address = user?.address || "No address provided";

  return (
    <section className="max-w-lg mx-auto bg-gray-700 shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={displayImage}
          alt={displayName}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-500"
          onError={(e) => {
            e.target.src = "https://i.ibb.co/default-avatar.png";
          }}
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold">{displayName}</h2>
          <p className="text-sm text-gray-400">{user?.email}</p>
          <p className="text-sm text-gray-400 mt-1">
            <span className="font-bold">Role:</span> {userRole}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-gray-400">Status:</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-900/30 rounded-full border border-green-500/30">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-green-400 font-medium capitalize">
                {user?.status || "active"}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            <span className="font-bold">Address:</span> {address}
          </p>
        </div>
      </div>

      {userRole === "user" && (
        <div className="space-y-2 mt-4">
          <button
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => sendRoleRequest("chef")}
          >
            Request to be a Chef
          </button>
          <button
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={() => sendRoleRequest("admin")}
          >
            Request to be an Admin
          </button>
        </div>
      )}

      {userRole !== "user" && (
        <div className="mt-4 p-3 bg-gray-600 rounded text-center">
          <p className="text-sm text-gray-300">
            You are currently a{" "}
            <span className="font-bold capitalize">{userRole}</span>.
            <br />
            Role change requests are disabled.
          </p>
        </div>
      )}
    </section>
  );
}
