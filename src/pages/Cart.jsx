
import { useNavigate } from "react-router-dom";
import useCart from "../context/useCart";

function Cart() {
  const { items, bill, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFF8EE] min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="font-semibold text-3xl text-[#6B3E26] mb-10">
          Your Cart
        </h2>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-6">
              Your cart is empty
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-[#6B3E26] text-white px-6 py-3 rounded-full hover:bg-[#5a341f] transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            {items.map((item) => (
              <div
                key={`${item.itemId._id}-${item.weight}`}
                className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8 border-b border-[#e9dccd] pb-8"
              >

                {/* LEFT SIDE - Product Info */}
                <div className="flex items-center gap-6">

                  <img
                    src={item.itemId?.images?.[0]?.url}
                    alt={item.itemId?.name}
                    className="w-24 h-24 object-contain rounded-xl bg-white p-3 shadow-sm"
                  />

                  <div>
                    <p className="font-semibold text-lg text-[#6B3E26]">
                      {item.itemId?.name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Weight: {item.weight}
                    </p>

                    <p className="text-[#6B3E26] font-medium mt-2">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE - Controls */}
                <div className="flex items-center gap-8">

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-[#d6c2af] rounded-full overflow-hidden bg-white shadow-sm">

                    <button
                      disabled={item.quantity <= 1}
                      className="px-4 py-1 text-lg text-[#6B3E26] hover:bg-[#f3e6d8] transition disabled:opacity-40"
                      onClick={() =>
                        updateQuantity(
                          item.itemId._id,
                          item.weight,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span className="px-5 font-medium text-[#6B3E26]">
                      {item.quantity}
                    </span>

                    <button
                      className="px-4 py-1 text-lg text-[#6B3E26] hover:bg-[#f3e6d8] transition"
                      onClick={() =>
                        updateQuantity(
                          item.itemId._id,
                          item.weight,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="font-semibold text-[#6B3E26] min-w-[90px] text-right text-lg">
                    ₹{item.price * item.quantity}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeFromCart(item.itemId._id, item.weight)
                    }
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

            {/* TOTAL SECTION */}
            <div className="bg-white rounded-2xl shadow-md p-8 mt-12">

              <div className="flex justify-between items-center text-xl font-semibold text-[#6B3E26]">
                <span>Total</span>
                <span>₹{bill}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#6B3E26] text-white py-4 mt-8 rounded-full text-lg hover:bg-[#5a341f] transition shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;

