import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../hooks/useAxios";
import Loading from "../components/Loading";

function Reviews() {
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews");
      console.log("Fetched reviews:", res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading message="Loading reviews..." />;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading reviews: {error?.message}
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        All Customer Reviews
      </h2>
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-6 shadow-sm bg-gray-700"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{review.reviewerName}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="italic">"{review.comment}"</p>
              <p className="mt-2 text-yellow-500">{review.rating} ★</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Reviews;
