import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../hooks/useAxios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

function MealDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Helper for Chef ID Badge
  const getChefBadge = (name, id) => {
    const n = (name || "Unknown").slice(0, 3).toUpperCase();
    const i = (id || "0000").slice(0, 4).toUpperCase();
    return `${n}-${i}`;
  };

  // Fetch single meal
  const {
    data: meal,
    isLoading: mealLoading,
    isError: mealError,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/meals/${id}`);
      return res.data;
    },
  });

  // Fetch reviews for this meal
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reviews?foodId=${id}`);
      return res.data;
    },
  });

  // Local state for review form
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerImage, setReviewerImage] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // Mutation for adding review
  const addReview = useMutation({
    mutationFn: async (newReview) => {
      const res = await axiosInstance.post("/reviews", newReview);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
      setReviewerName("");
      setReviewerImage("");
      setComment("");
      setRating(5);
      toast.success("Review submitted successfully!");
    },
    onError: () => {
      toast.error("Failed to submit review. Please try again.");
    },
  });

  // Mutation for adding to favorites
  const addFavorite = useMutation({
    mutationFn: async (favData) => {
      const res = await axiosInstance.post("/favorites", favData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Meal added to favorites!");
    },
    onError: () => {
      toast.error("Failed to add to favorites.");
    },
  });

  if (mealLoading || reviewsLoading) {
    return <Loading message="Loading meal details..." />;
  }

  if (mealError || !meal) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 font-bold text-xl">
        Failed to load meal details.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link
            to="/meals"
            className="text-base-content/60 hover:text-amber-glow-500 transition-colors font-medium flex items-center gap-2"
          >
            ← Back to Meals
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image */}
          <div className="relative group">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={meal.foodImage || meal.image}
                alt={meal.foodName || meal.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Floating Price Badge */}
            <div className="absolute top-6 right-6 bg-base-100/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-base-200">
              <span className="text-2xl font-extrabold text-amber-glow-500">
                ${meal.price}
              </span>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-amber-glow-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  ID: {getChefBadge(meal.chefName, meal.chefId || meal._id)}
                </span>
                <div className="flex items-center gap-1 text-amber-glow-500 font-bold">
                  <span>★</span>
                  <span>{meal.rating || "New"}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-base-content leading-tight">
                {meal.foodName || meal.name}
              </h1>
            </div>

            {/* Chef Section */}
            <div className="flex items-center gap-4 p-4 bg-base-100 rounded-2xl shadow-sm border border-base-200">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
                👨‍🍳
              </div>
              <div>
                <p className="text-xs text-base-content/60 font-bold uppercase tracking-wide">
                  Crafted by
                </p>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-base-content">
                    {meal.chefName}
                  </h3>
                  {/* Reuse simple text or badge if needed, sticking to text for now as per design */}
                </div>
              </div>
            </div>

            <p className="text-base-content/70 text-lg leading-relaxed">
              {meal.description ||
                "A delicious homemade meal prepared with fresh ingredients and love. perfect for a healthy and satisfying lunch or dinner."}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-base-100 p-4 rounded-xl border border-base-200">
                <p className="text-base-content/50 text-xs font-bold uppercase mb-1">
                  Delivery Time
                </p>
                <p className="font-semibold text-base-content">
                  {meal.deliveryTime || meal.estimatedDeliveryTime}
                </p>
              </div>
              <div className="bg-base-100 p-4 rounded-xl border border-base-200">
                <p className="text-base-content/50 text-xs font-bold uppercase mb-1">
                  Delivery Area
                </p>
                <p className="font-semibold text-base-content">
                  {meal.deliveryArea || "Local Area"}
                </p>
              </div>
              <div className="bg-base-100 p-4 rounded-xl border border-base-200">
                <p className="text-base-content/50 text-xs font-bold uppercase mb-1">
                  Chef Experience
                </p>
                <p className="font-semibold text-base-content">
                  {meal.chefExperience || "Expert Chef"}
                </p>
              </div>
              <div className="bg-base-100 p-4 rounded-xl border border-base-200 col-span-2">
                <p className="text-base-content/50 text-xs font-bold uppercase mb-1">
                  Ingredients
                </p>
                 <div className="flex flex-wrap gap-2 mt-1">
                  {Array.isArray(meal.ingredients) ? (
                    meal.ingredients.map((ing, i) => (
                      <span key={i} className="text-sm bg-orange-50 text-orange-700 px-3 py-1 rounded-lg font-medium">
                        {ing}
                      </span>
                    ))
                  ) : (
                    <span className="text-base-content">{meal.ingredients}</span>
                  )}
                 </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Link
                to={`/dashboard/order/${meal._id}`}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center font-bold text-lg py-4 rounded-xl shadow-lg shadow-green-200 transition-all hover:-translate-y-1"
              >
                Order Now
              </Link>
              <button
                onClick={() =>
                  addFavorite.mutate({
                    userEmail: user.email,
                    mealId: meal._id,
                    mealName: meal.foodName,
                    chefId: meal.chefId,
                    chefName: meal.chefName,
                    price: meal.price,
                    addedTime: new Date().toISOString(),
                  })
                }
                className="flex-1 bg-amber-glow-300 hover:bg-amber-glow-400 text-gray-900 text-center font-bold text-lg py-4 rounded-xl shadow-lg shadow-yellow-200 transition-all hover:-translate-y-1"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-base-content">
              Customer Reviews
            </h3>
            <span className="text-base-content/60 font-medium">
              {reviews.length} Review{reviews.length !== 1 && "s"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {reviews.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-base-100 rounded-2xl border border-base-200">
                <p className="text-base-content/50 text-lg">
                  No reviews yet. Be the first to try this meal!
                </p>
              </div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.reviewerImage || "https://randomuser.me/api/portraits/lego/1.jpg"}
                      alt={review.reviewerName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-base-content">
                        {review.reviewerName}
                      </p>
                      <p className="text-xs text-base-content/60">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-auto flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "opacity-100" : "opacity-30"}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-base-content/70 leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form */}
          <div className="bg-base-100 rounded-3xl shadow-xl p-8 md:p-10 border border-base-200">
            <h4 className="text-2xl font-bold text-base-content mb-6">
              Leave a Review
            </h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addReview.mutate({
                  foodId: id,
                  mealName: meal.foodName || meal.name,
                  foodImage: meal.foodImage || meal.image,
                  reviewerName: user.displayName || user.email,
                  reviewerImage: user.photoURL,
                  rating,
                  comment,
                  date: new Date().toISOString(),
                });
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-base-content">Rating</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRating(r)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all ${
                        rating === r
                          ? "bg-amber-glow-300 text-gray-900 shadow-md scale-110"
                          : "bg-base-200 text-base-content/50 hover:bg-base-300"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-base-content">Your Feedback</label>
                <textarea
                  placeholder="Tell us what you liked about this meal..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-base-100 text-base-content border-base-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-glow-300 focus:border-transparent min-h-[120px]"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealDetails;
