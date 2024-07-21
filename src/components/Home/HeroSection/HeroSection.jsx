import React, { useState, useEffect, useRef } from "react";
import { Blurhash } from "react-blurhash";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

import "./HeroSection.scss";
import heroVideo from "../../../assets/videos/West-hero.mp4";

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleVideoLoad = () => {
      setVideoLoaded(true);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.oncanplaythrough = handleVideoLoad;
    }

    return () => {
      if (videoElement) {
        videoElement.oncanplaythrough = null;
      }
    };
  }, []);

  return (
    <div className="hero-section">
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className={`video-bg ${videoLoaded ? "loaded" : "hidden"}`}
      ></video>

      {!videoLoaded && (
        <div className="blur-video">
          <Blurhash
            hash="L6G957Mw00j^~VRP9F%MV@t6%Mj?"
            width={"100%"}
            height={"100%"}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}

      <div className="content">
        <h2>Summer Sale</h2>
        <Link to="/sale">
          <IoIosArrowRoundForward />
          Up to 60% off
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
