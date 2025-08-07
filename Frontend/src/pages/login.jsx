import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(res.data.message);

      if (isLogin) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.admin) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
        localStorage.setItem("userName", res.data.name);
      } else {
        // تسجيل تلقائي بعد التسجيل
        const loginRes = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );
        const token = loginRes.data.token;
        localStorage.setItem("token", token);
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.admin) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
        localStorage.setItem("userName", loginRes.data.name);
      }
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-gray-900 p-10 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Login to MysteryBoxes" : "Register for MysteryBoxes"}
        </h2>

        {message && (
          <p className="text-red-400 text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded font-semibold"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            className="text-blue-400 underline hover:text-blue-300"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
