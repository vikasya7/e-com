import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="bg-[#FFF8EE] text-[#4B2E1E]">

      {/* SEO */}
      <Helmet>
        <title>About Us | Squirll Bites</title>
        <meta
          name="description"
          content="Discover the story behind Squirll Bites — premium roasted makhana crafted for mindful, smarter snacking."
        />
      </Helmet>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-32 text-center">
        <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-tight">
          Crafted for Smarter Snacking
        </h1>

        <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We believe snacking should feel indulgent yet intentional.
          Squirll Bites brings together purity, crunch, and refined taste —
          without compromise.
        </p>
      </section>

      {/* OUR STORY */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          <div>
            <h2 className="text-5xl font-semibold tracking-tight">
              Our Story
            </h2>

            <div className="w-16 h-[2px] bg-[#C48A3A] mt-6 mb-8"></div>

            <p className="text-gray-600 leading-relaxed max-w-md">
              What began as a simple craving for healthier alternatives
              evolved into a mission — to redefine indulgence.
              We saw the gap between processed junk and truly wholesome snacks.
            </p>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-md">
              By roasting instead of frying and eliminating unnecessary additives,
              we crafted a snack that complements modern lifestyles
              while honoring simplicity.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="/hero/hero2.png"
              alt="Premium roasted makhana"
              className="w-[340px] md:w-[400px] rounded-2xl shadow-md hover:scale-105 transition duration-500"
            />
          </div>

        </div>
      </section>

      {/* PRODUCT SHOWCASE (YOUR PACK IMAGE) */}
      <section className="py-28 px-6 bg-[#F9F5F0] text-center">
        <h2 className="text-4xl font-semibold tracking-tight">
          From Concept to Crunch
        </h2>

        <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Our journey transformed into something tangible — a thoughtfully
          crafted pack that delivers quality, flavor, and care in every bite.
        </p>

        <div className="mt-16 flex justify-center">
          <img
            src="/hero/packet.png"  // your uploaded pack image
            alt="Squirll Bites Classic Makhana Chiwda Pack"
            className="w-[260px] md:w-[300px] drop-shadow-xl hover:scale-105 transition duration-500"
          />
        </div>
      </section>

      {/* WHY SQUIRLL BITES */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-semibold tracking-tight">
            Why Squirll Bites
          </h2>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Crafted with intention and backed by simplicity.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-10">

            <div className="bg-[#FFF8EE] p-10 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-xl">
                100% Natural
              </h3>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                Free from preservatives and artificial flavors.
                Just clean ingredients.
              </p>
            </div>

            <div className="bg-[#FFF8EE] p-10 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-xl">
                Roasted, Not Fried
              </h3>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                Light, crunchy, and nutrient-rich without excess oil.
              </p>
            </div>

            <div className="bg-[#FFF8EE] p-10 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-xl">
                Carefully Sourced
              </h3>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                Premium makhana sourced from trusted farms
                and crafted with precision.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="py-28 px-6 bg-[#FFF8EE] text-center">
        <h2 className="text-4xl font-semibold tracking-tight">
          Our Promise
        </h2>

        <p className="mt-8 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Every pack reflects our commitment to quality, transparency,
          and refined taste.
        </p>

        <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            "Gluten Free",
            "High Protein",
            "Zero Trans Fat",
            "No Preservatives",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white py-6 rounded-xl text-sm font-medium tracking-wide shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 bg-[#4B2E1E] text-white text-center">
        <h2 className="text-4xl font-semibold tracking-tight">
          Join the Smarter Snacking Movement
        </h2>

        <p className="mt-6 text-gray-200 max-w-xl mx-auto">
          Experience premium roasted makhana crafted for mindful indulgence.
        </p>

        <Link
          to="/"
          className="inline-block mt-10 bg-[#C48A3A] hover:bg-[#b5782f] px-8 py-3 rounded-full font-semibold transition duration-300"
        >
          Shop Now
        </Link>
      </section>

    </div>
  );
}

export default AboutUs;