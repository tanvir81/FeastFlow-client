import { useAuth } from "../context/AuthContext";
import axiosInstance from "../hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const OrderRequests = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch orders for this chef
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["chefOrders", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get("/chef-orders");
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation for updating order status
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosInstance.patch(`/orders/${id}`, { status });
    },
    onSuccess: () => {
      toast.success("Order status updated!");
      queryClient.invalidateQueries(["chefOrders", user?.email]);
    },
    onError: (err) =>
      toast.error(err?.response?.data?.error || "Failed to update order."),
  });

  if (isLoading) return <Loading message="Loading orders..." />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error?.message || "Failed to fetch orders"}
      </div>
    );

  // Helper for Chef ID Badge
  const getChefBadge = (name, id) => {
    const n = (name || "Unknown").slice(0, 3).toUpperCase();
    const i = (id || "0000").slice(0, 4).toUpperCase();
    return `${n}-${i}`;
  };

  // Helper for Status Color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20";
      case "accepted":
        return "bg-blue-500 text-white border-blue-600 shadow-md shadow-blue-500/20";
      case "delivered":
        return "bg-green-500 text-white border-green-600 shadow-md shadow-green-500/20";
      case "cancelled":
        return "bg-red-500 text-white border-red-600 shadow-md shadow-red-500/20";
      default:
        return "bg-base-300 text-base-content border-base-content/20";
    }
  };

  return (
    <section className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-base-content">Order Requests</h2>
          <span className="bg-base-100 px-4 py-1 rounded-full text-sm font-medium text-base-content/60 shadow-sm border">
            Total Orders: {orders.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-base-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-base-content mb-1 line-clamp-1">
                    {order.mealName}
                  </h3>
                   <span className="text-xs font-bold font-mono bg-base-300 dark:bg-base-700 text-base-content px-2 py-1 rounded border border-base-content/20 shadow-sm">
                    {getChefBadge(user?.displayName, order.chefId)}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border whitespace-nowrap ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  Status: {order.orderStatus}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm text-base-content/70 flex-1">
                <div className="flex justify-between border-b pb-2 border-gray-50">
                  <span>Price:</span>
                  <span className="font-bold text-base-content">
                    ${order.price} x {order.quantity}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2 border-gray-50">
                   <span>Total:</span>
                   <span className="font-bold text-green-600 text-lg">${(order.price * order.quantity).toFixed(2)}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-xs uppercase mb-1">
                    Customer
                  </span>
                  <p className="font-medium text-base-content truncate" title={order.userEmail}>
                    {order.userEmail}
                  </p>
                  <p className="truncate text-base-content/60" title={order.userAddress}>
                    {order.userAddress}
                  </p>
                </div>
                <div className="flex justify-between items-center bg-base-200/50 p-3 rounded-lg border border-base-300 mt-2">
                    <span className="text-sm font-medium">Payment Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-md ${
                      order.paymentStatus?.toLowerCase() === 'paid' 
                      ? 'bg-green-500 text-white border-green-600 shadow-green-500/20' 
                      : 'bg-amber-500 text-white border-amber-600 shadow-amber-500/20'
                    }`}>
                        {order.paymentStatus || 'Pending'}
                    </span>
                </div>
                <p className="text-xs text-gray-400 text-right">
                  {new Date(order.orderTime).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-base-200">
                {/* Cancel Button - Only if status is pending */}
                {order.orderStatus === "pending" && (
                  <button
                    onClick={() =>
                      updateOrderStatus.mutate({
                        id: order._id,
                        status: "cancelled",
                      })
                    }
                    className="px-4 py-3 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5"
                  >
                    Cancel
                  </button>
                )}

                {/* Accept Button - Only if status is pending */}
                {order.orderStatus === "pending" && (
                  <button
                    onClick={() =>
                      updateOrderStatus.mutate({
                        id: order._id,
                        status: "accepted",
                      })
                    }
                    className="px-4 py-3 rounded-xl text-sm font-bold bg-amber-glow-500 hover:bg-amber-glow-600 text-white shadow-lg shadow-amber-glow-500/30 transition-all hover:-translate-y-0.5"
                  >
                    Accept
                  </button>
                )}

                {/* Deliver Button - Only if accepted AND paid */}
                {order.orderStatus === "accepted" && (
                  <button
                    disabled={order.paymentStatus?.toLowerCase() !== "paid"}
                    onClick={() =>
                      updateOrderStatus.mutate({
                        id: order._id,
                        status: "delivered",
                      })
                    }
                    className="col-span-2 w-full px-4 py-3 rounded-xl text-sm font-bold bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/30 hover:-translate-y-0.5"
                  >
                    {order.paymentStatus?.toLowerCase() === "paid"
                      ? "Mark as Delivered"
                      : "Waiting for Payment"}
                  </button>
                )}
                
                 {/* Delivered Status - Show completion */}
                 {order.orderStatus === "delivered" && (
                    <div className="col-span-2 w-full text-center py-3 text-white font-bold bg-green-500 rounded-xl shadow-md">
                        ✅ Order Completed
                    </div>
                 )}
                 
                 {/* Cancelled Status */}
                 {order.orderStatus === "cancelled" && (
                    <div className="col-span-2 w-full text-center py-3 text-white font-bold bg-red-500 rounded-xl shadow-md">
                        ❌ Order Cancelled
                    </div>
                 )}
              </div>
            </div>
          ))}
          
           {orders.length === 0 && (
            <div className="col-span-full text-center py-20 bg-base-100 rounded-xl border-dashed border-2 border-base-200">
                <p className="text-gray-400 text-lg">No order requests yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderRequests;
