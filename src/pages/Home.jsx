// src/pages/Home.jsx
import { Link } from "react-router";

export default function Home() {
  return (
    <section className="bg-gradient-to-r from-red-500 to-orange-400 text-white min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to FeastFlow
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Discover daily meals, share reviews, and enjoy food from chefs around
          you.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/meals" className="btn btn-primary">
            Explore Meals
          </Link>
          <Link to="/reviews" className="btn btn-outline btn-light">
            See Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
