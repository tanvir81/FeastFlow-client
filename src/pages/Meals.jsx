import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../hooks/useAxios";
import Loading from "../components/Loading";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function Meals() {
  const [sortOrder, setSortOrder] = useState(""); // "" | "asc" | "desc"
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["meals", page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/meals?page=${page}&limit=${itemsPerPage}`);
      return res.data;
    },
    keepPreviousData: true, // Keep old data while fetching (smooth transition)
  });

  // Handle both paginated response and potential fallback
  const meals = data?.meals || (Array.isArray(data) ? data : []);
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Sorting Logic
  const sortedMeals = [...meals].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Helper for Chef ID Badge
  const getChefBadge = (name, id) => {
    const n = (name || "Unknown").slice(0, 3).toUpperCase();
    const i = (id || "0000").slice(0, 4).toUpperCase();
    return `${n}-${i}`;
  };

  if (isLoading) {
    return <Loading message="Loading delicious meals..." />;
  }

  if (isError) {
    return (
      <div className="min-h-screen py-20 text-center text-red-500">
        Error: {error?.message || "Failed to fetch meals"}
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              All <span className="text-[#F79A19]">Meals</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Discover fresh, homemade meals from local chefs.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <select
              className="select select-bordered border-[#FFE52A] w-full max-w-xs focus:outline-none focus:border-[#F79A19]"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="" disabled>Sort by Price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Meals Grid */}
        <motion.div
           variants={container}
           initial="hidden"
           animate="show"
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedMeals.map((meal) => (
            <motion.div
              key={meal._id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-60 overflow-hidden group">
                <img
                  src={meal.foodImage || meal.image}
                  alt={meal.foodName || meal.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#F79A19] shadow-sm">
                  ★ {meal.rating || "New"}
                </div>
                {meal.category && (
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                        {meal.category}
                    </div>
                )}
                {meal.estimatedDeliveryTime && (
                   <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                      <span>⏱</span> {meal.estimatedDeliveryTime}
                   </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1 flex-1 pr-2">
                        {meal.foodName || meal.name}
                    </h3>
                    <p className="text-2xl font-bold text-[#F79A19]">
                        ${meal.price}
                    </p>
                </div>

                {/* Additional Info: Area */}
                <div className="flex items-center text-gray-500 text-sm mb-3">
                    <span className="mr-1">📍</span>
                    <span className="truncate">{meal.deliveryArea || "Citywide"}</span>
                </div>

                {/* Ingredients */}
                {meal.ingredients && meal.ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {meal.ingredients.slice(0, 3).map((ing, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wide bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-semibold">
                                {ing}
                            </span>
                        ))}
                    </div>
                )}

                 {/* Spacer to push footer down */}
                <div className="mt-auto"></div>

                <div className="flex items-center justify-between mt-4 border-t pt-4 border-gray-100">
                    {/* Chef Info */}
                    <div className="flex flex-col items-start gap-1">
                        <div className="rounded-full border border-[#FFE52A] px-3 py-1 bg-yellow-50/50">
                            <span className="text-xs font-bold text-gray-700">
                                Chef <span className="text-[#F79A19]">{meal.chefName || "Unknown"}</span>
                            </span>
                        </div>
                        {/* Custom Chef ID Badge */}
                        <div className="pl-1 flex items-center gap-1">
                            <span className="text-xs font-bold text-white bg-[#FFA239] px-2 py-0.5 rounded-full shadow-sm">
                                ID: {getChefBadge(meal.chefName, meal.chefId || meal._id)}
                            </span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/meals/${meal._id}`}
                      className="text-[#F79A19] font-bold text-sm hover:underline"
                    >
                      View Details →
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {sortedMeals.length === 0 && !isLoading && (
            <div className="text-center py-20 text-gray-500">
                No meals found.
            </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-[#FFE52A] hover:border-[#FFE52A] transition-colors"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`w-10 h-10 rounded-lg border font-bold transition-all ${
                  page === num
                    ? "bg-[#FFE52A] border-[#FFE52A] text-gray-900"
                    : "bg-white border-gray-300 text-gray-700 hover:border-[#FFE52A]"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-[#FFE52A] hover:border-[#FFE52A] transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
