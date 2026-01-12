import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Home-Cooked Meals: Why It Matters",
      excerpt:
        "Discover the benefits of home-cooked food and why it's making a comeback in modern dining culture.",
      image: "/hero-1.jpg",
      category: "Food Culture",
      author: "Sarah Johnson",
      date: "Jan 5, 2026",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Meet Our Chefs: Stories Behind the Dishes",
      excerpt:
        "Get to know the passionate chefs who bring authentic flavors to your table every day.",
      image: "/hero-2.jpg",
      category: "Chef Stories",
      author: "Michael Chen",
      date: "Jan 3, 2026",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "5 Tips for Ordering the Perfect Meal",
      excerpt:
        "Learn how to choose meals that match your taste preferences and dietary needs.",
      image: "/hero-3.jpg",
      category: "Tips & Tricks",
      author: "Emma Davis",
      date: "Dec 28, 2025",
      readTime: "3 min read",
    },
    {
      id: 4,
      title: "Sustainability in Home Cooking",
      excerpt:
        "How our platform supports sustainable food practices and local economies.",
      image: "/chef.jpg",
      category: "Sustainability",
      author: "David Kumar",
      date: "Dec 20, 2025",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "Seasonal Ingredients: What's Fresh This Month",
      excerpt:
        "Explore the best seasonal ingredients and meals available on FeastFlow.",
      image: "/hero-1.jpg",
      category: "Food Culture",
      author: "Lisa Martinez",
      date: "Dec 15, 2025",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "Building a Career as a Home Chef",
      excerpt:
        "Tips and insights for aspiring chefs looking to start their culinary journey.",
      image: "/hero-2.jpg",
      category: "Chef Stories",
      author: "James Wilson",
      date: "Dec 10, 2025",
      readTime: "7 min read",
    },
  ];

  const categories = [
    "all",
    "Food Culture",
    "Chef Stories",
    "Tips & Tricks",
    "Sustainability",
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-glow-500 to-amber-glow-600 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              FeastFlow Blog
            </h1>
            <p className="text-xl md:text-2xl">
              Stories, tips, and insights from the world of home-cooked cuisine
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-base-200 sticky top-20 z-40 border-b border-base-300">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-amber-glow-500 text-white shadow-lg"
                    : "bg-base-100 text-base-content hover:bg-amber-glow-100 border border-base-300"
                }`}
              >
                {category === "all" ? "All Posts" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-amber-glow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-base-content mb-3 line-clamp-2 group-hover:text-amber-glow-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-base-content/70 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-base-content/60 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-base-content/60">
                      {post.readTime}
                    </span>
                    <button className="flex items-center gap-2 text-amber-glow-500 font-semibold hover:gap-3 transition-all">
                      Read More
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-base-content/60">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Stay Updated
            </h2>
            <p className="text-base-content/70 mb-8">
              Subscribe to our newsletter for the latest stories, recipes, and
              chef spotlights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-amber-glow-500"
              />
              <button className="bg-amber-glow-500 text-white font-bold px-8 py-3 rounded-full hover:bg-amber-glow-600 transition shadow-lg">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
