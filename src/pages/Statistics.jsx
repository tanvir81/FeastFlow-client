import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { auth } from "../firebase.init";
import Loading from "../components/Loading";
import { DollarSign, Users, Clock, CheckCircle, Utensils } from "lucide-react";

export default function Statistics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
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

  // Prepare chart data
  const chartData = [
    {
      name: "Users",
      value: stats.totalUsers || 0,
      color: "#0088FE",
    },
    {
      name: "Meals",
      value: stats.totalMeals || 0,
      color: "#FFE52A",
    },
    {
      name: "Pending",
      value: stats.ordersPending || 0,
      color: "#FFA239",
    },
    {
      name: "Delivered",
      value: stats.ordersDelivered || 0,
      color: "#00C49F",
    },
  ];

  const StatCard = ({ icon: Icon, label, value, color, prefix = "" }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center justify-between transition-transform hover:scale-105">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-bold text-gray-800">
          {prefix}
          {value.toLocaleString()}
        </h3>
      </div>
      <div className={`p-3 rounded-full ${color} shadow-sm`}>
        <Icon className="w-8 h-8 text-white accent-icon" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Platform Statistics
        </h2>

        {/* Metric Cards Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <StatCard
            icon={DollarSign}
            label="Total Payment"
            value={stats.totalPayments || 0}
            prefix="$"
            color="bg-green-600"
          />
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.totalUsers || 0}
            color="bg-blue-500"
          />
          <StatCard
            icon={Utensils}
            label="Total Meals"
            value={stats.totalMeals || 0}
            color="bg-[#FFE52A]"
          />
          <StatCard
            icon={Clock}
            label="Orders Pending"
            value={stats.ordersPending || 0}
            color="bg-[#FFA239]"
          />
          <StatCard
            icon={CheckCircle}
            label="Orders Delivered"
            value={stats.ordersDelivered || 0}
            color="bg-emerald-500"
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-[#FFE52A] pl-3">
            Overview
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={60}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 14 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 14 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
