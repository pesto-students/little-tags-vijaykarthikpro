import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.scss";
import Dropdown from "./Dropdown/Dropdown";
import Login from "../Login/Login";
import Burger from "../Burger/Burger";
import AppLogo from "../../assets/icons/logo-symbol.png";
import SearchIcon from "../../assets/icons/search.svg";
import CartIcon from "../../assets/icons/cart.svg";
import GlobeIcon from "../../assets/icons/globe.svg";
import WishlistIcon from "../../assets/icons/wishlist.svg";
import ProfileIcon from "../../assets/icons/person.svg";
import Menu from "../../assets/icons/menu.svg";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuClick, setMenuClick] = useState(false);

  const isUserLoggedIn = useSelector(
    (state) => state.sessionState.isUserLoggedIn
  );

  const showLoginModal = () => setShowLogin(!showLogin);
  const handleMenuClick = (event) => {
    setMenuClick(!menuClick);
    // event.stopPropagation();
  };
  const renderProfileIcon = () => {
    if (isUserLoggedIn) {
      return (
        <div className="menu-item">
          <Link to="/account" className="nav-links">
            <img src={ProfileIcon} alt="profile-icon" />
          </Link>
          <Dropdown type="profile" />
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={showLoginModal}>LOGIN</button>
        </div>
      );
    }
  };

  return (
    <div className="website-header">
      <nav className="navbar">
        <div className="left">
          <div className="hamburger-menu" onClick={handleMenuClick}>
            <img className="burger-icon" src={Menu} alt="menu-icon" />
            <Burger showMenu={menuClick} handleMenuClick={handleMenuClick} />
          </div>
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
          <div className="menu-item">
            <Link to="/" className="nav-links">
              <img src={GlobeIcon} alt="globe-icon" />
            </Link>
            <Dropdown type="language" />
          </div>
          {renderProfileIcon()}
          <Link to="/account/wishlist" className="nav-links">
            <img src={WishlistIcon} alt="wishlist-icon" />
          </Link>

          <Link to="/checkout" className="nav-links">
            <img src={CartIcon} alt="cart-icon" />
          </Link>
        </div>
      </nav>
      <Login showLogin={showLogin} handleModalOpen={showLoginModal} />
    </div>
  );
}
