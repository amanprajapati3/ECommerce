import React, { useEffect, useState, useRef } from "react";

const carouselImages = [
  {
    img: "https://images.pexels.com/photos/8084056/pexels-photo-8084056.jpeg",
    url: "/collection",
  },
  {
    img: "https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg",
    url: "/mens",
  },
  {
    img: "https://images.pexels.com/photos/33885052/pexels-photo-33885052.jpeg",
    url: "/women",
  },
  {
    img: "https://images.pexels.com/photos/7169019/pexels-photo-7169019.jpeg",
    url: "/kids",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto Slide every 5s
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
  };

  const stopAutoSlide = () => {
    clearInterval(slideInterval.current);
  };

  return (
    <div className="w-full overflow-hidden relative">
      {/* Slide Container */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          width: `${carouselImages.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / carouselImages.length)}%)`,
        }}
      >
        {carouselImages.map((slide, index) => (
          <a
            href={slide.url}
            key={index}
            className="w-full flex-shrink-0"
            style={{ width: `${100 / carouselImages.length}%` }}
          >
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[300px] sm:h-[600px] object-cover"
            />
          </a>
        ))}
      </div>
      {/* Dots Below the Banner */}
      <div className="w-full flex justify-center mt-3 space-x-2 z-20">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-black" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
