import React from "react";
import "./Footer.scss";
import AppLogo from "../../assets/icons/logo-symbol.png";
import LoveSymbol from "../../assets/icons/love-symbol.svg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="ft-logo">
        <img src={AppLogo} alt="app-logo" />
        <div className="ft-address">
          <span>Registered Office Address</span>
          <div className="top">
            <p>Style Beast</p>
            <p>Hyderbad, 500026</p>
            <p>India</p>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="ft-links">
          <span>
            Made with <img src={LoveSymbol} alt="love" /> by
            <a href="https://github.com/vijaykarthikpro" target="_blank">
              Karthik{" "}
            </a>{" "}
            and
            <a href="https://github.com/Rasika-Hatwar" target="_blank">
              Rasika
            </a>
          </span>

          <span></span>
        </div>
        <div className="copyright">
          <span>&#169;2021 www.stylebeast.com</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </div>
  );
}
