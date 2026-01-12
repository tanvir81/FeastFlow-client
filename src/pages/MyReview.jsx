import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../hooks/useAxios";
import Swal from "sweetalert2";
import { Star, Trash2, Edit, Calendar, User, Utensils } from "lucide-react";
import Loading from "../components/Loading";

function MyReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    setLoading(true);
    axiosInstance
      .get("/my-reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews", err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", // Red-500
      cancelButtonColor: "#6B7280", // Gray-500
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/reviews/${id}`);
        toast.success("Review deleted successfully!");
        setReviews((prev) => prev.filter((r) => r._id !== id));
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete review.");
      }
    }
  };

  const onEditSubmit = async (data) => {
    try {
      await axiosInstance.patch(`/reviews/${editingReview._id}`, {
        rating: data.rating,
        comment: data.comment,
      });
      toast.success("Review updated successfully!");
      setEditingReview(null);
      reset();
      fetchReviews();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update review.");
    }
  };

  // Helper to render stars
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <section className="min-h-screen bg-base-100 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-base-content text-center">
          My Reviews
        </h2>

        {loading ? (
          <Loading message="Loading your reviews..." />
        ) : reviews.length === 0 ? (
            <div className="text-center text-base-content/60 py-10">
                <p>You haven't written any reviews yet.</p>
            </div>
        ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
                <div
                key={review._id}
                className="bg-base-100 border border-base-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col p-6"
                >
                <div className="flex justify-between items-start mb-4">
                    <div>
                         <h3 className="text-xl font-bold text-base-content mb-1 line-clamp-1" title={review.mealName}>
                            {review.mealName || "Untitled Meal"}
                        </h3>
                        {/* Display fallback if mealName is missing to identify issue */}
                        {!review.mealName && <span className="text-xs text-red-400">(Name missing in DB)</span>}
                        
                         <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                            <span className="text-xs text-base-content/60 ml-2">({review.rating}/5)</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 mb-4">
                    <p className="text-base-content/70 italic text-sm line-clamp-4 relative pl-3 border-l-2 border-base-300">
                    "{review.comment}"
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-base-content/50 mb-6 mt-auto">
                    <Calendar size={14} />
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => {
                        setEditingReview(review);
                        reset({ rating: review.rating, comment: review.comment });
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-amber-glow-500/10 text-amber-glow-500 hover:bg-amber-glow-500/20 py-2.5 rounded-lg text-sm font-bold transition-colors"
                    >
                        <Edit size={16} /> Update
                    </button>
                    <button
                        onClick={() => handleDelete(review._id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-2.5 rounded-lg text-sm font-bold transition-colors"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
                </div>
            ))}
            </div>
        )}
      </div>

      {/* Edit Modal / Form */}
      {editingReview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-base-100 border border-base-200 rounded-2xl shadow-2xl p-6 w-full max-w-md scale-100 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-4 text-base-content border-b pb-2">
              Update Review for <span className="text-amber-glow-500">{editingReview.mealName}</span>
            </h3>
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-5">
              <div>
                 <label className="block text-sm font-medium text-base-content mb-1">Rating</label>
                 <select
                    {...register("rating", { required: true })}
                    className="w-full border border-base-300 bg-base-100 text-base-content rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-glow-500 focus:outline-none"
                    defaultValue={editingReview.rating}
                 >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                 </select>
              </div>
              
              <div>
                  <label className="block text-sm font-medium text-base-content mb-1">Comment</label>
                  <textarea
                    {...register("comment", { required: true })}
                    rows="4"
                    className="w-full border border-base-300 bg-base-100 text-base-content rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-glow-500 focus:outline-none"
                  />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-glow-500 hover:bg-amber-glow-600 text-white py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default MyReview;
