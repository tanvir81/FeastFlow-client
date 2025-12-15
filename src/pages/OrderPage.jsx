import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function OrderPage() {
  const { id } = useParams(); // mealId
  const { user } = useAuth();
  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  // Fetch single meal
  useEffect(() => {
    axios
      .get(`http://localhost:3000/meals/${id}`)
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

      await axios.post("http://localhost:3000/orders", orderData, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      Swal.fire("Order placed successfully!", "", "success");
    } catch (err) {
      console.error("Order failed:", err);
      toast.error("Failed to place order");
    }
  };

  if (!meal) return <div>Loading meal info...</div>;

  return (
    <section className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>

      <p>
        <strong>Meal:</strong> {meal.foodName}
      </p>
      <p>
        <strong>Price:</strong> ${meal.price}
      </p>
      <p>
        <strong>Chef ID:</strong> {meal.chefId}
      </p>
      <p>
        <strong>User:</strong> {user.email}
      </p>

      <div className="mt-4 space-y-3">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Confirm Order
        </button>
      </div>
    </section>
  );
}
