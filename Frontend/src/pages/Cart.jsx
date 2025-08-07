import React from "react";
import toast from "react-hot-toast";

const Cart = ({ cart, setCart, onClose, onConfirmPurchase }) => {
  // دالة لتغيير الكمية
  const handleQuantityChange = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // دالة إزالة العنصر
  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // دالة تأكيد الشراء
  const handleConfirm = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to have an account to do this.");
      return;
    }
    if (onConfirmPurchase) onConfirmPurchase();
  };

  // حساب المجموع الكلي
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={onClose} // إغلاق عند النقر خارج الصندوق
    >
      <div
        className="bg-gradient-to-br from-gray-800 to-gray-900 text-white w-full max-w-lg p-8 rounded-lg relative border border-purple-500 shadow-lg shadow-purple-500/20"
        onClick={(e) => e.stopPropagation()} // منع إغلاق عند النقر داخل الصندوق
      >
        {/* زر الإغلاق المعدل */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-400 font-bold text-2xl transition-colors duration-200 focus:outline-none"
          aria-label="Close cart"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6 text-yellow-400">Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl">Your cart is empty</p>
            <button
              onClick={onClose}
              className="mt-4 text-yellow-400 hover:underline focus:outline-none"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            <div className="max-h-96 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-4 border-b border-gray-700"
                >
                  <div className="flex items-center gap-4 w-1/2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="truncate">
                      <h3 className="font-bold text-lg truncate">
                        {item.name}
                      </h3>
                      <p className="text-yellow-400">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(item.id, -1);
                        }}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-xl font-bold transition-colors duration-200 focus:outline-none"
                      >
                        -
                      </button>
                      <span className="px-3 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(item.id, 1);
                        }}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-xl font-bold transition-colors duration-200 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item.id);
                      }}
                      className="ml-2 text-red-500 hover:text-red-400 text-xl transition-colors duration-200 focus:outline-none"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex justify-between text-xl mb-2">
                <span>Subtotal:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg mb-4 text-gray-400">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-yellow-400 mt-4 mb-6">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg shadow-lg transition-colors duration-200"
            >
              Confirm Purchase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
