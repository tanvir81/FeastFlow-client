import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../hooks/useAxios";
import Swal from "sweetalert2";

function MyMeals() {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/my-meals")
      .then((res) => setMeals(res.data))
      .catch((err) => console.error("Failed to fetch meals", err));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onEditSubmit = async (data) => {
    try {
      const payload = {
        foodName: data.foodName,
        chefName: data.chefName,
        price: parseFloat(data.price),
        rating: Number(data.rating) || 0,
        ingredients: data.ingredients
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
      };

      await axiosInstance.patch(`/meals/${editingMeal._id}`, payload);

      toast.success("Meal updated successfully!");
      setEditingMeal(null);
      reset();
      const res = await axiosInstance.get("/my-meals");
      setMeals(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to update meal.");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/meals/${id}`);
        toast.success("Meal deleted successfully!");
        setMeals((prev) => prev.filter((m) => m._id !== id));
      } catch (err) {
        toast.error(err?.response?.data?.error || "Failed to delete meal.");
      }
    }
  };

  return (
    <section className="p-6">
      <h2 className="text-xl font-bold mb-4">My Meals</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="border rounded shadow p-4 bg-white">
            {/* Food Image */}
            {meal.foodImage && (
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            {/* Required fields */}
            <h3 className="text-lg font-bold">{meal.foodName}</h3>
            <p className="text-gray-700">Price: ${meal.price}</p>
            <p className="text-gray-700">Rating: {meal.rating}</p>
            <p className="text-gray-700">
              Ingredients:{" "}
              {Array.isArray(meal.ingredients)
                ? meal.ingredients.join(", ")
                : meal.ingredients}
            </p>
            <p className="text-gray-700">
              Delivery: {meal.estimatedDeliveryTime}
            </p>
            <p className="text-gray-700">Chef Name: {meal.chefName}</p>
            <p className="text-gray-700">Chef ID: {meal.chefId}</p>

            {/* Actions */}
            <div className="mt-3 space-x-2">
              <button
                onClick={() => {
                  setEditingMeal(meal);
                  reset({
                    foodName: meal.foodName || "",
                    chefName: meal.chefName || "",
                    price: meal.price ?? "",
                    rating: meal.rating ?? 0,
                    ingredients: Array.isArray(meal.ingredients)
                      ? meal.ingredients.join(", ")
                      : meal.ingredients || "",
                    estimatedDeliveryTime: meal.estimatedDeliveryTime || "",
                    chefExperience: meal.chefExperience || "",
                  });
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(meal._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update modal (inline panel) */}
      {editingMeal && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Update Meal</h3>
          <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
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
              type="number"
              step="0.01"
              placeholder="Price"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price cannot be negative" },
              })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}

            <input
              type="number"
              step="1"
              min="0"
              placeholder="Rating"
              {...register("rating")}
              className="w-full border rounded px-3 py-2"
            />

            <textarea
              placeholder="Ingredients (comma separated)"
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
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
              <p className="text-red-500">
                {errors.estimatedDeliveryTime.message}
              </p>
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

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setEditingMeal(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default MyMeals;
