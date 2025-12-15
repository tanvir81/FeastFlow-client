import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axiosInstance from "../hooks/useAxios";

function Meals() {
  const {
    data: meals = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosInstance.get("/meals");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center py-10">Loading meals...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error?.message || "Failed to fetch meals"}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {meals.map((meal) => (
        <div
          key={meal._id}
          className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-gray-700"
        >
          <img
            src={meal.foodImage || meal.image}
            alt={meal.foodName || meal.name}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-xl font-bold mt-3">
            {meal.foodName || meal.name}
          </h3>

          {/* Extra fields */}
          <p className="text-gray-300">
            Chef: {meal.chefName} ({meal.chefId})
          </p>
          <p className="text-gray-300">Rating: {meal.rating}</p>
          <p className="text-gray-300">Delivery Area: {meal.deliveryArea}</p>
          <p className="text-gray-300">
            Delivery Time: {meal.estimatedDeliveryTime}
          </p>
          {meal.ingredients && (
            <p className="text-gray-300">
              Ingredients: {meal.ingredients.join(", ")}
            </p>
          )}

          <span className="block mt-2 font-semibold text-red-400">
            ${meal.price}
          </span>

          <Link
            to={`/meals/${meal._id}`}
            className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Meals;
