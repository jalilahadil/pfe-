import React, { useState } from "react";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import Navbar from "../components/navbar"
import kidsOne from "../assets/img/kidsOne.jpg";
import kidsTwo from "../assets/img/kidsTwo.jpg";
import kidsThree from "../assets/img/kidsThree.jpg";
import kidsFour from "../assets/img/kidsFour.jpg";
import "./styles/OurGalleryStyle.css";

const images = [kidsOne, kidsTwo, kidsThree, kidsFour];

const OurGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
    <Navbar color="#AA11B1"></Navbar>
      <h1 className="text-center fw-bold mb-3" id="gallery">Notre Gallerie</h1>
      <div className="carouselContainer d-flex justify-content-center">
        <div className="prevContainer d-flex flex-column justify-content-center mx-5">
          <button className="btn previousImage sliderControl" onClick={prevImage}>
            &lt;
          </button>
        </div>
        
        <div className="carouselItems d-flex gap-5 mx-3">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carouselItem ${index === currentIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>

        <div className="nextContainer d-flex flex-column justify-content-center mx-2">
          <button className="btn nextImage sliderControl" onClick={nextImage}>
            &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default OurGallery;
