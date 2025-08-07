import React, { useState } from "react";
import axios from "axios"
const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    size: "",
    price: "",
    description: "",
    stock: "",
    brand: "",
    discount: "",
    tags: "",
    colors: [],
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === "type") {
      setFormData({
        ...formData,
        [name]: value,
        colors: value === "mystery" ? formData.colors : [],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleColorChange = (color) => {
    const newColors = formData.colors.includes(color)
      ? formData.colors.filter((c) => c !== color)
      : [...formData.colors, color];
    setFormData({ ...formData, colors: newColors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      category: formData.type,
      size: formData.size,
      price: Number(formData.price),
      description: formData.description,
      colors: formData.colors.join(","),
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addNewProduct",
        data
      );
      console.log("✅ Product added:", response.data);
      setFormData({
        name: "",
        type: "",
        size: "",
        price: "",
        description: "",
        stock: "",
        brand: "",
        discount: "",
        tags: "",
        colors: [],
      });
      alert("✅ Product submitted successfully!");
    } catch (error) {
      console.error("❌ Submission error:", error.response?.data || error.message);
      alert("❌ Failed to submit product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto relative mt-16 p-8 bg-white rounded shadow-lg">

      <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
        <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition transform focus:scale-105"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
       
        <div>
          <label className="block font-medium mb-1">Type</label>
          <select
            name="type"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition transform focus:scale-105"
            onChange={handleChange}
            value={formData.type}
            required
          >
            <option value="">Select Type</option>
            <option value="electronics">Electronics</option>
            <option value="gaming">Toys & Games</option>
            <option value="beauty">Fashion & Beauty</option>
            <option value="kids">Kids</option>
            <option value="mystery">Mystery</option>
          </select>
        </div>

        {formData.type === "mystery" && (
          <div>
            <label className="block font-medium mb-1">Color Options</label>
            <div className="flex gap-4 mt-1">
              {["Red", "Blue", "Green", "Black", "White"].map((color) => (
                <label key={color} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.colors.includes(color)}
                    onChange={() => handleColorChange(color)}
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block font-medium mb-1">Size</label>
          <select
            name="size"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition transform focus:scale-105"
            onChange={handleChange}
            value={formData.size}
            required
          >
            <option value="">Select Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition transform focus:scale-105"
            onChange={handleChange}
            value={formData.price}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition transform focus:scale-105"
            onChange={handleChange}
            value={formData.description}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition transform focus:scale-105"
            onChange={handleChange}
            value={formData.stock}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition transform focus:scale-105"
            onChange={handleChange}
            value={formData.brand}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Discount (%)</label>
          <input
            type="number"
            name="discount"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition transform focus:scale-105"
            onChange={handleChange}
            value={formData.discount}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition transform focus:scale-105"
            onChange={handleChange}
            value={formData.tags}
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded shadow-lg transition-shadow duration-200"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
