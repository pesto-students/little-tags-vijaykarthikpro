import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Carousel.scss";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const currentSlide = (n) => {
    setCurrent(n);
  };
  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  return (
    <div>
      CAROUSEL
      <section className="slider">
        {/* <FaArrowCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowCircleRight className="right-arrow" onClick={nextSlide} /> */}
        {slides.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img src={slide.image} alt="product images" className="image" />
              )}
            </div>
          );
        })}
      </section>
      <div className="app">
        <span
          className={current === 0 ? "dot active" : "dot"}
          onClick={() => {
            currentSlide(0);
          }}
        ></span>
        <span
          className={current === 1 ? "dot active" : "dot"}
          onClick={() => {
            currentSlide(1);
          }}
        ></span>
        <span
          className={current === 2 ? "dot active" : "dot"}
          onClick={() => {
            currentSlide(2);
          }}
        ></span>
      </div>
    </div>
  );
}
