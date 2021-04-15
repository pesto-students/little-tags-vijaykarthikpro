import React, { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown/Dropdown";
import Login from "../Login/Login";
import AppLogo from "../../assets/icons/logo-symbol.png";
import SearchIcon from "../../assets/icons/search.svg";
import CartIcon from "../../assets/icons/cart.svg";
import GlobeIcon from "../../assets/icons/globe.svg";
import WishlistIcon from "../../assets/icons/wishlist.svg";
import ProfileIcon from "../../assets/icons/person.svg";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);

  const showLoginModal = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="left">
          <div>
            <Link to="/" className="left nav-links">
              <img src={AppLogo} alt="app-logo" />
              <span className="title">Style Beast</span>
            </Link>
          </div>
          <div>
            <Link to="/products/men" className="nav-links">
              Men
            </Link>
            <Link to="/products/women" className="nav-links">
              Women
            </Link>
            <Link to="/products/offers" className="nav-links">
              Offers
            </Link>
          </div>
        </div>
        <div className="right">
          <div className="search-bar">
            <input type="text" placeholder="Search items..." />
            <img className="search-icon" src={SearchIcon} alt="search-icon" />
          </div>
          <div>
            <button onClick={showLoginModal}>LOGIN</button>
          </div>
          <div className="menu-item">
            <Link to="/" className="nav-links">
              <img src={GlobeIcon} alt="" />
            </Link>
            <Dropdown type="language" />
          </div>
          <div className="menu-item">
            <Link to="/account" className="nav-links">
              <img src={ProfileIcon} alt="" />
            </Link>
            <Dropdown type="profile" />
          </div>
          <Link to="/" className="nav-links">
            <img src={WishlistIcon} alt="" />
          </Link>
          <Link to="/account" className="nav-links">
            <img src={CartIcon} alt="" />
          </Link>
        </div>
      </nav>
      <Login showLogin={showLogin} handleModalOpen={showLoginModal} />
    </div>
  );
}
