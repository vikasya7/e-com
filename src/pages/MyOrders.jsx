
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";



export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/v1/orders/my-orders");
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    try {
      await api.patch(`/api/v1/orders/${id}/cancel`);
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }
  if (!orders.length) {
    return <div className="p-10 text-center">No orders yet.</div>;
  }

  return (
   <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
    <h1 className="text-3xl font-bold mb-10">My Orders</h1>

    <div className="space-y-8">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
        >

          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

            <div>
              <p className="text-xs text-gray-400 tracking-wider">
                ORDER ID
              </p>
              <p className="font-semibold text-gray-800">
                #{order._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <StatusBadge status={order.orderStatus} />
          </div>

          {/* Order Preview Items */}
          <div className="flex gap-3 mb-6 overflow-x-auto">
            {order.orderItems.slice(0, 4).map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover border"
              />
            ))}

            {order.orderItems.length > 4 && (
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-600">
                +{order.orderItems.length - 4}
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-xl font-bold text-gray-800">
                ₹{order.totalPrice}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/my-orders/${order._id}`)}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                View Details
              </button>

              {order.orderStatus === "placed" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  Cancel
                </button>
              )}
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
  );
}


function StatusBadge({ status }) {
  const colors = {
    placed: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    packed: "bg-purple-100 text-purple-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700"
  };

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

