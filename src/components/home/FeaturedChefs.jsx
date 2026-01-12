import { motion } from "framer-motion";
import { Link } from "react-router";
import { Star } from "lucide-react";

const chefs = [
  {
    id: 1,
    name: "Gordon Rumsay",
    specialty: "Authentic Mexican",
    image: "https://i.ibb.co/5X7F4JFR/Rumsy.jpg",
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 2,
    name: "Kenji Sato",
    specialty: "Japanese Fusion",
    image: "https://i.ibb.co/nMdzSBmS/drew-hays-ag-GIKYs4m-Ys-unsplash.jpg",
    rating: 5.0,
    reviews: 89,
  },
  {
    id: 3,
    name: "Jamie Oliver",
    specialty: "Italian Classics",
    image: "https://i.ibb.co/sJgcy5Zd/Jamie.jpg",
    rating: 4.8,
    reviews: 215,
  },
  {
    id: 4,
    name: "Shara Mitchell",
    specialty: "Middle Eastern",
    image: "https://i.ibb.co/tT2PGRp7/104880.jpg",
    rating: 4.9,
    reviews: 156,
  },
];

export default function FeaturedChefs() {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Meet Our <span className="text-amber-glow-500">Top Chefs</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            These passionate home cooks are bringing their family recipes and
            culinary expertise straight to your table.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef, idx) => (
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={14} className="text-amber-glow-500 fill-current" />
                  <span className="font-bold text-sm text-gray-900">
                    {chef.rating}
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-base-content mb-1">
                  {chef.name}
                </h3>
                <p className="text-amber-glow-500 font-medium mb-4">
                  {chef.specialty}
                </p>
                <div className="flex items-center justify-between text-base-content/60 text-sm mb-6">
                  <span>{chef.reviews} Reviews</span>
                  <span>Active Today</span>
                </div>
                <Link
                  to="/meals"
                  className="block w-full py-3 border-2 border-amber-glow-500 text-amber-glow-500 font-bold rounded-xl hover:bg-amber-glow-500 hover:text-white transition-colors"
                >
                  View Menu
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
