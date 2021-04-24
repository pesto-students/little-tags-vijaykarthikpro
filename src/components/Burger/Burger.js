import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./Burger.scss";
import AppLogo from "../../assets/icons/logo-symbol.png";

export default function Burger({ showMenu, handleMenuClick }) {
  return (
    <>
      {showMenu ? (
        <div className="burger-modal">
          <div className="burger-main">
            <div className="burger-header">
              <img src={AppLogo} alt="app-logo" />
              <span className="title">Style Beast</span>
            </div>
            <div className="burger-list">
              <h4>Categories</h4>
              <ul>
                <li>
                  <Link to={ROUTES.MEN} className="nav-links">
                    MEN
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.WOMEN} className="nav-links">
                    WOMEN
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.JACKETS} className="nav-links">
                    JACKETS
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.TSHIRTS} className="nav-links">
                    T-SHIRTS
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ELECTRONICS} className="nav-links">
                    ELECTRONICS
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.JEWELLERY} className="nav-links">
                    JEWELLERY
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
