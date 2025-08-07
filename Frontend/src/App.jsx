import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import OrdersRecord from "./pages/OrdersRecord";
import HomePage from "./pages/Home";
import Login from "./pages/login";
import Cart from "./pages/Cart";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const location = useLocation();

  const showSidebar = [
    "/dashboard",
    "/add",
    "/orders",
  ].includes(location.pathname);

  return (
    <div className={`flex min-h-screen ${showSidebar ? "bg-gray-100" : ""}`}>
      <Toaster />
      {showSidebar && (
        <>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <div
            className={`sidebar-container fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white p-6 flex flex-col transform transition-transform duration-300 ease-in-out
              ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }
              md:translate-x-0 md:static md:flex-shrink-0`}
          >
            <Sidebar />
          </div>
        </>
      )}

      <div className={`flex-1 ${showSidebar ? "p-4" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={<HomePage cart={cart} setCart={setCart} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/orders" element={<OrdersRecord />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
