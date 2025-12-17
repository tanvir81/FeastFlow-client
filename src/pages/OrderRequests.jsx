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
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Order Requests</h2>
          <span className="bg-white px-4 py-1 rounded-full text-sm font-medium text-gray-500 shadow-sm border">
            Total Orders: {orders.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                    {order.mealName}
                  </h3>
                   <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded border">
                    {getChefBadge(user?.displayName, order.chefId)}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm text-gray-600 flex-1">
                <div className="flex justify-between border-b pb-2 border-gray-50">
                  <span>Price:</span>
                  <span className="font-bold text-gray-800">
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
                  <p className="font-medium text-gray-800 truncate" title={order.userEmail}>
                    {order.userEmail}
                  </p>
                  <p className="truncate text-gray-500" title={order.userAddress}>
                    {order.userAddress}
                  </p>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="text-xs">Payment:</span>
                    <span className={`font-bold text-xs ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-500'}`}>
                        {order.paymentStatus || 'Pending'}
                    </span>
                </div>
                <p className="text-xs text-gray-400 text-right">
                  {new Date(order.orderTime).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-100">
                <button
                  disabled={order.orderStatus !== "pending"}
                  onClick={() =>
                    updateOrderStatus.mutate({
                      id: order._id,
                      status: "cancelled",
                    })
                  }
                  className="px-2 py-2 rounded-lg text-sm font-bold border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={order.orderStatus !== "pending"}
                  onClick={() =>
                    updateOrderStatus.mutate({
                      id: order._id,
                      status: "accepted",
                    })
                  }
                  className="px-2 py-2 rounded-lg text-sm font-bold bg-[#FFE52A] hover:bg-[#FFA239] text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  Accept
                </button>
                <button
                  disabled={
                    order.orderStatus !== "accepted" ||
                    order.paymentStatus?.toLowerCase() !== "paid"
                  }
                  onClick={() =>
                    updateOrderStatus.mutate({
                      id: order._id,
                      status: "delivered",
                    })
                  }
                  className="px-2 py-2 rounded-lg text-sm font-bold bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  Deliver
                </button>
              </div>
            </div>
          ))}
          
           {orders.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border-dashed border-2 border-gray-200">
                <p className="text-gray-400 text-lg">No order requests yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderRequests;
