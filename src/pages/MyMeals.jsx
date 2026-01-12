import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../hooks/useAxios";
import Swal from "sweetalert2";
import { Edit2, Trash2, Clock, Star, Package } from "lucide-react";

const InputField = ({ label, error, ...rest }) => (
  <div>
    <label className="block text-sm font-bold text-base-content mb-1">
      {label}
    </label>
    <input
      {...rest}
      className={`w-full px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-amber-glow-300 focus:border-transparent transition-all ${
        rest.className || ""
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

function MyMeals() {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);

  // Fetch meals on mount
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = () => {
    axiosInstance
      .get("/my-meals")
      .then((res) => setMeals(res.data))
      .catch((err) => console.error("Failed to fetch meals", err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Populate form
  useEffect(() => {
    if (editingMeal) {
      reset({
        foodName: editingMeal.foodName || "",
        chefName: editingMeal.chefName || "",
        price: editingMeal.price ?? "",
        rating: editingMeal.rating ?? 1,
        ingredients: Array.isArray(editingMeal.ingredients)
          ? editingMeal.ingredients.join(", ")
          : editingMeal.ingredients || "",
        estimatedDeliveryTime: editingMeal.estimatedDeliveryTime || "",
        chefExperience: editingMeal.chefExperience || "",
      });
    }
  }, [editingMeal, reset]);

  const onEditSubmit = async (data) => {
    try {
      const payload = {
        foodName: data.foodName,
        chefName: data.chefName,
        price: parseFloat(data.price),
        rating: Number(data.rating),
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
      fetchMeals();
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

  // Custom Chef ID Generator: Name(3) + ID(4)
  const getCustomChefId = (name, id) => {
    const namePart = (name || "UNK").slice(0, 3).toUpperCase();
    const idPart = (id || "0000").slice(0, 4).toUpperCase();
    return `${namePart}-${idPart}`;
  };

  return (
    <section className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-base-content">My Meals</h2>
          <span className="bg-base-100 px-4 py-1 rounded-full text-sm font-medium text-base-content/60 shadow-sm border">
            Total Items: {meals.length}
          </span>
        </div>

        {/* Edit Modal / Form Overlay */}
        {editingMeal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-all">
            <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="bg-amber-glow-300 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-base-content">Update Meal</h3>
                <button
                  onClick={() => setEditingMeal(null)}
                  className="text-base-content hover:text-black font-bold text-xl"
                >
                  &times;
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onEditSubmit)}
                className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Food Name"
                    placeholder="e.g. Spicy Ramen"
                    {...register("foodName", { required: "Required" })}
                    error={errors.foodName}
                  />
                  <InputField
                    label="Chef Name"
                    placeholder="Your Name"
                    {...register("chefName", { required: "Required" })}
                    error={errors.chefName}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    type="number"
                    label="Price ($)"
                    step="0.01"
                    {...register("price", { required: "Required", min: 0 })}
                    error={errors.price}
                  />
                  <InputField
                    type="number"
                    label="Rating (1-5)"
                    step="0.1"
                    min="1"
                    max="5"
                    {...register("rating", { min: 1, max: 5 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-base-content mb-1">
                    Ingredients
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Comma separated"
                    {...register("ingredients", { required: "Required" })}
                    className="w-full px-4 py-2 rounded-lg border border-base-300 focus:ring-2 focus:ring-amber-glow-300 focus:outline-none"
                  />
                  {errors.ingredients && (
                    <p className="text-red-500 text-sm">
                      {errors.ingredients.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Delivery Time"
                    {...register("estimatedDeliveryTime", {
                      required: "Required",
                    })}
                    error={errors.estimatedDeliveryTime}
                  />
                  <InputField
                    label="Chef Experience"
                    {...register("chefExperience", { required: "Required" })}
                    error={errors.chefExperience}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-amber-glow-300 hover:bg-amber-glow-400 text-base-content font-bold py-3 rounded-lg transition-colors"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingMeal(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-base-content font-bold py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Meal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="bg-base-100 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={
                    meal.foodImage ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={meal.foodName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm text-base-content border border-gray-100">
                  {getCustomChefId(meal.chefName, meal.chefId || meal._id)}
                </div>
                <div className="absolute bottom-3 left-3 bg-amber-glow-300 text-base-content text-xs font-bold px-2 py-1 rounded shadow-sm">
                  ${meal.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="text-lg font-bold text-base-content line-clamp-1"
                    title={meal.foodName}
                  >
                    {meal.foodName}
                  </h3>
                  <div className="flex items-center text-amber-glow-400 font-bold text-sm">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {meal.rating}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-base-content/70 mb-4 flex-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{meal.estimatedDeliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="line-clamp-1">
                      {Array.isArray(meal.ingredients)
                        ? meal.ingredients.join(", ")
                        : meal.ingredients}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                  <button
                    onClick={() => setEditingMeal(meal)}
                    className="flex-1 bg-amber-glow-300/10 hover:bg-amber-glow-300/20 text-yellow-700 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-colors text-sm"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!meals.length && (
            <div className="col-span-full text-center py-20 bg-base-100 rounded-xl border-2 border-dashed border-base-200">
              <p className="text-gray-400 text-lg">
                No meals found. Start creating!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyMeals;
