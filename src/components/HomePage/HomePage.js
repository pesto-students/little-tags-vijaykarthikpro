import React from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
// import { useSelector } from "react-redux";
import Banner from "../../assets/images/style-beast-hero-image.svg";
import MenPortrait from "../../assets/images/men-portrait.svg";
import WomenPortrait from "../../assets/images/women-portrait.svg";
import JacketsImg from "../../assets/images/jackets.svg";
import TshirtsImg from "../../assets/images/tshirts.svg";
import ElectronicsImg from "../../assets/images/electronics.svg";
import JeweleryImg from "../../assets/images/jewelery.svg";

export default function HomePage() {
  // const languageData = useSelector((state) => state.sessionState.data);

  return (
    <div className="home-container">
      <div className="banner-section">
        <img className="banner" src={Banner} alt="banner" />
      </div>
      <div className="collection-section">
        <h1>COLLECTIONS</h1>
        <div className="collections">
          <Link to={ROUTES.MEN} className="nav-links">
            <div className="men">
              <h2>MEN</h2>
              <img src={MenPortrait} alt="men-portrait" />
            </div>
          </Link>
          <p>
            "Fashion changes, but
            <br />
            style endures"
          </p>
          <Link to={ROUTES.WOMEN} className="nav-links">
            <div className="women">
              <h2>WOMEN</h2>
              <img src={WomenPortrait} alt="women-portrait" />
            </div>
          </Link>
        </div>
      </div>
      <div className="categories">
        <h1>CATEGORIES</h1>
        <div className="categories-to-add">
          <Link to={ROUTES.JACKETS} className="nav-links">
            <div>
              <img src={JacketsImg} alt="jacket" />
              <h2>JACKETS</h2>
            </div>
          </Link>
          <Link to={ROUTES.TSHIRTS} className="nav-links">
            <div>
              <img src={TshirtsImg} alt="t-shirt" />
              <h2>T-SHIRTS</h2>
            </div>
          </Link>
          <Link to={ROUTES.ELECTRONICS} className="nav-links">
            <div>
              <img src={ElectronicsImg} alt="electronics" />
              <h2>ELECTRONICS</h2>
            </div>
          </Link>
          <Link to={ROUTES.JEWELLERY} className="nav-links">
            <div>
              <img src={JeweleryImg} alt="jewellery" />
              <h2>JEWELLERY</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
