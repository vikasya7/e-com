import React from "react";
import ProductCard from "./ProductCard";

function ProductSection({ title, products }) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <section id="products" className="py-24 bg-[#FFF8EE]">
      <div className="max-w-7xl mx-auto px-10">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#6B3E26] mb-16">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {safeProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProductSection;

