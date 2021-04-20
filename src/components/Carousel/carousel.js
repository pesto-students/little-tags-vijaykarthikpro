import ProductDetailsImg from '../../assets/images/product-details-img.svg';

var slideIndex = 1;

export default function Carousel() {
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    var slides = document.getElementsByClassName('.mySlides');
    var dots = document.getElementsByClassName('.dot');
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    /*  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active"; */
  }

  return (
    <div>
      <div class="slideshow-container">
        <div className="mySlides fade">
          <div className="numbertext">1 / 3</div>
          <img src={ProductDetailsImg} alt="" />
          <div className="text">Caption Text</div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">2 / 3</div>
          <img src={ProductDetailsImg} alt="" />
          <div className="text">Caption Two</div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">3 / 3</div>
          <img src={ProductDetailsImg} alt="" />
          <div className="text">Caption Three</div>
        </div>

        <button className="prev" onclick={plusSlides(-1)}>
          &#10094;
        </button>
        <button className="next" onclick={plusSlides(1)}>
          &#10095;
        </button>
      </div>
      <br />

      <div>
        <span className="dot" onclick={currentSlide(1)}></span>
        <span className="dot" onclick={currentSlide(2)}></span>
        <span className="dot" onclick={currentSlide(3)}></span>
      </div>
    </div>
  );
}
