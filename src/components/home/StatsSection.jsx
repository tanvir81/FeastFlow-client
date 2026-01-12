import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", orders: 4000 },
  { name: "Feb", orders: 3000 },
  { name: "Mar", orders: 5000 },
  { name: "Apr", orders: 2780 },
  { name: "May", orders: 1890 },
  { name: "Jun", orders: 2390 },
  { name: "Jul", orders: 3490 },
  { name: "Aug", orders: 4000 },
  { name: "Sep", orders: 5500 },
  { name: "Oct", orders: 7000 },
  { name: "Nov", orders: 8500 },
  { name: "Dec", orders: 10000 },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text & Counters */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-base-content">
              Growing <span className="text-amber-glow-500">Every Day</span>
            </h2>
            <p className="text-lg text-base-content/70">
              Join the fastest-growing community of home food lovers. See how
              we're connecting kitchens across the city.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {[
                { label: "Happy Customers", value: "50k+" },
                { label: "Active Chefs", value: "1,200+" },
                { label: "Meals Delivered", value: "2M+" },
                { label: "Cities Served", value: "15+" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-base-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-3xl font-bold text-amber-glow-500 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-base-content/80 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Modern Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-base-200 p-8 rounded-3xl shadow-xl border border-base-300 h-[400px]"
          >
            <h3 className="text-xl font-bold text-base-content mb-6">
              Monthly Orders
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f69309" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f69309" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-base-100)",
                    borderColor: "var(--color-base-300)",
                    borderRadius: "8px",
                    color: "var(--color-base-content)",
                  }}
                  itemStyle={{ color: "#f69309" }}
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#f69309"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
