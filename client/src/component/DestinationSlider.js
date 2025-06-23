import React, { useRef } from "react";
import "./DestinationSlider.css";

const destinationImages = [
  { src: "/images/kuala-lumpur-image.jpg", alt: "Kuala Lumpur" },
  { src: "/images/langkawi-image.jpg", alt: "Langkawi" },
  { src: "/images/kuala-terengganu-image.jpg", alt: "Kuala Terengganu" },
  { src: "/images/johor-bahru-image.jpg", alt: "Johor Bahru" },
  { src: "/images/sabah-image.jpg", alt: "Sabah" },
  { src: "/images/sarawak-image.jpg", alt: "Sarawak" },
  { src: "/images/pahang-image.jpg", alt: "Pahang" },
];

function DestinationSlider() {
  const sliderRef = useRef();

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (!current) return;

    const scrollAmount = 400;
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="destination-slider-wrapper">
      <button className="destination-nav-button" onClick={() => scroll("left")}>
        ←
      </button>

      <div className="destination-slider" ref={sliderRef}>
        {destinationImages.map((image, index) => (
          <div className="destination-slide-card" key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className="destination-slide-image"
            />
            <p className="destination-label">{image.alt}</p>
          </div>
        ))}
      </div>

      <button
        className="destination-nav-button"
        onClick={() => scroll("right")}
      >
        →
      </button>
    </div>
  );
}

export default DestinationSlider;
