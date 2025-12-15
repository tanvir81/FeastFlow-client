import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../hooks/useAxios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function MealDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();

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
    return <div className="text-center py-10">Loading meal details...</div>;
  }

  if (mealError || !meal) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load meal details.
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-4">{meal.name}</h2>
      <img
        src={meal.foodImage || meal.image}
        alt={meal.foodName || meal.name}
        className="w-full h-64 object-cover rounded"
      />
      <p className="mt-4">{meal.description}</p>
      <p className="mt-2 font-semibold text-red-600">${meal.price}</p>
      <p className="mt-2">Chef: {meal.chefName}</p>
      <p className="mt-2">Delivery Area: {meal.deliveryArea}</p>
      <p className="mt-2">Estimated Delivery: {meal.deliveryTime}</p>
      <p className="mt-2">Chef Experience: {meal.chefExperience}</p>

      {/* Action buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to={`/dashboard/order/${meal._id}`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Favorites
        </button>
      </div>

      {/* Reviews */}
      <h3 className="text-2xl font-bold mt-8 mb-4">Reviews</h3>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet for this meal.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded shadow-sm bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-2">{review.comment}</p>
              <p className="mt-1 text-yellow-500">⭐ {review.rating}</p>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addReview.mutate({
            foodId: id,
            reviewerName: user.displayName || user.email, // from AuthContext
            reviewerImage: user.photoURL, // auto from login
            rating,
            comment,
            date: new Date().toISOString(),
          });
        }}
        className="mt-8 space-y-4 border-t pt-6"
      >
        <h4 className="text-xl font-semibold">Add a Review</h4>
        {/* No need for name/image inputs anymore */}
        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
}

export default MealDetails;
