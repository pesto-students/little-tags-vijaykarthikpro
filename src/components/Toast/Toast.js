import React from "react";
import "./Toast.scss";

const Toast = (props) => {
  const { toastMessage } = props;

  return (
    <div className="notification-container success">
      <div>
        <p className="notification-message">{toastMessage}</p>
      </div>
    </div>
  );
};
export default Toast;
