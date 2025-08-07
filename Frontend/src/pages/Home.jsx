import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cart from "./Cart";
import Track from "./Track";
import BoxCard from "../components/BoxCard";
import axios from "axios";

const neonColors = [
  "#FF0080",
  "#7928CA",
  "#00FFF7",
  "#FF7F50",
  "#32CD32",
  "#FFD700",
];

const neonSymbols = ["?", "!", "#", "@", "*", "$", "✦"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const features = [
  {
    id: 1,
    title: "100% Authentic Products",
    description: "We guarantee quality and authenticity in every box.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-pink-500 animate-pulse"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Fast & Secure Shipping",
    description: "We deliver your orders quickly and safely anywhere.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-indigo-500 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11v4H3v-4zm14 0h4l-2 3-2-3z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Our team is ready to help you anytime.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-green-400 animate-pulse"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8a6 6 0 01-12 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v2m-4 4h8" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [boxes, setBoxes] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showTrack, setShowTrack] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    if (token) {
      setUserName(storedName || "");
    }
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/showAllProducts"
        );
        setBoxes(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const symbolsCount = 50;
  const neonSymbolsArr = Array(symbolsCount)
    .fill(0)
    .map(() => {
      const color = neonColors[Math.floor(Math.random() * neonColors.length)];
      const size = randomBetween(28, 88);
      const top = randomBetween(0, 100);
      const left = randomBetween(0, 100);
      const rotate = randomBetween(-45, 45);
      const symbol = neonSymbols[Math.floor(Math.random() * neonSymbols.length)];
      const animationDelay = randomBetween(0, 8);
      return { color, size, top, left, rotate, symbol, animationDelay };
    });

  const handleAddToCart = (box) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to have an account to do this.");
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === box._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === box._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...box, quantity: 1 }];
    });
    toast.success("Item added to cart!");
  };

  const handleConfirmPurchase = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      date: new Date(),
      status: "processing",
      items: cart,
    };

    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
    setShowCart(false);
    setShowTrack(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleTrackClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to have an account to do this.");
      return;
    }
    setShowTrack(true);
  };

  const handleCartClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to have an account to do this.");
      return;
    }
    setShowCart(true);
  };

  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      {/* Neon Symbols Background */}
      {neonSymbolsArr.map((symbol, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none font-extrabold"
          style={{
            color: symbol.color,
            fontSize: `${symbol.size}px`,
            top: `${symbol.top}%`,
            left: `${symbol.left}%`,
            transform: `rotate(${symbol.rotate}deg)`,
            textShadow: `0 0 4px ${symbol.color}, 0 0 10px ${symbol.color}, 0 0 20px ${symbol.color}`,
            animation: `pulseNeon 3s ease-in-out ${symbol.animationDelay}s infinite`,
          }}
        >
          {symbol.symbol}
        </span>
      ))}

      <div className="relative z-10 text-white">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 bg-black bg-opacity-70 relative z-10">
          <h1 className="text-3xl font-extrabold tracking-widest drop-shadow-lg">
            🎁 MysteryBoxes
          </h1>
          <div className="space-x-8 text-lg font-semibold flex items-center">
            <Link to="/" className="hover:text-yellow-300 transition duration-300">
              Home
            </Link>

            <button
              onClick={handleTrackClick}
              className="hover:text-yellow-300 transition duration-300"
            >
              Track
            </button>

            {/* Cart Icon */}
            <div
              className="relative cursor-pointer hover:text-yellow-300 transition duration-300"
              onClick={handleCartClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>

            {userName ? (
              <>
                <span className="ml-4 mr-4">Hello, {userName}</span>
                <button
                  onClick={handleLogout}
                  className="ml-6 bg-red-500 text-white font-bold px-4 py-2 rounded-full shadow hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-6 bg-purple-500 text-black font-bold px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <header className="text-center py-20 relative z-10">
          <h2 className="text-6xl font-extrabold mb-8 text-purple-500 animate-pulse tracking-wide drop-shadow-lg">
            Open Your Mystery Box Now 🎉
          </h2>
          <p className="text-2xl max-w-3xl mx-auto mb-6">
            Every box holds a unique surprise that could change your day!{" "}
            <span className="font-semibold ">Get a sneak peek before you buy.</span>
          </p>
        </header>

        {/* Boxes Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 p-10 relative z-10">
          {boxes.map((box) => (
            <BoxCard key={box._id} box={box} handleAddToCart={handleAddToCart} />
          ))}
        </main>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-yellow-300 rounded-3xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-black">{feature.title}</h3>
              <p className="text-black font-medium">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="text-center py-8 bg-black bg-opacity-80 text-yellow-300 relative z-10">
          <p className="font-semibold">© 2025 MysteryBoxes. All rights reserved.</p>
        </footer>
      </div>

      {/* Shopping Cart Modal */}
      {showCart && (
        <Cart
          cart={cart}
          setCart={setCart}
          onClose={() => setShowCart(false)}
          onConfirmPurchase={handleConfirmPurchase}
        />
      )}

      {/* Track Orders Modal */}
      {showTrack && <Track orders={orders} onClose={() => setShowTrack(false)} />}

      {/* CSS Animations */}
      <style>{`
        @keyframes pulseNeon {
          0%, 100% { opacity: 0.7; text-shadow: 0 0 6px, 0 0 10px; }
          50% { opacity: 1; text-shadow: 0 0 20px, 0 0 25px; }
        }
      `}</style>
    </div>
  );
}
