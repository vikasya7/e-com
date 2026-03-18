import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductSection from "./ProductSection";
import api from "../utils/api";
import TrustSection from "./TrustSection";

function Hero() {
  const [products, setProducts] = useState([]);
  const [particles] = useState(() =>
    Array.from({ length: 8 }).map(() => ({
      x: Math.random() * 120 - 60,
      y: Math.random() * -120,
    })),
  );
  useEffect(() => {
    api
      .get("/api/v1/products")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full bg-[#FFF7EC] overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#FFD8A8] rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#FFE8CC] rounded-full blur-3xl opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 items-center gap-16">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* 🔥 Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold text-[#6B3E26] leading-tight"
            >
              Har Break Ka{" "}
              <motion.span
                className="text-[#C48A3A] font-['Pacifico'] inline-block"
                animate={{ y: [0, -6, 0], rotate: [0, -2, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Bite
              </motion.span>
            </motion.h1>

            {/* ✨ Underline */}
            <motion.svg
              viewBox="0 0 200 20"
              className="w-40"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.path
                d="M5 15 Q 100 5 195 15"
                stroke="#C48A3A"
                strokeWidth="4"
                fill="transparent"
                strokeLinecap="round"
              />
            </motion.svg>

            {/* 📝 Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-700 max-w-lg"
            >
              Premium roasted makhana for guilt-free snacking. Light, crunchy,
              and seriously addictive.
            </motion.p>

            {/* 🚀 CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 pt-2"
            >
              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="#products"
                className="relative bg-[#C48A3A] px-8 py-4 rounded-full text-white font-semibold overflow-hidden"
              >
                Get Your Bite →{/* Glow */}
                <motion.span
                  className="absolute inset-0 bg-[#C48A3A] rounded-full -z-10"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ filter: "blur(18px)", opacity: 0.4 }}
                />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#products"
                className="px-8 py-4 rounded-full border border-[#6B3E26] text-[#6B3E26] font-semibold hover:bg-[#6B3E26] hover:text-white transition"
              >
                Explore Flavors
              </motion.a>
            </motion.div>

            {/* 🎯 Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 flex-wrap text-sm text-[#6B3E26] font-medium pt-3"
            >
              <span className="bg-[#F3E5D3] px-3 py-1 rounded-full">
                🌿 100% Natural
              </span>
              <span className="bg-[#F3E5D3] px-3 py-1 rounded-full">
                🔥 Roasted Not Fried
              </span>
              <span className="bg-[#F3E5D3] px-3 py-1 rounded-full">
                🚫 No Preservatives
              </span>
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end relative">
            {/* Floating Effect */}
            <div className="relative group flex justify-center md:justify-end">
              {/* Floating Image */}
              <motion.img
                src="/hero/hero2.png"
                alt="Squirll Bites Makhana"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{ scale: 1.05 }}
                className="w-[420px] md:w-[520px] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.12)]"
              />

              {/* Makhana Burst */}
              {/* Makhana Burst */}
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-[#F5D7A1] rounded-full pointer-events-none"
                  style={{ top: "50%", left: "50%" }}
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    x: p.x,
                    y: p.y,
                    scale: [1, 1.4, 0.8],
                  }}
                  transition={{ duration: 0.6 }}
                />
              ))}
            </div>

            {/* Playful Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -top-6 -right-6 bg-[#C48A3A] text-white px-5 py-3 rounded-full font-semibold shadow-lg rotate-6"
            >
              Bestseller ⭐
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION BELOW HERO */}
      <ProductSection title="Shop Our Range" products={products} />

      <TrustSection />
    </>
  );
}

export default Hero;
