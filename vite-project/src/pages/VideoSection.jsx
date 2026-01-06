import React, { useEffect, useRef } from "react";

const videos = [
  "https://www.pexels.com/download/video/855574/",
  "https://www.pexels.com/download/video/3894725/",
  "https://www.pexels.com/download/video/3402764/",
  "https://www.pexels.com/download/video/4761937/",
  "https://www.pexels.com/download/video/3682815/",
  "https://www.pexels.com/download/video/5599779/",
];

const VideoSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const videos = containerRef.current.querySelectorAll("video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center mt-10 w-full items-center md:p-4 p-0.5"
    >
      <ul className="flex md:gap-5 gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory will-change-transform">
        {videos.map((src, index) => (
          <li
            key={index}
            className="flex-shrink-0 snap-start rounded-xl shadow-lg overflow-hidden"
          >
            <video
              className="rounded-xl object-cover"
              width="200"
              height="300"
              muted
              playsInline
              preload="metadata"
              loop
              style={{
                width: "200px",
                height: "300px",
                background: "#000",
                opacity: 0.95,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              <source src={src} type="video/mp4" />
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoSection;
