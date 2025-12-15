import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../firebase.init";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);

  // fetch all requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // get fresh ID token
        const token = await auth.currentUser.getIdToken(true);

        const res = await axios.get("http://localhost:3000/requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequests(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load requests");
      }
    };

    fetchRequests();
  }, []);

  // approve or reject request
  const handleAction = async (id, status) => {
    try {
      const token = await auth.currentUser.getIdToken(true);

      await axios.patch(
        `http://localhost:3000/requests/${id}`,
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
    <section className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Manage Role Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <div className="flex items-center gap-3">
                {req.userImage && (
                  <img
                    src={req.userImage}
                    alt={req.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">
                    {req.userName || "Unknown User"}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      ({req.email})
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Requested:{" "}
                    <span className="font-bold">{req.requestedRole}</span> |
                    Status:{" "}
                    <span
                      className={`font-bold capitalize ${
                        req.status === "approved"
                          ? "text-green-600"
                          : req.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(req._id, "approved")}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(req._id, "rejected")}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
