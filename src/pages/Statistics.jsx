import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/statistics`, {
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
      fill: "#0088FE", // Blue
    },
    {
      name: "Meals",
      value: stats.totalMeals || 0,
      fill: "#00C49F", // Teal
    },
    {
      name: "Pending",
      value: stats.ordersPending || 0,
      fill: "#FFBB28", // Yellow
    },
    {
      name: "Delivered",
      value: stats.ordersDelivered || 0,
      fill: "#FF8042", // Orange
    },
  ];

  const StatCard = ({ icon: Icon, label, value, color, prefix = "" }) => (
    <div className="bg-base-100 rounded-xl shadow-md p-6 border border-gray-100 flex items-center justify-between transition-transform hover:scale-105">
      <div>
        <p className="text-base-content/60 text-sm font-medium uppercase tracking-wider mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-bold text-base-content">
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
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center text-base-content">
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
            color="bg-amber-glow-300"
          />
          <StatCard
            icon={Clock}
            label="Orders Pending"
            value={stats.ordersPending || 0}
            color="bg-amber-glow-400"
          />
          <StatCard
            icon={CheckCircle}
            label="Orders Delivered"
            value={stats.ordersDelivered || 0}
            color="bg-emerald-500"
          />
        </div>

        {/* Chart Section */}
        <div className="bg-base-100 rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-base-content mb-6 border-l-4 border-amber-glow-300 pl-3">
            Overview
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontWeight="bold"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-base-100)",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    color: "var(--color-base-content)",
                  }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
