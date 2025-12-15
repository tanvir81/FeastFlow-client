import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router";

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
      } catch (err) {
        console.error("Failed to fetch orders", err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  //  Show toast if redirected with ?canceled=true
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

  return (
    <section className="p-6">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {/*  Inline banner for canceled/declined payments */}
      {location.search.includes("canceled=true") && (
        <p className="text-red-600 mb-4">
          ❌ Payment was canceled or declined.
        </p>
      )}

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow p-4 bg-gray-700 text-white"
            >
              <h3 className="text-lg font-bold mb-2">{order.mealName}</h3>
              <p>Order Status: {order.orderStatus}</p>
              <p>Price: ${order.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Delivery Time: {new Date(order.orderTime).toLocaleString()}</p>
              <p>Chef Name: {order.chefName}</p>
              <p>Chef ID: {order.chefId}</p>
              <p>Payment Status: {order.paymentStatus}</p>

              {order.orderStatus?.toLowerCase() === "accepted" &&
                order.paymentStatus?.toLowerCase() === "pending" && (
                  <button
                    onClick={() => handlePay(order)}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Pay Now
                  </button>
                )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;
