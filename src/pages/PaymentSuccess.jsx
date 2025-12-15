import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");
  const sessionId = params.get("session_id");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        if (sessionId) {
          const res = await axios.patch(
            `http://localhost:3000/payment-success?session_id=${sessionId}`
          );
          if (res.data.success) {
            setSuccess(true);

            // 🔎 Only show toast if it's a fresh payment, not a duplicate
            if (res.data.message !== "Payment already recorded") {
              toast.success("🎉 Payment Successful! Your order is confirmed.");
            }
          } else {
            toast.error("❌ Payment Failed. Please try again.");
          }
        }
      } catch (err) {
        console.error("Failed to confirm payment:", err);
        toast.error("❌ Error confirming payment.");
      } finally {
        setLoading(false);
      }
    };
    confirmPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Confirming your payment...</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        {success ? (
          <>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              🎉 Payment Successful!
            </h2>
            <p className="text-gray-700 mb-2">
              Your order has been paid successfully. The chef will now prepare
              and deliver it.
            </p>
            {orderId && (
              <p className="text-sm text-gray-500 mb-4">
                Order ID: <span className="font-mono">{orderId}</span>
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              ❌ Payment Failed
            </h2>
            <p className="text-gray-700 mb-4">
              Your payment could not be confirmed. It may have been declined or
              canceled.
            </p>
          </>
        )}
        <Link
          to="/dashboard/orders"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View My Orders
        </Link>
      </div>
    </section>
  );
};

export default PaymentSuccess;
