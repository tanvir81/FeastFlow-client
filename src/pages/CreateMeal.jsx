import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../hooks/useAxios";
import { useAuth } from "../context/AuthContext";

// Defined outside to prevent remounting
const InputField = ({ label, error, ...rest }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">
      {label}
    </label>
    <input
      {...rest}
      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFE52A] focus:border-transparent transition-all ${
        rest.className || ""
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

function CreateMeal() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      rating: 1,
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
      reset({ rating: 1 });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to create meal.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#FFE52A] px-8 py-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create New Meal
            </h2>
            <p className="text-gray-800 mt-2 font-medium">
              Share your culinary masterpiece with the world
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                label="Food Name"
                placeholder="e.g. Spicy Ramen"
                {...register("foodName", { required: "Food name is required" })}
                error={errors.foodName}
              />

              <InputField
                label="Chef Name"
                placeholder="Your Name"
                {...register("chefName", { required: "Chef name is required" })}
                error={errors.chefName}
              />
            </div>

            <InputField
              type="file"
              label="Food Image"
              accept="image/*"
              {...register("foodImage", { required: "Food image is required" })}
              error={errors.foodImage}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                type="number"
                label="Price ($)"
                placeholder="0.00"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" },
                })}
                error={errors.price}
              />

              <InputField
                type="number"
                label="Rating (1-5)"
                placeholder="1"
                step="0.1"
                min="1"
                max="5"
                {...register("rating", {
                  required: "Rating is required",
                  min: { value: 1, message: "Rating must be at least 1" },
                  max: { value: 5, message: "Rating cannot exceed 5" },
                })}
                error={errors.rating}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Ingredients
              </label>
              <textarea
                placeholder="e.g. Noodles, Eggs, Green Onion (comma separated)"
                rows="3"
                {...register("ingredients", {
                  required: "Ingredients are required",
                })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFE52A] focus:border-transparent transition-all"
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ingredients.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                label="Estimated Delivery Time"
                placeholder="e.g. 30-45 mins"
                {...register("estimatedDeliveryTime", {
                  required: "Delivery time is required",
                })}
                error={errors.estimatedDeliveryTime}
              />

              <InputField
                label="Chef's Experience"
                placeholder="e.g. 5 Years Italian Cuisine"
                {...register("chefExperience", {
                  required: "Experience is required",
                })}
                error={errors.chefExperience}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Chef Email (Read-only)
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-gray-900 bg-[#FFE52A] hover:bg-[#FFA239] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFE52A] transition-colors ${
                  isSubmitting ? "opacity-75 cursor-wait" : ""
                }`}
              >
                {isSubmitting ? "Creating Meal..." : "Publish Meal"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateMeal;
