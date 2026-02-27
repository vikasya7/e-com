import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import BlogSection from "../components/BlogSection";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "products") {
      const section = document.getElementById("products");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div>
      <Hero />
      <BlogSection />
    </div>
  );
}

export default Home;