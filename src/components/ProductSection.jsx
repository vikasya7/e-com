import React from "react";
import ProductCard from "./ProductCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


function ProductSection({ title, products }) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <section id="products" className="relative py-24 bg-[#FFF8EE] overflow-hidden">

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,#C48A3A,transparent_40%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">

        {/* Section Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-sm tracking-widest uppercase text-[#C48A3A] mb-4 font-semibold"
        >
          Our Bestsellers
        </motion.p>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#6B3E26] mb-16"
        >
          {title}
        </motion.h2>

        {/* Loading / Empty State */}
        {safeProducts.length === 0 && (
          <p className="text-center text-gray-500">
            Loading delicious snacks...
          </p>
        )}

        {/* Product Grid */}
        {safeProducts.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          >
            {safeProducts.map((product) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}

export default ProductSection;

