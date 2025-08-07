import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const ProductsSalesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // جلب كل المنتجات
        const productsRes = await axios.get("http://localhost:5000/api/showAllProducts");
        const products = productsRes.data || [];

        // جلب كل التوصيلات (Deliveries)
        const deliveriesRes = await axios.get("http://localhost:5000/api/showAllDeliveries");
        const deliveries = deliveriesRes.data || [];

        // حساب عدد المبيعات لكل منتج (فقط التوصيلات "delivered")
        const salesCountByProduct = {};
        deliveries.forEach(delivery => {
          if (delivery.status === "delivered") {
            salesCountByProduct[delivery.productId] = (salesCountByProduct[delivery.productId] || 0) + 1;
          }
        });

        // تجهيز بيانات الشارت: اسم المنتج وعدد المبيعات
        const chartData = products.map(product => ({
          name: product.name,
          sales: salesCountByProduct[product._id] || 0,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data for sales chart:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">مبيعات المنتجات</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductsSalesChart;
