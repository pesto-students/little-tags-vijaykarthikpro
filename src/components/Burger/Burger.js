import React from "react";
import { Link /* , Switch, Route */ } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./Burger.scss";
import AppLogo from "../../assets/icons/logo-symbol.png";
import CloseIcon from "../../assets/icons/clear.svg";

export default function Burger({ showMenu, handleBurgerClose }) {
  return (
    <>
      {showMenu ? (
        <div className="burger-modal">
          <div className="burger-main">
            <div className="burger-header">
              <div className="header-logo">
                <img className="logo" src={AppLogo} alt="app-logo" />
                <span className="title">Style Beast</span>
              </div>
              <img
                className="close-icon"
                src={CloseIcon}
                alt="close"
                onClick={handleBurgerClose}
              />
            </div>
            <div className="line-divider"></div>
            <div className="burger-list">
              <span>
                CATEGORIES
              </span>
              <ul onClick={handleBurgerClose}>
                <li>
                  <Link to={ROUTES.MEN} className="nav-links">
                    Men
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.WOMEN} className="nav-links">
                    Women
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.JACKETS} className="nav-links">
                    Jackets
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.TSHIRTS} className="nav-links">
                    T-Shirts
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ELECTRONICS} className="nav-links">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.JEWELLERY} className="nav-links">
                    Jewellery
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
