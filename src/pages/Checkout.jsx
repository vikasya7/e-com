
import { useEffect, useState } from "react";
import useCart from "../context/useCart";
import { startPayment } from "../utils/razorpay";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Checkout() {
  const { items, bill } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const shipping = bill > 500 ? 0 : 50;
  const finalTotal = bill + shipping - discount;
  const handleApplyCoupon = async () => {
    try {
      const { data } = await api.post("/api/v1/users/apply-coupon", {
        code: couponCode,
        orderAmount: bill,
      });
      setDiscount(data.data.discount);
      setCouponMessage(`Coupon applied! You saved ₹${data.discount}`);
    } catch (error) {
      setCouponMessage(error.response?.data?.message || "Invalid coupon");
      setDiscount(0);
    }
  };

  // fetch address
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await api.get("/api/v1/users/addresses");

        setAddresses(data.data);
        const defaultAddress = data.data.find((a) => a.isDefault);
        setSelected(defaultAddress?._id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddresses();
  }, []);

  const handlePayment = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await startPayment(selected);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-14 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
        {/* ================= LEFT SIDE - ADDRESS ================= */}
        <div>
          <h2 className="text-3xl font-bold mb-10 text-gray-900">
            Delivery Address
          </h2>

          {addresses.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl shadow-md">
              <p className="text-gray-600 mb-6">
                No address found. Please add one to continue.
              </p>
              <button
                onClick={() => navigate("/profile")}
                className="px-6 py-3 bg-black text-white rounded-full hover:opacity-90 transition"
              >
                Add Address
              </button>
            </div>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr._id}
                onClick={() => setSelected(addr._id)}
                className={`p-6 mb-6 rounded-3xl border transition cursor-pointer ${
                  selected === addr._id
                    ? "border-black bg-white shadow-lg"
                    : "border-gray-200 bg-white hover:shadow-md"
                }`}
              >
                <div className="flex gap-4">
                  <input
                    type="radio"
                    checked={selected === addr._id}
                    onChange={() => setSelected(addr._id)}
                    className="mt-2 accent-black"
                  />

                  <div>
                    <p className="font-semibold text-lg text-gray-900">
                      {addr.fullName}
                    </p>

                    <p className="text-gray-600 text-sm">
                      {addr.street}, {addr.city}
                    </p>

                    <p className="text-gray-600 text-sm">
                      {addr.state} - {addr.pincode}
                    </p>

                    <p className="text-gray-600 text-sm">{addr.phone}</p>

                    {addr.isDefault && (
                      <span className="inline-block mt-3 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= RIGHT SIDE - ORDER SUMMARY ================= */}
        <div className="bg-white p-10 rounded-3xl shadow-xl sticky top-24 h-fit">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Order Summary
          </h2>

          {/* Product List */}
          <div className="space-y-6 max-h-72 overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={`${item.itemId._id}-${item.weight}`}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.itemId?.images?.[0]?.url}
                    alt={item.itemId?.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />

                  <div>
                    <p className="font-medium text-gray-900">
                      {item.itemId?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.weight} • Qty {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-gray-900">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Coupon Section */}
          <div className="mt-8">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 border rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />

              <button
                onClick={handleApplyCoupon}
                className="px-6 py-3 bg-black text-white rounded-full hover:opacity-90 transition"
              >
                Apply
              </button>
            </div>

            {couponMessage && (
              <p className="mt-2 text-sm text-green-600">{couponMessage}</p>
            )}
          </div>

          {/* Pricing */}
          <div className="mt-8 border-t pt-6 space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{bill}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t mt-3">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            disabled={!selected || loading}
            onClick={handlePayment}
            className="w-full mt-8 bg-black text-white py-4 rounded-full text-lg font-semibold hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
