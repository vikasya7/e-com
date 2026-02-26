import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../context/useCart";
import useAuth from "../context/useAuth";
import api from "../utils/api";
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/v1/products/${id}`);
        setProduct(res.data.data);

        // auto select first variant
        if (res.data.data.variants?.length > 0) {
          setSelectedVariant(res.data.data.variants[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!selectedVariant) return;

    await addToCart({
      itemId: product._id,
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      quantity: 1,
    });
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!selectedVariant) return;

    await addToCart({
      itemId: product._id,
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      quantity: 1,
    });

    navigate("/checkout");
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }
  console.log(product.images);
  

  return (
    <div className="bg-[#FFF8EE] min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* ================= IMAGE SECTION ================= */}
        <div>
          {/* Main Image */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f1e7dc]">
            <img
              src={product.images?.[selectedImage]?.url}
              alt={product.name}
              className="h-[450px] mx-auto object-contain"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-4 mt-6">
            {product.images?.map((img, index) => (
              <img
                key={img.public_id}
                src={img.url}
                alt="thumb"
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-20 object-contain cursor-pointer rounded-lg border ${selectedImage === index ? "border-[#6B3E26]" : "border-gray-200"}`}
              />
            ))}
          </div>
        </div>

        {/* ================= DETAILS SECTION ================= */}
        <div>
          <h1 className="text-4xl font-semibold text-[#6B3E26] mb-6">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-8">{product.description}</p>
          {/* ===== Variant Selection ===== */}

          <div className="mb-6">
            <p className="font-medium mb-3">Select Weight</p>

            <div>
              {product.variants?.map((variant) => (
                <button
                  key={variant.weight}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-5 py-2 rounded-full border transition
                    ${
                      selectedVariant?.weight === variant.weight
                        ? "bg-[#6B3E26] text-white"
                        : "border-gray-300"
                    }
                  `}
                >
                  {variant.weight}
                </button>
              ))}
            </div>
          </div>
          {/* ===== Price ===== */}
          {selectedVariant && (
            <div className="text-3xl font-semibold mb-4 text-[#6B3E26]">
              ₹ {selectedVariant.price}
            </div>
          )}
          {/* ===== Stock ===== */}
          {selectedVariant &&
            (selectedVariant.stock <= 0 ? (
              <p className="text-red-600 font-medium mb-6">Out of Stock</p>
            ) : (
              <p className="text-green-600 font-medium mb-6">
                In Stock ({selectedVariant.stock} available)
              </p>
            ))}

          {/* ===== Buttons ===== */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock <= 0}
              className="bg-[#C48A3A] hover:bg-[#b67a2e] text-white px-8 py-3 rounded-full disabled:opacity-50 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!selectedVariant || selectedVariant.stock <= 0}
              className="bg-[#6B3E26] hover:bg-[#5a341f] text-white px-8 py-3 rounded-full disabled:opacity-50 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
