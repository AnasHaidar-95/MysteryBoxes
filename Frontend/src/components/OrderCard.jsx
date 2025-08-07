
// // // // // src/components/OrderCard.jsx
// // // // import React from "react";

// // // // const OrderCard = ({ order }) => {
// // // //   return (
// // // //     <div className="bg-white shadow-md rounded p-4 mb-4 border border-gray-200">
// // // //       <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
// // // //       <p>
// // // //         <span className="font-medium">Customer:</span> {order.customerName}
// // // //       </p>
// // // //       <p>
// // // //         <span className="font-medium">Product:</span> {order.productName}
// // // //       </p>
// // // //       <p>
// // // //         <span className="font-medium">Quantity:</span> {order.quantity}
// // // //       </p>
// // // //       <p>
// // // //         <span className="font-medium">Price:</span> ${order.price}
// // // //       </p>
// // // //       <p>
// // // //         <span className="font-medium">Status:</span> {order.status}
// // // //       </p>
// // // //       <p>
// // // //         <span className="font-medium">Ordered on:</span>{" "}
// // // //         {new Date(order.orderDate).toLocaleDateString()}
// // // //       </p>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default OrderCard;

// // // import React from "react";

// // // const OrderCard = ({ order }) => {
// // //   return (
// // //     <div className="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-100 hover:shadow-md transition">
// // //       <div className="flex items-center justify-between mb-4">
// // //         <h3 className="text-xl font-bold text-gray-800">Order #{order._id}</h3>
// // //         <span
// // //           className={`px-3 py-1 text-sm font-medium rounded-full ${
// // //             order.status === "Delivered"
// // //               ? "bg-green-100 text-green-800"
// // //               : order.status === "Processing"
// // //               ? "bg-yellow-100 text-yellow-800"
// // //               : "bg-gray-100 text-gray-800"
// // //           }`}
// // //         >
// // //           {order.status}
// // //         </span>
// // //       </div>

// // //       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
// // //         <div>
// // //           <span className="font-semibold">Customer:</span>
// // //           <p>{order.customerName}</p>
// // //         </div>

// // //         <div>
// // //           <span className="font-semibold">Product:</span>
// // //           <p>{order.productName}</p>
// // //         </div>

// // //         <div>
// // //           <span className="font-semibold">Quantity:</span>
// // //           <p>{order.quantity}</p>
// // //         </div>

// // //         <div>
// // //           <span className="font-semibold">Total Price:</span>
// // //           <p>${(order.price * order.quantity).toFixed(2)}</p>
// // //         </div>

// // //         <div>
// // //           <span className="font-semibold">Ordered On:</span>
// // //           <p>{new Date(order.orderDate).toLocaleDateString()}</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default OrderCard;

// // import React from "react";

// // const OrderCard = ({ order }) => {
// //   return (
// //     <div className="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-100 hover:shadow-md transition">
// //       <div className="flex items-center justify-between mb-4">
// //         <h3 className="text-xl font-bold text-gray-800">Order #{order._id}</h3>
// //         <span
// //           className={`px-3 py-1 text-sm font-medium rounded-full ${
// //             order.status === "Delivered"
// //               ? "bg-green-100 text-green-800"
// //               : order.status === "Processing"
// //               ? "bg-yellow-100 text-yellow-800"
// //               : "bg-gray-100 text-gray-800"
// //           }`}
// //         >
// //           {order.status}
// //         </span>
// //       </div>

// //       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
// //         <div>
// //           <p>
// //             <span className="font-semibold text-gray-800">- Customer: </span>
// //             {order.customerName}{" "}
// //           </p>
// //         </div>

// //         <div>
// //           <p>
// //             <span className="font-semibold text-gray-800">- Product : </span>
// //             {order.productName}{" "}
// //           </p>
// //         </div>

// //         <div>
// //           <p>
// //             <span className="font-semibold text-gray-800">- Quantity : </span>
// //             {order.quantity}{" "}
// //           </p>
// //         </div>

// //         <div>
// //           <p>
// //             <span className="font-semibold text-gray-800">- Total Price :</span>
// //             ${(order.price * order.quantity).toFixed(2)}{" "}
// //           </p>
// //         </div>

// //         <div>
// //           <p>
// //             <span className="font-semibold text-gray-800">- Ordered On: </span>
// //             {new Date(order.orderDate).toLocaleDateString()}{" "}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrderCard;

// import React, { useState } from "react";
// import axios from "axios";

// const OrderCard = ({ order }) => {
//   const [status, setStatus] = useState(order.status);
//   const [loading, setLoading] = useState(false);

//   const handleStatusChange = async (e) => {
//     const newStatus = e.target.value;
//     setStatus(newStatus);
//     setLoading(true);

//     try {
//       await axios.put(`/api/admin/orders/${order._id}/status`, {
//         status: newStatus,
//       });
//     } catch (error) {
//       console.error("Failed to update order status:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-100 hover:shadow-md transition">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-xl font-bold text-gray-800">Order #{order._id}</h3>
//         <span
//           className={`px-3 py-1 text-sm font-medium rounded-full ${
//             status === "Delivered"
//               ? "bg-green-100 text-green-800"
//               : status === "Processing"
//               ? "bg-yellow-100 text-yellow-800"
//               : "bg-gray-100 text-gray-800"
//           }`}
//         >
//           {status}
//         </span>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
//         <div>
//           <p>
//             <span className="font-semibold text-gray-800">- Customer: </span>
//             {order.customerName}
//           </p>
//         </div>

//         <div>
//           <p>
//             <span className="font-semibold text-gray-800">- Product: </span>
//             {order.productName}
//           </p>
//         </div>

//         <div>
//           <p>
//             <span className="font-semibold text-gray-800">- Quantity: </span>
//             {order.quantity}
//           </p>
//         </div>

//         <div>
//           <p>
//             <span className="font-semibold text-gray-800">- Total Price: </span>
//             ${(order.price * order.quantity).toFixed(2)}
//           </p>
//         </div>

//         <div>
//           <p>
//             <span className="font-semibold text-gray-800">- Ordered On: </span>
//             {new Date(order.orderDate).toLocaleDateString()}
//           </p>
//         </div>
//       </div>

//       {/* Admin status control */}
//       <div className="mt-4">
//         <p className="font-semibold text-gray-700 mb-2">Change Status:</p>
//         <div className="flex gap-6">
//           <label className="flex items-center gap-2 text-sm text-gray-600">
//             <input
//               type="radio"
//               name={`status-${order._id}`}
//               value="Processing"
//               checked={status === "Processing"}
//               onChange={handleStatusChange}
//               disabled={loading}
//               className="accent-yellow-500"
//             />
//             Processing
//           </label>

//           <label className="flex items-center gap-2 text-sm text-gray-600">
//             <input
//               type="radio"
//               name={`status-${order._id}`}
//               value="Delivered"
//               checked={status === "Delivered"}
//               onChange={handleStatusChange}
//               disabled={loading}
//               className="accent-green-600"
//             />
//             Delivered
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;

import React, { useState } from "react";
import axios from "axios";

const statusOptions = [
  "received",
  "in_transit",
  "out of delivery",
  "delivered",
];

const statusColors = {
  pending: "bg-gray-100 text-gray-800",
  in_transit: "bg-yellow-100 text-yellow-800",
  Received: "bg-blue-100 text-blue-800",
  Out_for_Delivery: "bg-green-100 text-green-800",
  delivered: "bg-red-100 text-red-800",
};

const OrderCard = ({ order }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);
    try {
      await axios.patch("http://localhost:5000/api/editReq", {
        reqId: order._id,
        status: newStatus,
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
      setStatus(order.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-100 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Order #{order._id}</h3>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            statusColors[status] || "bg-gray-100 text-gray-800"
          }`}
        >
         {status.replace("_", " ")}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
        <div>
          <p>
            <span className="font-semibold text-gray-800">- Customer: </span>
            {order.customerName}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-800">- Product: </span>
            {order.productName}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-800">- Quantity: </span>
            {order.quantity}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-800">- Total Price: </span>
            ${(order.price * order.quantity).toFixed(2)}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-800">- Ordered On: </span>
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Admin status control */}
      <div className="mt-4">
        <p className="font-semibold text-gray-700 mb-2">Change Status:</p>
        <div className="flex flex-wrap gap-4">
          {statusOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="radio"
                name={`status-${order._id}`}
                value={option}
                checked={status === option}
                onChange={handleStatusChange}
                disabled={loading}
                className="accent-blue-600"
              />
              {option
  .replace(/_/g, " ")
  .replace(/\b\w/g, (l) => l.toUpperCase())
}
              {/* النتيجة مثل: "Out For Delivery" */}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
