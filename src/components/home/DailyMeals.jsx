import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import axiosInstance from "../../hooks/useAxios";
import Loading from "../Loading";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

// Modern Blur-Scale Entrance
const sectionVariant = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.8, ease: "easeOut" },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export default function DailyMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper for Chef ID Badge
  const getChefBadge = (name, id) => {
    const n = (name || "Unknown").slice(0, 3).toUpperCase();
    const i = (id || "0000").slice(0, 4).toUpperCase();
    return `${n}-${i}`;
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Fetch all meals
        const response = await axiosInstance.get("/meals");
        setMeals(response.data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch meals", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  if (loading) {
    return <Loading message="Loading daily meals..." size="medium" />;
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Daily <span className="text-[#F79A19]">Delights</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-600 max-w-xl mx-auto"
          >
            Explore our top-rated meals cooked fresh daily by passionate chefs
            in your neighborhood.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
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
                <div className="pl-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-white bg-[#FFA239] px-2 py-0.5 rounded-full shadow-sm">
                    ID: {getChefBadge(meal.chefName, meal.chefId || meal._id)}
                  </span>
                </div>
                {/* <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                  {meal.category || "Homemade"}
                </div> */}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                      {meal.foodName || meal.title}
                    </h3>
                    <p className="text-2xl font-bold text-[#F79A19] mt-1">
                      ${meal.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-lg font-bold text-gray-700">
                      <span className="text-yellow-400 text-xl">★</span>{" "}
                      {meal.rating || "4.5"}
                    </div>
                    <div className="flex items-center text-gray-500 text-xs mt-1">
                      <span className="mr-1">📍</span>
                      <span className="truncate">
                        {meal.deliveryArea || "Citywide"}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {meal.description}
                </p>

                {meal.ingredients && meal.ingredients.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {meal.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[10px] uppercase tracking-wide bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-semibold"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 border-t pt-4 border-gray-100">
                  {/* Chef Info */}
                  <div className="flex flex-col items-start gap-1">
                    <div className="pl-1 flex items-center gap-2">
                      <span className="text-xs font-bold text-white bg-[#FFA239] px-2 py-0.5 rounded-full shadow-sm">
                        ID:{" "}
                        {getChefBadge(meal.chefName, meal.chefId || meal._id)}
                      </span>
                    </div>
                    <div className="rounded-full border border-[#FFE52A] px-3 py-1 bg-yellow-50/50">
                      <span className="text-xs font-bold text-gray-700">
                        Chef{" "}
                        <span className="text-[#F79A19]">
                          {meal.chefName || "Unknown"}
                        </span>
                      </span>
                    </div>
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
