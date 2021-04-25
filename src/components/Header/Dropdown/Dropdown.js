import React, { useEffect, useState, useContext } from "react";
import FirebaseContext from "../../Firebase/context";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../../actions";
import { Link } from "react-router-dom";
import { ProfileItems } from "./MenuItems";
import { LanguageItems } from "./MenuItems";
import "../Header.scss";

export default function Dropdown({ type }) {
  const [click, setClick] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const user = useSelector((state) => state.sessionState.authUser);
  const dispatch = useDispatch();

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (type === "profile") {
      setMenuItems(ProfileItems);
    } else if (type === "language") {
      setMenuItems(LanguageItems);
    }
  }, [type, user]);

  useEffect(() => {});

  const handleLogout = () => {
    firebase.doSignOut();
  };

  const handleLanguage = (e) => {
    let language = e.target.id;
    console.log("button Clicked", e.target.id);
    dispatch(setLanguage(language));
  };

  const displayDropDownList = () => {
    if (type === "profile") {
      const userMenu = menuItems.map((item, index) => {
        return (
          <li key={index}>
            <Link
              className="dropdown-link"
              to={item.path}
              onClick={() => setClick(!click)}
            >
              {item.title}
            </Link>
          </li>
        );
      });

      return (
        <div>
          <div className="profile-menu">
            <span className="hello">Hello </span>
            <span className="username">{user.name.split(" ")[0]}</span>
          </div>
          <div className="item-padding">
            {userMenu}
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      );
    } else {
      // const languageMenu = menuItems.map((item, index) => {
      //   return (
      //     <li key={index}>
      //       <Link
      //         className="dropdown-link"
      //         to={item.path}
      //         onClick={() => setClick(!click)}
      //       >
      //         {item.title}
      //       </Link>
      //     </li>
      //   );
      // });

      return (
        <div className="language-options">
          {/* {languageMenu} */}
          <button
            className="language-item"
            id="HI"
            onClick={(e) => handleLanguage(e)}
          >
            Hindi
          </button>
          <button
            className="language-item"
            id="EN"
            onClick={(e) => handleLanguage(e)}
          >
            English
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <ul className="dropdown-menu">{displayDropDownList()}</ul>
    </div>
  );
}

Dropdown.propTypes = {
  type: PropTypes.string,
};

Dropdown.defaultProps = {
  type: "",
};
