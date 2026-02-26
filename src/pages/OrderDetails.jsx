import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";




export default function OrderDetails() {

  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await api.get(`/api/v1/orders/${id}`);
      setOrder(res.data.data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div className="p-10">Loading...</div>;

  return (
   <div className="bg-white p-6 rounded-xl shadow mb-6">
  <h2 className="font-semibold mb-4 text-lg">Items</h2>

  <div className="space-y-4">
    {order?.orderItems?.map((item, index) => (
      <div
        key={index}
        className="flex items-center gap-4 border rounded-lg p-4 hover:shadow-sm transition"
      >

        {/* Product Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
        />

        {/* Item Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">
            {item.name}
          </h3>

          <p className="text-sm text-gray-500">
            Quantity: {item.quantity}
          </p>
        </div>

        {/* Price */}
        <div className="text-right">
          <p className="font-semibold text-gray-800">
            ₹{item.price}
          </p>
          <p className="text-sm text-gray-500">
            Subtotal: ₹{item.price * item.quantity}
          </p>
        </div>

      </div>
    ))}
  </div>
</div>

  );
}
