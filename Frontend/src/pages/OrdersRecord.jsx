import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard";

const OrdersRecord = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/all");
        setOrders(response.data.orders);
        setLoading(false);
        console.log(response.data.orders);
        
      } catch (err) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // console.log(orders)

  // دالة لتحديث حالة الطلب محلياً بعد نجاح تحديثه في الـ API
  const handleStatusUpdate = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  if (loading) return <p className="text-center mt-6">Loading orders...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;
  if (orders.length === 0)
    return <p className="text-center mt-6">No orders found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Orders Record</h2>
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          onStatusChange={handleStatusUpdate} // تمرير الدالة للكارد
        />
      ))}
    </div>
  );
};

export default OrdersRecord;

// // src/components/OrdersRecord.jsx
// import React, { useEffect, useState } from "react";
// import OrderCard from "./OrderCard";

// const OrdersRecord = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Replace with your backend API URL
//     fetch("https://your-backend-api.com/orders")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch orders");
//         return res.json();
//       })
//       .then((data) => {
//         setOrders(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-center mt-6">Loading orders...</p>;
//   if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

//   if (orders.length === 0)
//     return <p className="text-center mt-6">No orders found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Orders Record</h2>
//       {orders.map((order) => (
//         <OrderCard key={order.id} order={order} />
//       ))}
//     </div>
//   );
// };

// export default OrdersRecord;
