import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const idToken = await getAuth().currentUser.getIdToken(true);
        const res = await axios.get("http://localhost:3000/orders", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        setOrders(res.data);
        console.log("Orders received:", res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  //  Show toast
  useEffect(() => {
    if (location.search.includes("canceled=true")) {
      toast.error("❌ Payment was canceled or declined.");
    }
  }, [location.search]);

  const handlePay = async (order) => {
    try {
      const idToken = await getAuth().currentUser.getIdToken(true);

      const res = await axios.post(
        "http://localhost:3000/create-checkout-session",
        {
          orderId: order._id,
          mealName: order.mealName,
          price: order.price * order.quantity,
        },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      toast.error("Failed to start checkout");
    }
  };

  // first 3 letters of name + first 4 chars of UID
  const formatChefId = (chefName, chefUid) => {
    if (!chefName || chefName === "Unknown Chef" || !chefUid) {
      return "N/A";
    }
    const namePrefix = chefName.substring(0, 3).toUpperCase();
    const idSuffix = chefUid.substring(0, 4);
    return `${namePrefix}-${idSuffix}`;
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === "delivered") return "bg-green-500";
    if (statusLower === "accepted") return "bg-blue-500";
    if (statusLower === "preparing") return "bg-[#F79A19]";
    if (statusLower === "pending") return "bg-[#F79A19] text-white";
    return "bg-gray-500";
  };

  const getPaymentStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === "paid") return "bg-green-500";
    if (statusLower === "pending") return "bg-[#F79A19] text-white";
    return "bg-gray-500";
  };

  return (
    <section className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your food orders</p>
        </motion.div>

        {/*   payments */}
        {location.search.includes("canceled=true") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6"
          >
            <p className="text-red-700 flex items-center gap-2">
              <span className="text-2xl">❌</span>
              Payment was canceled or declined.
            </p>
          </motion.div>
        )}

        {loading ? (
          <Loading message="Loading your orders..." />
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-600 text-xl">No orders yet.</p>
            <p className="text-gray-500 mt-2">
              Start ordering delicious meals!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  {/* Header with Meal Name */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 flex-1">
                      {order.mealName}
                    </h3>
                    <div className="flex flex-col gap-2 items-end">
                      <span
                        className={`${getStatusColor(
                          order.orderStatus
                        )} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                      >
                        {order.orderStatus}
                      </span>
                      {/* Only show payment status if it's different from order status */}
                      {order.paymentStatus?.toLowerCase() !==
                        order.orderStatus?.toLowerCase() && (
                        <span
                          className={`${getPaymentStatusColor(
                            order.paymentStatus
                          )} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                        >
                          Payment: {order.paymentStatus}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600 text-sm mb-1">Price</p>
                      <p className="text-gray-800 font-semibold text-lg">
                        ${order.price}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600 text-sm mb-1">Quantity</p>
                      <p className="text-gray-800 font-semibold text-lg">
                        {order.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Chef Information */}
                  <div className="bg-[#FFE52A] rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-[#F79A19] rounded-full flex items-center justify-center text-2xl">
                        👨‍🍳
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 text-xs">Chef</p>
                        <p className="text-gray-900 font-semibold">
                          {order.chefName || "Unknown Chef"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-700 text-sm">Chef ID:</p>
                      <p className="text-gray-900 font-mono font-semibold bg-white px-2 py-1 rounded">
                        {formatChefId(order.chefName, order.chefUid)}
                      </p>
                    </div>
                  </div>

                  {/* Delivery Time */}
                  <div className="flex items-center gap-2 text-gray-700 mb-4 bg-gray-50 rounded-lg p-3">
                    <svg
                      className="w-5 h-5 text-[#F79A19]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-gray-600 text-xs">Order Time</p>
                      <p className="text-sm font-medium">
                        {new Date(order.orderTime).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Pay Button */}
                  {order.orderStatus?.toLowerCase() === "accepted" &&
                    order.paymentStatus?.toLowerCase() === "pending" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePay(order)}
                        className="w-full bg-[#F79A19] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#e68a0f] transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        💳 Pay Now - ${order.price * order.quantity}
                      </motion.button>
                    )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
