import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as ROUTES from "../../constants/routes";
import "./Burger.scss";
import AppLogo from "../../assets/icons/logo-symbol.png";
import CloseIcon from "../../assets/icons/clear.svg";

export default function Burger({ showMenu, handleBurgerClose }) {
  const languageData = useSelector((state) => state.sessionState.data);

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
              <span>{languageData.categories}</span>
              <ul onClick={handleBurgerClose}>
                <li>
                  <Link to={ROUTES.MEN} className="nav-links">
                    {languageData.men}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.WOMEN} className="nav-links">
                    {languageData.women}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.JACKETS} className="nav-links">
                    {languageData.jackets}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.TSHIRTS} className="nav-links">
                    {languageData.tshirts}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ELECTRONICS} className="nav-links">
                    {languageData.electronics}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.JEWELLERY} className="nav-links">
                    {languageData.jewellery}
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
