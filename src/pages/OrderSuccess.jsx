import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/api";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/api/v1/orders/${id}`);
        setOrder(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Preparing your crunchy confirmation 🍿...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order not found.
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#FFF8EE] py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="text-6xl text-center mb-6"
        >
          🎉
        </motion.div>

        <h1 className="text-3xl font-bold text-center text-[#6B3E26] mb-2">
          Order Confirmed!
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Thank you for choosing Squirll Bites 🍿
        </p>
        {/* Order Summary Box */}
        <div className="border rounded-2xl p-6 mb-8 bg-gray-50">
          <p className="text-sm text-gray-500 mb-1">Order ID</p>
          <p className="font-semibold mb-4">{order._id}</p>

          <p className="text-sm text-gray-500 mb-1">Payment Method</p>
          <p className="font-medium mb-4">{order.paymentInfo.method}</p>

          <p className="text-sm text-gray-500 mb-1">Total Paid</p>
          <p className="font-bold text-[#6B3E26] text-lg">
            ₹{order.totalPrice}
          </p>
        </div>
        {/* Items */}
        <div className="space-y-4 mb-8">
          {order.orderItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.weight} • Qty {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Delivery Info */}
        <div className="bg-[#FFF3E0] rounded-xl p-4 text-sm text-[#6B3E26] mb-8">
          🚚 Estimated delivery in 3–5 business days.
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-[#6B3E26] text-white font-semibold hover:bg-[#5A321D] transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/my-orders"
            className="px-6 py-3 rounded-full border border-[#6B3E26] text-[#6B3E26] font-semibold hover:bg-[#6B3E26] hover:text-white transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
