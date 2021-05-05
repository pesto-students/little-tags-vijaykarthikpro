import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.scss";
import * as ROUTES from "../../constants/routes";
import Login from "../Login/Login";
import Burger from "../Burger/Burger";
import AppLogo from "../../assets/icons/logo-symbol.png";
import CartIcon from "../../assets/icons/cart.svg";
import GlobeIcon from "../../assets/icons/globe.svg";
import WishlistIcon from "../../assets/icons/wishlist.svg";
import ProfileIcon from "../../assets/icons/person.svg";
import Menu from "../../assets/icons/menu.svg";
import Dropdown from "./Dropdown/Dropdown";
import Search from "./Search/Search";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [isHamburgerMenuOpen, setHamBurgerMenu] = useState(false);
  const cart = useSelector((state) => state.cartState.cart);
  const wishlist = useSelector((state) => state.wishlistState.wishlist);
  const languageData = useSelector((state) => state.sessionState.data);

  const isUserLoggedIn = useSelector(
    (state) => state.sessionState.isUserLoggedIn
  );

  const showLoginModal = () => setShowLogin(!showLogin);
  const handleBurgerClose = () => {
    setHamBurgerMenu(!isHamburgerMenuOpen);
  };

  const renderProfileIcon = () => {
    if (isUserLoggedIn) {
      return (
        <div className="menu-item">
          <Link to={ROUTES.ACCOUNT} className="nav-links">
            <img src={ProfileIcon} alt="profile-icon" />
          </Link>
          <Dropdown type="profile" />
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={showLoginModal}>{languageData.login}</button>
        </div>
      );
    }
  };

  return (
    <div className="website-header">
      <nav className="navbar">
        <div className="left">
          <div className="hamburger-menu">
            <img
              className="burger-icon"
              src={Menu}
              alt="menu-icon"
              onClick={handleBurgerClose}
            />
            <Burger
              showMenu={isHamburgerMenuOpen}
              handleBurgerClose={handleBurgerClose}
            />
          </div>
          <div className="logo">
            <Link to={ROUTES.HOME} className="left nav-links">
              <img src={AppLogo} alt="app-logo" />
              <span className="title">Style Beast</span>
            </Link>
          </div>
          <div className="category-links">
            {/* <Link to={ROUTES.MEN} className="nav-links">
              {languageData.men}
            </Link>
            <Link to={ROUTES.WOMEN} className="nav-links">
              {languageData.women}
            </Link> */}
            {/* <Link to="/products/offers" className="nav-links">
              Offers
            </Link> */}
          </div>
        </div>
        <div className="right">
          <div className="search-bar">
            <Search />
          </div>
          <div className="menu-item">
            <div className="nav-links">
              <img src={GlobeIcon} alt="globe-icon" />
              <Dropdown type="language" />
            </div>
          </div>
          {renderProfileIcon()}
          <Link to={ROUTES.WISHLIST} className="cart-icon nav-links">
            <img src={WishlistIcon} alt="wishlist-icon" />
            {wishlist.length > 0 ? (
              <div className="cart-count">{wishlist.length}</div>
            ) : null}
          </Link>

          <Link to={ROUTES.CHECKOUT} className="cart-icon nav-links">
            <img src={CartIcon} alt="cart-icon" />
            {cart.length > 0 ? (
              <div className="cart-count">{cart.length}</div>
            ) : null}
          </Link>
        </div>
      </nav>
      <Login showLogin={showLogin} handleModalOpen={showLoginModal} />
    </div>
  );
}
