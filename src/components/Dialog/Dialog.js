import React from "react";
import PropTypes from 'prop-types';
import AppLogo from "../../assets/icons/logo-symbol.png";
import CrossIcon from "../../assets/icons/clear.svg";

export default function Dialog( { handleModalClose, displayContent }) {

  return (
    <div className="modal">
      <div className="outer">
        <div className="top-section">
          <div className="logo-item">
            <img src={AppLogo} alt="logo-img" />
            <span className="title">Style Beast</span>
          </div>
          <img
            src={CrossIcon}
            alt="cancel-icon"
            onClick={handleModalClose}
            className="close-modal"
          />
        </div>
        {displayContent()}
      </div>
    </div>
  );
}

Dialog.propTypes = {
  handleModalClose : PropTypes.func.isRequired,
  displayContent : PropTypes.func.isRequired
}

Dialog.defaultProps = {
  handleModalClose : () => {},
  displayContent: () => {} 
}
