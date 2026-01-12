import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxios";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosInstance = useAxios;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get("/reviews");
        if (Array.isArray(response.data)) {
          setReviews(response.data.slice(0, 5)); // Take top 5
        } else {
          setReviews([
            {
              _id: 1,
              reviewerName: "John Doe",
              comment:
                "The food was absolutely amazing! Delivered hot and fresh.",
              rating: 5,
              reviewerImage: "https://i.pravatar.cc/150?u=1",
            },
            {
              _id: 2,
              reviewerName: "Jane Smith",
              comment: "Great service and delicious home-cooked flavor.",
              rating: 4,
              reviewerImage: "https://i.pravatar.cc/150?u=2",
            },
            {
              _id: 3,
              reviewerName: "Mike Johnson",
              comment:
                "Loved the variety of meals available. Highly recommend!",
              rating: 5,
              reviewerImage: "https://i.pravatar.cc/150?u=3",
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        // Fallback
        setReviews([
          {
            _id: 1,
            reviewerName: "John Doe",
            comment:
              "The food was absolutely amazing! Delivered hot and fresh.",
            rating: 5,
            reviewerImage: "https://i.pravatar.cc/150?u=1",
          },
          {
            _id: 2,
            reviewerName: "Jane Smith",
            comment: "Great service and delicious home-cooked flavor.",
            rating: 4,
            reviewerImage: "https://i.pravatar.cc/150?u=2",
          },
          {
            _id: 3,
            reviewerName: "Mike Johnson",
            comment: "Loved the variety of meals available. Highly recommend!",
            rating: 5,
            reviewerImage: "https://i.pravatar.cc/150?u=3",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [axiosInstance]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  if (loading) return null;

  return (
    <section className="py-12 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-base-200 rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[50%] bg-amber-glow-500 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[50%] bg-amber-glow-500 rounded-full blur-[100px]"></div>
          </div>

          <h2 className="text-4xl font-bold text-base-content mb-8 relative z-10">
            What Our <span className="text-amber-glow-500">Customers</span> Say
          </h2>

          <div className="relative w-full max-w-4xl mx-auto z-10">
            <AnimatePresence mode="wait">
              {reviews.length > 0 && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="bg-base-100 border border-base-content/5 rounded-3xl shadow-xl overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row h-auto md:h-[220px]">
                    {/* Image Section (Left) */}
                    <div className="w-full md:w-[25%] relative h-[200px] md:h-full overflow-hidden p-3">
                      <img
                        src={
                          reviews[currentIndex].reviewerImage ||
                          "https://i.ibb.co/default-avatar.png"
                        }
                        alt={reviews[currentIndex].reviewerName}
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-end p-6 pointer-events-none">
                         <div className="text-white z-10 drop-shadow-md">
                            <p className="font-bold text-sm hidden xl:block">{reviews[currentIndex].reviewerName}</p>
                         </div>
                      </div>
                       <div className="absolute bottom-3 left-3 right-3 h-1/2 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl pointer-events-none"></div>
                    </div>

                    {/* Content Section (Right) */}
                    <div className="w-full md:w-[75%] p-5 md:p-6 flex flex-col justify-center relative bg-base-100 text-left">
                      <div className="absolute top-4 right-4 text-amber-glow-500/10">
                         <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56926 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
                         </svg>
                      </div>

                      <div className="flex gap-0.5 mb-2 text-amber-glow-500 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < reviews[currentIndex].rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-bold text-base-content leading-tight mb-2 line-clamp-2">
                        "{reviews[currentIndex].comment}"
                      </h3>

                      <div className="h-1 w-10 bg-amber-glow-500 rounded-full mb-2"></div>

                      <p className="text-base-content/60 text-xs">
                         Experience the taste of home with FeastFlow.
                      </p>

                      {/* Navigation Buttons */}
                      <div className="flex gap-2 mt-4">
                         <button
                          onClick={prevSlide}
                          className="btn btn-xs btn-circle btn-outline border-base-content/20 hover:bg-amber-glow-500 hover:border-amber-glow-500 hover:text-white"
                        >
                          ❮
                        </button>
                        <button
                          onClick={nextSlide}
                          className="btn btn-xs btn-circle btn-outline border-base-content/20 hover:bg-amber-glow-500 hover:border-amber-glow-500 hover:text-white"
                        >
                          ❯
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
