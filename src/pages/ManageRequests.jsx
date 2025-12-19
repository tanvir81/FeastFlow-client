import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../firebase.init";
import { ClipboardList } from "lucide-react";
import Loading from "../components/Loading";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // get fresh ID token
        const token = await auth.currentUser.getIdToken(true);

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequests(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
    try {
      const token = await auth.currentUser.getIdToken(true);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/requests/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Request ${status}`);
      // refresh list
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch {
      toast.error("Failed to update request");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Manage Role Requests
        </h2>
        {loading ? (
          <Loading message="Loading role requests..." />
        ) : requests.length === 0 ? (
          <div className="text-center py-20">
            <ClipboardList size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No requests found.</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#FFE52A] border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Requested Role
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Request Time
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
                    {requests.map((req) => (
                      <tr
                        key={req._id}
                        className="hover:bg-[#FFA239] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {req.userImage ? (
                              <img
                                src={req.userImage}
                                alt={req.userName}
                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">
                                N/A
                              </div>
                            )}
                            <span className="font-medium text-gray-800">
                              {req.userName || "Unknown User"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{req.email}</td>
                        <td className="px-6 py-4 capitalize text-gray-700 font-medium">
                          {req.requestedRole}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {req.createdAt
                            ? new Date(req.createdAt).toLocaleString()
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 capitalize">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              req.status === "approved"
                                ? "bg-green-100 text-green-600"
                                : req.status === "rejected"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAction(req._id, "approved")}
                              disabled={req.status !== "pending"}
                              className={`px-3 py-1 rounded text-sm font-medium transition ${
                                req.status !== "pending"
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-green-600 text-white hover:bg-green-700"
                              }`}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(req._id, "rejected")}
                              disabled={req.status !== "pending"}
                              className={`px-3 py-1 rounded text-sm font-medium transition ${
                                req.status !== "pending"
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-red-600 text-white hover:bg-red-700"
                              }`}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/*  Cards */}
            <div className="md:hidden space-y-4">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      {req.userImage ? (
                        <img
                          src={req.userImage}
                          alt={req.userName}
                          className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">
                          N/A
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                          {req.userName || "Unknown User"}
                        </h3>
                        <p className="text-gray-500 text-sm break-all">
                          {req.email}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                        req.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : req.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <div className="mb-4 bg-gray-50 p-3 rounded-lg space-y-2">
                    <p className="text-sm text-gray-600">
                      Requested Role:{" "}
                      <span className="font-bold text-gray-800 capitalize">
                        {req.requestedRole}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Time:{" "}
                      <span className="font-medium text-gray-800">
                        {req.createdAt
                          ? new Date(req.createdAt).toLocaleString()
                          : "N/A"}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleAction(req._id, "approved")}
                      disabled={req.status !== "pending"}
                      className={`px-3 py-2 rounded-lg text-sm font-bold transition text-center ${
                        req.status !== "pending"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(req._id, "rejected")}
                      disabled={req.status !== "pending"}
                      className={`px-3 py-2 rounded-lg text-sm font-bold transition text-center ${
                        req.status !== "pending"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700 shadow-sm"
                      }`}
                    >
                      Reject
                    </button>
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
