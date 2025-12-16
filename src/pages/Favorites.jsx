import { useEffect, useState } from "react";
import axiosInstance from "../hooks/useAxios";
import { toast } from "react-toastify";
import { Trash2, UtensilsCrossed } from "lucide-react";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/favorites")
      .then((res) => setFavorites(res.data))
      .catch(() => toast.error("Failed to load favorites"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, mealName) => {
    const result = await Swal.fire({
      title: "Remove from favorites?",
      text: `"${mealName}" will be removed from your favorites.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/favorites/${id}`);
        setFavorites((prev) => prev.filter((f) => f._id !== id));
        toast.success("Meal removed from favorites successfully.");
      } catch {
        toast.error("Failed to remove favorite");
      }
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          My Favorite Meals
        </h2>

        {loading ? (
          <Loading message="Loading your favorites..." />
        ) : favorites.length === 0 ? (
          <div className="text-center py-20">
            <UtensilsCrossed size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No favorites yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Start adding meals to your favorites!
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Meal Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Chef Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Date Added
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {favorites.map((fav) => (
                    <tr
                      key={fav._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-800">
                          {fav.mealName}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {fav.chefName}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#F79A19] font-semibold">
                          ${fav.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(fav.addedTime).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(fav._id, fav.mealName)}
                          className="inline-flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
