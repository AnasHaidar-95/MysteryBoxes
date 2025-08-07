import React from "react";

export default function BoxCard({ box, handleAddToCart }) {
  return (
    <div
      className={`w-86 h-120 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-tr from-neutral-800 via-zinc-700 to-gray-600 flex flex-col transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-purple-500/40`}
    >
      <img
        src={box.image || '/images/default-product.jpg'}
        alt={box.name}
        className="w-full h-56 object-cover opacity-90"
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-bold mb-2">{box.name}</h3>
          <p className="text-sm text-gray-200 mb-4">{box.description}</p>
          <p className="text-lg mb-2">Price: ${box.price}</p>
        </div>
        <button
          onClick={() => handleAddToCart(box)}
          className="w-full bg-purple-400 hover:bg-purple-600 text-black font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}