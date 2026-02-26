import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "feather-icons-react";

function Carousel({ children: slides, autoSlide = false, autoSlideInterval = 4000 }) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurr(0);
  }, [slides.length]);

  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slides.length]);

  return (
    <div className="relative overflow-hidden w-full h-[500px] md:h-[600px]">

      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full h-full flex-shrink-0 relative">
            {slide}

            {/* Gradient Overlay for Premium Feel */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-6">

        <button
          onClick={prev}
          className="bg-white/70 backdrop-blur-md hover:bg-white transition-all duration-300 p-3 rounded-full shadow-lg hover:scale-110"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={next}
          className="bg-white/70 backdrop-blur-md hover:bg-white transition-all duration-300 p-3 rounded-full shadow-lg hover:scale-110"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              curr === i
                ? "w-8 bg-[#C48A3A]"
                : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;

