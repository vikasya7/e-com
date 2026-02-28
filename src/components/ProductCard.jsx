import { Link } from "react-router-dom";
import useCart from "../context/useCart";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  // 🔥 Use first variant as default
  const defaultVariant = product.variants?.[0];
  console.log(product);
  

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col">

      {/* Clickable Image + Title */}
      <Link
        to={`/product/${product._id}`}
        className="flex flex-col items-center"
      >
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="h-[220px] object-contain mb-4 transition-transform duration-300 hover:scale-105"
        />

        <h3 className="font-semibold text-center text-[#3B2A1A] line-clamp-2">
          {product.name}
        </h3>
      </Link>

      {/* Price Section */}
      {defaultVariant && (
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-black">
            ₹{defaultVariant.price}
          </span>
          <span className="text-xs text-gray-500">
            ({defaultVariant.weight})
          </span>
        </div>
      )}

      {/* Add to Cart */}
      <button
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

            alert("Added to cart ✅");
          } catch (error) {
            console.log(error);
            alert("Failed ❌");
          }
        }}
        className="mt-6 bg-[#6B3E26] hover:bg-[#5A321D] text-white rounded-full py-2.5 text-sm font-medium transition-all duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

