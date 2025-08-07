// src/pages/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DashboardHome = () => {
  const [chartType, setChartType] = useState("category");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, usersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/showAllProducts"),
          axios.get("http://localhost:5000/api/showAllUsers"),
        ]);

        const productsData = productsRes.data || [];
        const usersData = usersRes.data || [];

        setProducts(productsData);
        setUsers(usersData);

        const totalRevenue = productsData.reduce((acc, p) => acc + p.price, 0);

        setStats({
          totalProducts: productsData.length,
          totalRevenue,
          totalOrders: 0, // يمكن حسابه لاحقًا من جدول الطلبات
          totalUsers: usersData.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const prepareChartData = () => {
    const counts = {};

    if (chartType === "category") {
      products.forEach((p) => {
        counts[p.category] = (counts[p.category] || 0) + 1;
      });
    } else if (chartType === "size") {
      products.forEach((p) => {
        counts[p.size] = (counts[p.size] || 0) + 1;
      });
    } else if (chartType === "color") {
      products.forEach((p) => {
        counts[p.color] = (counts[p.color] || 0) + 1;
      });
    } else if (chartType === "usersByMonth") {
      users.forEach((u) => {
        const date = new Date(u.createdAt);
        const month = date.toLocaleString("en-US", { month: "short", year: "numeric" });
        counts[month] = (counts[month] || 0) + 1;
      });

      return Object.entries(counts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => new Date(`${a.name}`) - new Date(`${b.name}`));
    }

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  return (
    <div className="p-4 sm:p-6 space-y-8">
      {/* كروت الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard label="Total Users" value={stats.totalUsers} color="text-blue-600" />
        <StatCard label="Products" value={stats.totalProducts} color="text-green-600" />
        <StatCard label="Total Orders" value={stats.totalOrders} color="text-yellow-600" />
        <StatCard label="Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} color="text-purple-600" />
      </div>

      {/* أزرار نوع المخطط */}
      <div className="space-x-2 mt-8 mb-4">
        {["category", "size", "color", "usersByMonth"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded ${
              chartType === type ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setChartType(type)}
          >
            {type === "usersByMonth"
              ? "Users by Month"
              : `By ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </button>
        ))}
      </div>

      {/* الشارت */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg font-semibold mb-4 text-gray-700">
          {chartType === "usersByMonth"
            ? "Users Registered by Month"
            : `Products by ${chartType.charAt(0).toUpperCase() + chartType.slice(1)}`}
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={prepareChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// كرت إحصائية
const StatCard = ({ label, value, color }) => (
  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center sm:text-left">
    <p className="text-gray-500 text-sm">{label}</p>
    <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
  </div>
);

export default DashboardHome;
