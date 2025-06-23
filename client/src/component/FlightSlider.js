import React, { useRef } from "react";
import "./FlightSlider.css";

const flightImage = [
  "../images/air-asia-plane.jpg",
  "../images/firefly-plane.jpg",
  "../images/malaysia-airlines-plane.jpg",
  "../images/maswings-plane.jpg",
];

function FlightSlider() {
  const sliderRef = useRef();

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (direction === "left") {
      current.scrollBy({ left: -400, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="flight-slider-wrapper">
      <button className="flight-nav-button" onClick={() => scroll("left")}>
        ←
      </button>
      <div className="flight-slider" ref={sliderRef}>
        {flightImage.map((src, index) => (
          <div className="flight-slide-card" key={index}>
            <img
              src={src}
              alt={`flight-slide-${index}`}
              className="flight-slide-image"
            />
          </div>
        ))}
      </div>
      <button className="flight-nav-button" onClick={() => scroll("right")}>
        →
      </button>
    </div>
  );
}

export default FlightSlider;
