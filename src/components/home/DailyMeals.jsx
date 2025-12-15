import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";

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

export default function DailyMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Fetch all meals and take the first 6
        const response = await axiosInstance.get("/meals");
        setMeals(response.data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch meals", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [axiosInstance]);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 flex justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Daily <span className="text-[#F79A19]">Delights</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore our top-rated meals cooked fresh daily by passionate chefs in your neighborhood.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {meals.map((meal) => (
            <motion.div
              key={meal._id}
              variants={item}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={meal.foodImage || meal.image}
                  alt={meal.foodName || meal.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {meal.estimatedDeliveryTime && (
                   <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                      <span>⏱</span> {meal.estimatedDeliveryTime}
                   </div>
                )}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                    {meal.category || "Homemade"}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                   <div>
                       <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{meal.foodName || meal.title}</h3>
                       <p className="text-2xl font-bold text-[#F79A19] mt-1">${meal.price}</p>
                   </div>
                   <div className="flex items-center gap-1 text-lg font-bold text-gray-700">
                       <span className="text-yellow-400 text-xl">★</span> {meal.rating || "4.5"}
                   </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {meal.description}
                </p>
                
                {meal.ingredients && meal.ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {meal.ingredients.slice(0, 3).map((ing, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wide bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-semibold">
                                {ing}
                            </span>
                        ))}
                    </div>
                )}
                
                <div className="flex items-center justify-between mt-4 border-t pt-4 border-gray-100">
                    <div className="rounded-full border border-[#FFE52A] px-3 py-1 bg-yellow-50/50">
                        <span className="text-xs font-bold text-gray-700">
                            Chef <span className="text-[#F79A19]">{meal.chefName || "Unknown"}</span>
                        </span>
                    </div>
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

        <div className="text-center mt-12">
          <Link
            to="/meals"
            className="inline-block px-8 py-3 border-2 border-[#FFE52A] text-gray-800 font-bold rounded-full hover:bg-[#FFE52A] transition-colors"
          >
            Browse All Meals
          </Link>
        </div>
      </div>
    </section>
  );
}
