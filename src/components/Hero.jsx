import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import ProductSection from "./ProductSection";
import api from "../utils/api";

function Hero() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  api
    .get("/api/v1/products")
    .then((res) => setProducts(res.data.data))
    .catch((err) => console.log(err));
}, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-r from-[#FFF8EE] via-[#F8EDE3] to-[#F3E5D6]">
        <div className="max-w-7xl mx-auto px-10 py-24 grid md:grid-cols-2 items-center gap-16">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-[#6B3E26] leading-tight tracking-tight">
              Crunch Smarter.
            </h1>

            <p className="mt-6 text-5xl md:text-6xl font-bold text-black max-w-xl leading-tight">
              Premium roasted makhana crafted for guilt-free indulgence.
            </p>

            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              Roasted. Not fried. No preservatives.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#products"
                className="bg-[#C48A3A] hover:bg-[#b5782f] shadow-md hover:shadow-lg transition-all duration-300 px-7 py-3.5 rounded-full text-white font-semibold"
              >
                Shop Now
              </a>

              <a
                href="#products"
                className="border border-[#6B3E26] px-7 py-3.5 rounded-full text-[#6B3E26] font-semibold hover:bg-[#6B3E26] hover:text-white transition-all duration-300"
              >
                Explore Flavors
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-500 flex gap-4 flex-wrap">
              <span>✔ 100% Natural</span>
              <span>✔ Roasted Not Fried</span>
              <span>✔ No Preservatives</span>
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/hero/hero1.jpg"
              alt="Squirll Bites Makhana"
              className="w-[460px] md:w-[540px] rounded-2xl 
                         drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]
                         hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>
      </section>

      {/* PRODUCT SECTION BELOW HERO */}
      <ProductSection
        title="Shop Our Range"
        products={products}
      />
    </>
  );
}

export default Hero;


