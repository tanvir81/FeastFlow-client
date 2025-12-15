import React from "react";
import HeroSection from "../components/home/HeroSection";
import DailyMeals from "../components/home/DailyMeals";
import ReviewsSection from "../components/home/ReviewsSection";
import HowItWorks from "../components/home/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <DailyMeals />
      <HowItWorks />
      <ReviewsSection />
    </div>
  );
}
