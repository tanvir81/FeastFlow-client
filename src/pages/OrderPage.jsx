import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

export default function OrderPage() {
  const { id } = useParams(); // mealId
  const { user } = useAuth();
  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  // Fetch single meal
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/meals/${id}`)
      .then((res) => setMeal(res.data))
      .catch((err) => {
        console.error("Failed to fetch meal:", err);
        toast.error("Failed to load meal details");
      });
  }, [id]);

  const handleConfirm = async () => {
    if (!meal) return;

    //  Fraud check
    if (user?.status === "fraud") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Your account is flagged as fraud. You cannot place orders.",
      });
      return;
    }

    const totalPrice = meal.price * quantity;

    if (!address) {
      toast.error("Please enter your delivery address");
      return;
    }

    // SweetAlert confirmation
    const result = await Swal.fire({
      title: "Confirm Order",
      text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm",
    });

    if (!result.isConfirmed) return;

    const orderData = {
      foodId: meal._id,
      mealName: meal.foodName,
      price: meal.price,
      quantity,
      chefId: meal.chefId,
      userEmail: user.email,
      userAddress: address,
      orderStatus: "pending",
      paymentStatus: "Pending",
      orderTime: new Date().toISOString(),
    };

    try {
      const idToken = await getAuth().currentUser.getIdToken();

      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      Swal.fire("Order placed successfully!", "", "success");
    } catch (err) {
      console.error("Order failed:", err);
      toast.error("Failed to place order");
    }
  };

  if (!meal) return <Loading message="Loading meal info..." />;

  // Chef ID Badge
  const getChefBadge = (name, id) => {
    const n = (name || "Unknown").slice(0, 3).toUpperCase();
    const i = (id || "0000").slice(0, 4).toUpperCase();
    return `${n}-${i}`;
  };

  const totalPrice = meal.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mb-8 text-gray-500 hover:text-[#F79A19] flex items-center gap-2 font-medium transition-colors"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Meal Summary */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 sticky top-6">
            <div className="relative h-64 overflow-hidden">
              <img
                src={meal.foodImage || meal.image}
                alt={meal.foodName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="text-xl font-extrabold text-[#F79A19]">
                  ${meal.price}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {meal.foodName}
              </h2>

              <div className="flex items-center gap-2 mb-6">
                <div className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold border border-yellow-200">
                  Chef: {meal.chefName}
                </div>
                {/* Custom Chef ID Badge */}
                <span className="text-xs font-bold text-white bg-[#FFA239] px-2 py-1 rounded-full shadow-sm">
                  ID: {getChefBadge(meal.chefName, meal.chefId)}
                </span>
              </div>

              <div className="space-y-4 border-t pt-6 bg-gray-50/50 -mx-8 px-8 pb-4">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Price per item</span>
                  <span className="font-semibold">${meal.price}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Quantity</span>
                  <span className="font-semibold">x {quantity}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 border-t pt-4">
                  <span>Initial Status</span>
                  <span className="font-bold text-orange-500 uppercase">
                    Pending
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Order Time</span>
                  <span className="font-semibold">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 border-t pt-4">
                  <span>Total</span>
                  <span className="text-[#F79A19]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-[#FFE52A] w-2 h-8 rounded-full"></span>
              Complete Your Order
            </h1>

            <div className="space-y-6">
              <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                <label className="block text-xs font-bold text-yellow-800 uppercase tracking-wide mb-1 opacity-80">
                  Ordering As
                </label>
                <div className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-xl"></span> {user.email}
                </div>
              </div>

              {/* Added Status and Time Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <label className="block text-xs font-bold text-orange-800 uppercase tracking-wide mb-1 opacity-80">
                    Order Status
                  </label>
                  <div className="font-bold text-orange-500">Pending</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <label className="block text-xs font-bold text-orange-800 uppercase tracking-wide mb-1 opacity-80">
                    Order Time
                  </label>
                  <div className="font-bold text-gray-900">
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F79A19] focus:border-transparent font-semibold text-lg"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Delivery Address
                </label>
                <textarea
                  placeholder="Enter your full delivery address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F79A19] focus:border-transparent min-h-[120px]"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleConfirm}
                className="w-full bg-[#F79A19] hover:bg-orange-500 text-white font-bold text-xl py-4 rounded-xl shadow-lg shadow-orange-200 transition-all hover:-translate-y-1 transform active:scale-95"
              >
                Confirm Order - ${totalPrice.toFixed(2)}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                *By confirming, you agree to our terms of service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
