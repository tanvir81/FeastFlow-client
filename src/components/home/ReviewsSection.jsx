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
        const response = await axiosInstance.get("/reviews"); // Assuming this returns all reviews
        if (Array.isArray(response.data)) {
             setReviews(response.data.slice(0, 5)); // Take top 5
        } else {
             // Fallback dummy data if endpoint behaves differently
             setReviews([
                { _id: 1, reviewerName: "John Doe", comment: "The food was absolutely amazing! Delivered hot and fresh.", rating: 5, reviewerImage: "https://i.pravatar.cc/150?u=1" },
                { _id: 2, reviewerName: "Jane Smith", comment: "Great service and delicious home-cooked flavor.", rating: 4, reviewerImage: "https://i.pravatar.cc/150?u=2" },
                { _id: 3, reviewerName: "Mike Johnson", comment: "Loved the variety of meals available. Highly recommend!", rating: 5, reviewerImage: "https://i.pravatar.cc/150?u=3" }
             ]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
         // Fallback dummy data on error
         setReviews([
            { _id: 1, reviewerName: "John Doe", comment: "The food was absolutely amazing! Delivered hot and fresh.", rating: 5, reviewerImage: "https://i.pravatar.cc/150?u=1" },
            { _id: 2, reviewerName: "Jane Smith", comment: "Great service and delicious home-cooked flavor.", rating: 4, reviewerImage: "https://i.pravatar.cc/150?u=2" },
            { _id: 3, reviewerName: "Mike Johnson", comment: "Loved the variety of meals available. Highly recommend!", rating: 5, reviewerImage: "https://i.pravatar.cc/150?u=3" }
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
  
  // Auto-slide effect
  useEffect(() => {
      if (reviews.length > 0) {
          const interval = setInterval(nextSlide, 5000);
          return () => clearInterval(interval);
      }
  }, [reviews.length]);

  if (loading) return null;

  return (
    <section className="py-20 bg-orange-50 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          What Our <span className="text-[#F79A19]">Customers</span> Say
        </h2>

        <div className="relative max-w-3xl mx-auto h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {reviews.length > 0 && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-xl border border-orange-100"
              >
                <img
                  src={reviews[currentIndex].reviewerImage || "https://i.ibb.co/default-avatar.png"}
                  alt={reviews[currentIndex].reviewerName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#FFE52A] mb-4 shadow-md"
                />
                
                <div className="flex gap-1 mb-4 text-[#F79A19]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < reviews[currentIndex].rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 text-lg italic mb-6">
                  "{reviews[currentIndex].comment}"
                </p>

                <h4 className="font-bold text-xl text-gray-900">
                  {reviews[currentIndex].reviewerName}
                </h4>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 btn btn-circle bg-white text-[#F79A19] border border-[#F79A19] hover:bg-[#F79A19] hover:text-white shadow-lg z-10"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 btn btn-circle bg-white text-[#F79A19] border border-[#F79A19] hover:bg-[#F79A19] hover:text-white shadow-lg z-10"
          >
            ❯
          </button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "bg-[#F79A19] w-6" : "bg-gray-300"
                    }`}
                />
            ))}
        </div>
      </div>
    </section>
  );
}
