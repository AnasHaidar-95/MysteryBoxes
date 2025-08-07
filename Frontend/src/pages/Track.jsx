import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Track = ({ orders, onClose }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to have an account to do this.");
      onClose();
    }
  }, [onClose]);

  const getStatusSteps = (status) => {
    const steps = [
      { name: 'تم الطلب', status: 'processing' },
      { name: 'تم التغليف', status: 'packed' },
      { name: 'الشحن', status: 'shipped' },
      { name: 'تم التوصيل', status: 'delivered' }
    ];
    
    return steps.map(step => ({
      ...step,
      active: status === 'delivered' || 
              (status === 'shipped' && ['processing', 'packed', 'shipped'].includes(step.status)) ||
              (status === 'packed' && ['processing', 'packed'].includes(step.status)) ||
              (status === 'processing' && step.status === 'processing')
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white w-full max-w-lg p-8 rounded-lg relative border border-purple-500 shadow-lg shadow-purple-500/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-400 font-bold text-2xl transition-colors duration-200"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6 text-yellow-400">Track Your Order</h2>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl">You don't have any orders yet</p>
            <button
              onClick={onClose}
              className="mt-4 text-yellow-400 hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <div key={order.id} className="border-b border-gray-700 pb-6">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold">Order #{order.id.toString().slice(-6)}</h3>
                  <p className="text-yellow-400">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                
                {/* خط التقدم مع الدوائر */}
                <div className="relative pt-6 pb-10">
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gray-600"></div>
                  <div 
                    className="absolute top-8 left-0 h-1 bg-yellow-400 transition-all duration-500"
                    style={{
                      width: order.status === 'processing' ? '25%' :
                             order.status === 'packed' ? '50%' :
                             order.status === 'shipped' ? '75%' : '100%'
                    }}
                  ></div>
                  
                  <div className="flex justify-between relative">
                    {getStatusSteps(order.status).map((step, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full ${step.active ? 'bg-yellow-400' : 'bg-gray-600'} mb-2 flex items-center justify-center`}>
                          {step.active && (
                            <span className="text-black font-bold text-xs">✓</span>
                          )}
                        </div>
                        <span className={`text-sm ${step.active ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-bold mb-2">Items:</h4>
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between py-2">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-700">
                    <span>Total:</span>
                    <span>${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;