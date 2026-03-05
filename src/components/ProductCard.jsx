import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useCart from "../context/useCart";
import toast from "react-hot-toast";
function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const defaultVariant = product.variants?.[0];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 flex flex-col relative overflow-hidden"
    >
      {/* Bestseller Badge (optional logic later) */}
      <div className="absolute top-4 left-4 bg-[#C48A3A] text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
        Bestseller
      </div>

      {/* Clickable Image + Title */}
      <Link
        to={`/product/${product._id}`}
        className="flex flex-col items-center text-center"
      >
        <div className="overflow-hidden rounded-2xl">
          <motion.img
            src={product.images?.[0]?.url}
            alt={product.name}
            className="h-[220px] object-contain mb-4"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <h3 className="font-semibold text-[#3B2A1A] mt-2 line-clamp-2">
          {product.name}
        </h3>
      </Link>

      {/* Price Section */}
      {defaultVariant && (
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-xl font-bold text-[#6B3E26]">
            ₹{defaultVariant.price}
          </span>
          <span className="text-xs text-gray-500">{defaultVariant.weight}</span>
        </div>
      )}

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={async (e) => {
          e.stopPropagation();

          if (!defaultVariant) return;

          try {
            await addToCart({
              itemId: product._id,
              weight: defaultVariant.weight,
              price: defaultVariant.price,
              name: product.name,
              image: product.images?.[0]?.url,
              quantity: 1,
            });

            // ✅ SUCCESS TOAST (ADD HERE)
            toast.success("Added to cart 🛒");
          } catch (error) {
            console.log(error);

            // ❌ ERROR TOAST
            toast.error("Something went wrong ❌");
          }
        }}
        className="mt-6 bg-[#6B3E26] hover:bg-[#5A321D] text-white rounded-full py-3 text-sm font-semibold tracking-wide transition-all duration-300"
      >
        Add to Cart →
      </motion.button>
    </motion.div>
  );
}

export default ProductCard;
