import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

import "./HeroSection.scss";
import heroVideo from "../../../assets/videos/West-hero.mp4";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <video src={heroVideo} autoPlay muted loop></video>

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
