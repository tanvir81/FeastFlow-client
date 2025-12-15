import { useAuth } from "../context/AuthContext";
import axiosInstance from "../hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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

  if (isLoading)
    return <div className="text-center py-10">Loading orders...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error?.message || "Failed to fetch orders"}
      </div>
    );

  return (
    <section className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Order Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded p-4 shadow bg-gray-700"
          >
            <h3 className="text-xl font-semibold">{order.mealName}</h3>
            <p>Price: ${order.price}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Status: {order.orderStatus}</p> {/* ✅ use orderStatus */}
            <p>User Email: {order.userEmail}</p>
            <p>Order Time: {new Date(order.orderTime).toLocaleString()}</p>
            <p>Address: {order.userAddress}</p>
            <p>Payment: {order.paymentStatus}</p>
            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <button
                disabled={order.orderStatus !== "pending"}
                onClick={() =>
                  updateOrderStatus.mutate({
                    id: order._id,
                    status: "cancelled",
                  })
                }
                className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
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
                className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
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
                className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Deliver
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderRequests;
