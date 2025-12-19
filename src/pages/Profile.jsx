import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  MapPin,
  Shield,
  Star,
  Hash,
  CheckCircle,
  AlertOctagon,
} from "lucide-react";

export default function Profile() {
  const { user, userRole } = useAuth();

  console.log("Profile User Data:", user);

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

  // Prefer user.address from DB
  const address = user?.address || "No address provided";

  // Chef ID Generation: 1st 3 chars of Name + First 4 chars of ID
  const generateChefId = () => {
    if (!user?._id && !user?.uid) return "N/A";
    const idSource = user.uid || user._id;
    const namePart = displayName.replace(/\s/g, "").slice(0, 3).toUpperCase();
    const idPart = idSource.slice(0, 4).toUpperCase();
    return `${namePart}${idPart}`;
  };

  const chefId = generateChefId();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header / Banner */}
          <div className="bg-gradient-to-r from-[#F79A19] to-[#FF6B6B] h-32 relative">
            <div className="absolute -bottom-12 left-8">
              <img
                src={displayImage}
                alt={displayName}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-white"
                onError={(e) => {
                  e.target.src = "https://i.ibb.co/default-avatar.png";
                }}
              />
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            {/* Name & Email */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {displayName}
                </h2>
                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <Mail size={16} />
                  <span>{user?.email}</span>
                </div>
              </div>
              <div
                className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize border ${
                  userRole === "admin"
                    ? "bg-purple-100 border-purple-200 text-purple-600"
                    : userRole === "chef"
                    ? "bg-orange-100 border-orange-200 text-orange-600"
                    : "bg-blue-100 border-blue-200 text-blue-600"
                }`}
              >
                {userRole}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Status Card */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm uppercase tracking-wider font-semibold">
                  <Shield size={16} />
                  <span>Account Status</span>
                </div>
                <div className="flex items-center gap-2">
                  {user?.status === "fraud" ? (
                    <>
                      <AlertOctagon className="text-red-500" size={20} />
                      <span className="text-red-500 font-bold capitalize">
                        {user?.status || "Unknown"}
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="text-green-500 font-bold capitalize">
                        {user?.status || "Active"}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Chef ID (Only for Chefs) */}
              {userRole === "chef" && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm uppercase tracking-wider font-semibold">
                    <Hash size={16} />
                    <span>Chef ID</span>
                  </div>
                  <div className="font-mono text-xl text-[#F79A19] tracking-widest">
                    {chefId}
                  </div>
                </div>
              )}
            </div>

            {/* Address Section */}
            <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm uppercase tracking-wider font-semibold">
                <MapPin size={16} />
                <span>User Address</span>
              </div>
              <p className="text-gray-700 font-medium">{address}</p>
            </div>

            {/* Role Request Buttons */}
            {userRole !== "admin" && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  {userRole === "chef"
                    ? "Want to become an Admin?"
                    : "Want to become a Chef or Admin?"}
                </h4>
                <div className="flex gap-4 flex-col sm:flex-row">
                  {userRole === "user" && (
                    <button
                      onClick={() => sendRoleRequest("chef")}
                      className="flex-1 bg-[#F79A19] hover:bg-[#e08914] text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Star size={18} />
                      Request to be Chef
                    </button>
                  )}
                  <button
                    onClick={() => sendRoleRequest("admin")}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Shield size={18} />
                    Request to be Admin
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
