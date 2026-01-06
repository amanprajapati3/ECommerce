import React, { useEffect, useState, useRef } from "react";

const carouselImages = [
  {
    img: "https://images.pexels.com/photos/8084056/pexels-photo-8084056.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "/collection",
  },
  {
    img: "https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "/mens",
  },
  {
    img: "https://images.pexels.com/photos/33885052/pexels-photo-33885052.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "/women",
  },
  {
    img: "https://images.pexels.com/photos/7169019/pexels-photo-7169019.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "/kids",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const slideInterval = useRef(null);

  
  useEffect(() => {
    const preload = carouselImages.map((s) => {
      const img = new Image();
      img.src = s.img;
      return img;
    });

    Promise.all(preload.map((i) => i.decode?.().catch(() => {}))).then(() =>
      setLoaded(true)
    );
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide(); 
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="relative w-full overflow-hidden">
      
      <div
        className="flex transition-transform duration-700 ease-linear will-change-transform"
        style={{
          width: `${carouselImages.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / carouselImages.length)}%)`,
        }}
      >
        {carouselImages.map((slide, index) => (
          <a
            key={index}
            href={slide.url}
            className="flex-shrink-0 w-full block"
            style={{ width: `${100 / carouselImages.length}%` }}
          >
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[300px] sm:h-[500px] object-cover select-none"
              loading="lazy"
              decoding="async"
              fetchpriority={index === 0 ? "high" : "low"}
              style={{
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.4s ease-in-out",
              }}
            />
          </a>
        ))}
      </div>

    
      <div className="mt-3 flex justify-center space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
