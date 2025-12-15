import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../hooks/useAxios";
import Swal from "sweetalert2";

function MyReview() {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosInstance
      .get("/my-reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews", err));
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
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
      const res = await axiosInstance.get("/my-reviews");
      setReviews(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update review.");
    }
  };

  return (
    <section className="p-6">
      <h2 className="text-xl font-bold mb-4">My Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border p-4 rounded bg-white">
            {/* Show meal image if available */}
            {review.foodImage && (
              <img
                src={review.foodImage}
                alt={review.mealName}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            {/* Or show reviewer avatar if available */}
            {review.reviewerImage && (
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-16 h-16 rounded-full mb-3"
              />
            )}

            <h3 className="font-bold">{review.mealName}</h3>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            <p>Date: {new Date(review.date).toLocaleString()}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => {
                  setEditingReview(review);
                  reset({ rating: review.rating, comment: review.comment });
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(review._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingReview && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Update Review</h3>
          <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
            <input
              type="number"
              min="1"
              max="5"
              {...register("rating", { required: true })}
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              {...register("comment", { required: true })}
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingReview(null)}
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

export default MyReview;
