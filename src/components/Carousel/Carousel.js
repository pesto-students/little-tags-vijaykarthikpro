import React, { useState } from "react";
import PropTypes from "prop-types";
import LeftArrow from '../../assets/icons/left-arrow.svg';
import RightArrow from '../../assets/icons/right-arrow.svg';
import "./Carousel.scss";

export default function Carousel({ slides }) {

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  const currentSlide = (n) => {
    setCurrent(n);
  };
 

  const showSlides = () => {
    return slides.map((slide, index) => {
      return (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {index === current && (
            <img className="product-image" src={slide.image} alt="product"  />
          )}
        </div>
      );
    })
  }

  const showEllipsis = () =>{

    return slides.map((_, index) =>{
      return (<span
        key={index}
        className={current === index ? "dot active" : "dot"}
        onClick={() => {
          currentSlide(index);
        }}
      ></span>)
    })
  }

  return (
    <div>
      <section className="slider">
          <img className="arrows" src={LeftArrow} alt="left-arrow" onClick={prevSlide}/>
          {showSlides()}
          <img className="arrows" src={RightArrow} alt="right-arrow" onClick={nextSlide}/>
      </section>
      <div className="ellipsis">
        {showEllipsis()}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  slides: PropTypes.array.isRequired
}
