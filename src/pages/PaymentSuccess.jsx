import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import Loading from "../components/Loading";

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
            `${import.meta.env.VITE_API_URL}/payment-success?session_id=${sessionId}`
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
    return <Loading message="Confirming your payment..." />;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full border border-gray-100"
      >
        {success ? (
          <>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6"
            >
              <CheckCircle size={48} className="text-green-600" />
            </motion.div>
            
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your order has been confirmed and our chef is already preparing your delicious meal.
            </p>
            
            {orderId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Order ID</p>
                <p className="font-mono text-lg text-gray-800 font-bold">{orderId}</p>
              </div>
            )}
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard/orders"
                className="inline-block w-full bg-amber-glow-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-amber-glow-600 transition-colors shadow-lg shadow-orange-200"
              >
                View My Orders
              </Link>
            </motion.div>
          </>
        ) : (
          <>
             <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6"
            >
              <XCircle size={48} className="text-red-600" />
            </motion.div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-8">
              Unfortunately, your payment could not be processed. Please try again or contact support.
            </p>
            
             <div className="space-y-3">
              <Link
                to="/dashboard/orders"
                 className="block w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-900 transition-colors"
              >
                Go to Orders
              </Link>
              <Link
                to="/"
                className="block w-full text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default PaymentSuccess;
