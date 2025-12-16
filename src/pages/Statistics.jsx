import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { auth } from "../firebase.init";
import Loading from "../components/Loading";

export default function Statistics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        //  get fresh ID token
        const token = await auth.currentUser.getIdToken(true);

        const res = await axios.get("http://localhost:3000/statistics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
      } catch (err) {
        console.error("Failed to load statistics", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <Loading message="Loading statistics..." />;

  // Simple data for chart
  const data = [
    { name: "Users", value: stats.totalUsers },
    { name: "Meals", value: stats.totalMeals },
  ];

  return (
    <section className="p-6">
      <h2 className="text-xl font-bold mb-4">Platform Statistics</h2>

      {/* Quick cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700 shadow rounded p-4">
          Total Users: {stats.totalUsers}
        </div>
        <div className="bg-gray-700 shadow rounded p-4">
          Total Meals: {stats.totalMeals}
        </div>
      </div>

      {/* Minimal Bar Chart */}
      <BarChart width={400} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </section>
  );
}
