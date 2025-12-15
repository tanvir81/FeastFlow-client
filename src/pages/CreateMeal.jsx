import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../hooks/useAxios";
import { useAuth } from "../context/AuthContext";

function CreateMeal() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      rating: 0,
    },
  });

  const onSubmit = async (data) => {
    //  Fraud check
    if (user?.status === "fraud") {
      toast.error(
        "You are restricted from creating meals. Please contact support."
      );
      return;
    }

    try {
      const file = data.foodImage[0];
      let foodImage = "";

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        // ImgBB using  API key
        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=51cf2af8b48eb5d916dd2d4dd09b0a3f`,
          {
            method: "POST",
            body: formData,
          }
        );
        const uploadData = await uploadRes.json();
        foodImage = uploadData.data.url;
      }

      const payload = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage,
        price: parseFloat(data.price),
        rating: Number(data.rating) || 0,
        ingredients: data.ingredients
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        userEmail: user?.email || "",
      };

      await axiosInstance.post("/meals", payload, { withCredentials: true });

      toast.success("Meal created successfully!");
      reset({ rating: 0 });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to create meal.");
    }
  };

  return (
    <section className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Create New Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Food Name"
          {...register("foodName", { required: "Food name is required" })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.foodName && (
          <p className="text-red-500">{errors.foodName.message}</p>
        )}

        <input
          type="text"
          placeholder="Chef Name"
          {...register("chefName", { required: "Chef name is required" })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.chefName && (
          <p className="text-red-500">{errors.chefName.message}</p>
        )}

        <input
          type="file"
          accept="image/*"
          {...register("foodImage", { required: "Food image is required" })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.foodImage && (
          <p className="text-red-500">{errors.foodImage.message}</p>
        )}

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price cannot be negative" },
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        <input
          type="number"
          step="1"
          min="0"
          placeholder="Rating (default 0)"
          {...register("rating")}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          placeholder="Ingredients (comma separated)"
          {...register("ingredients", { required: "Ingredients are required" })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.ingredients && (
          <p className="text-red-500">{errors.ingredients.message}</p>
        )}

        <input
          type="text"
          placeholder="Estimated Delivery Time"
          {...register("estimatedDeliveryTime", {
            required: "Delivery time is required",
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.estimatedDeliveryTime && (
          <p className="text-red-500">{errors.estimatedDeliveryTime.message}</p>
        )}

        <textarea
          placeholder="Chef’s Experience"
          {...register("chefExperience", {
            required: "Experience is required",
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.chefExperience && (
          <p className="text-red-500">{errors.chefExperience.message}</p>
        )}

        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-full border rounded px-3 py-2 bg-gray-100"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {isSubmitting ? "Creating..." : "Create Meal"}
        </button>
      </form>
    </section>
  );
}

export default CreateMeal;
