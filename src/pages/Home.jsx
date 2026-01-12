import React from "react";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import CuisineCategories from "../components/home/CuisineCategories";
import DailyMeals from "../components/home/DailyMeals";
import HowItWorks from "../components/home/HowItWorks";
import FeaturedChefs from "../components/home/FeaturedChefs";
import ReviewsSection from "../components/home/ReviewsSection";
import AccordionSection from "../components/home/AccordionSection";
import Newsletter from "../components/home/Newsletter";
import CtaSection from "../components/home/CtaSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      <HeroSection />
      {/* 2. Stats Section - Build trust early */}
      <StatsSection />
      {/* 3. Categories - Discovery */}
      <CuisineCategories />
      {/* 4. Daily Meals - Core Product */}
      <DailyMeals />
      {/* 5. How It Works - Education */}
      <HowItWorks />
      {/* 6. Featured Chefs - Credibility */}
      <FeaturedChefs />
      {/* 7. Reviews - Social Proof */}
      <ReviewsSection />
      {/* 8. FAQ - Information */}
      <AccordionSection />
      {/* 9. Newsletter - Retention */}
      <Newsletter />
      {/* 10. CTA - Final Conversion */}
      <CtaSection />
    </div>
  );
}
