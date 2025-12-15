import { useEffect, useState } from "react";
import axiosInstance from "../hooks/useAxios";
import { toast } from "react-toastify";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/favorites")
      .then((res) => setFavorites(res.data))
      .catch(() => toast.error("Failed to load favorites"));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/favorites/${id}`);
      setFavorites((prev) => prev.filter((f) => f._id !== id));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Failed to remove favorite");
    }
  };

  return (
    <section className="p-6">
      <h2 className="text-xl font-bold mb-4">My Favorite Meals</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((fav) => (
            <div key={fav._id} className="border rounded p-4 bg-gray-700">
              <h3 className="text-lg font-bold">{fav.mealName}</h3>
              <p>Chef: {fav.chefName}</p>
              <p>Price: ${fav.price}</p>
              <p>Added: {new Date(fav.addedTime).toLocaleString()}</p>
              <button
                onClick={() => handleDelete(fav._id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
