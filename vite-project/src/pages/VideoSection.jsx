import React from "react";

const VideoSection = () => {
  return (
    <>
      <div className="flex justify-center mt-10 w-full items-center p-4 ">
        <ul className="flex gap-5 overflow-x-scroll scrollbar-hide">
          <li className="flex-shrink-0">
            <video
              className="rounded-xl shadow-lg object-cover"
              style={{ width: '200px', height: '300px' }}
              autoPlay
              muted
              playsInline
              loop
            >
              <source
                src="https://www.pexels.com/download/video/855574/"
                type="video/mp4"
              />
            </video>
          </li>
          <li className="flex-shrink-0">
            <video
              className="rounded-xl shadow-lg object-cover"
              style={{ width: '200px', height: '300px' }}
              autoPlay
              muted
              playsInline
              loop
            >
              <source
                src="https://www.pexels.com/download/video/3894725/"
                type="video/mp4"
              />
            </video>
          </li>
          <li className="flex-shrink-0">
            <video
              className="rounded-xl shadow-lg object-cover"
              style={{ width: '200px', height: '300px' }}
              autoPlay
              muted
              playsInline
              loop
            >
              <source
                src="https://www.pexels.com/download/video/3402764/"
                type="video/mp4"
              />
            </video>
          </li>
          <li className="flex-shrink-0">
            <video
              className="rounded-xl shadow-lg object-cover"
              style={{ width: '200px', height: '300px' }}
              autoPlay
              muted
              playsInline
              loop
            >
              <source
                src="https://www.pexels.com/download/video/4761937/"
                type="video/mp4"
              />
            </video>
          </li>
          <li className="flex-shrink-0">
            <video
              className="rounded-xl shadow-lg object-cover"
              style={{ width: '200px', height: '300px' }}
              autoPlay
              muted
              playsInline
              loop
            >
              <source
                src="https://www.pexels.com/download/video/3682815/"
                type="video/mp4"
              />
            </video>
          </li>
          <li className="flex-shrink-0">
            <video
              className="rounded-xl shadow-lg object-cover"
              style={{ width: '200px', height: '300px' }}
              autoPlay
              muted
              playsInline
              loop
            >
              <source   
                src="https://www.pexels.com/download/video/5599779/"
                type="video/mp4"
              />
            </video>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VideoSection;
