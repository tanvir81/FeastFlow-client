import { motion } from "framer-motion";
import { Link } from "react-router";

const categories = [
  { id: 1, name: "Italian", image: "/italian.jpg", count: "120+ Meals" },
  { id: 2, name: "Asian", image: "/asian.jpg", count: "85+ Meals" },
  { id: 3, name: "Mexican", image: "/mexican.jpg", count: "60+ Meals" },
  { id: 4, name: "Healthy", image: "/healthy.jpg", count: "200+ Meals" },
  { id: 5, name: "Desserts", image: "/desserts.jpg", count: "50+ Meals" },
  { id: 6, name: "Vegan", image: "/vagen.jpg", count: "45+ Meals" },
];

export default function CuisineCategories() {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Browse by <span className="text-amber-glow-500">Cuisine</span>
          </h2>
          <p className="text-lg text-base-content/70">
            Find exactly what you're craving from our diverse selection.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link
                to="/meals"
                className="group relative block h-64 w-full overflow-hidden rounded-2xl cursor-pointer"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-1 transform transition-transform duration-300 group-hover:-translate-y-1">
                    {cat.name}
                  </h3>
                  <span className="text-sm text-gray-200 opacity-80 transform transition-transform duration-300 group-hover:-translate-y-1">
                    {cat.count}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
