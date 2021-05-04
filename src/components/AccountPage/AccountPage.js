import React, { useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";
import FirebaseContext from "../Firebase/context";
import "./AccountPage.scss";
import Orders from "../OrdersPage/Orders";
import Wishlist from "../Wishlist/Wishlist";
import Address from "../Address/Address";
import * as ROUTES from "../../constants/routes";
import withAuthorization from "../Session/withAuthorization";
import MyAccount from "./MyAccount/MyAccount";

function AccountPage() {
  const firebase = useContext(FirebaseContext);
  const handleLogout = () => {
    firebase.doSignOut();
  };

  return (
    <div className="account-main">
      <div className="account-aside">
        <Link to={ROUTES.ACCOUNT} className="nav-links">
          My Account
        </Link>
        <Link to={ROUTES.ORDERS} className="nav-links">
          My Orders
        </Link>
        <Link to={ROUTES.ADDRESS} className="nav-links">
          My Address
        </Link>
        <Link to={ROUTES.WISHLIST} className="nav-links">
          My Wishlist
        </Link>
        <Link to={ROUTES.HOME} className="nav-links" onClick={handleLogout}>
          Log Out
        </Link>
      </div>
      <div className="account-content">
        <Switch>
          <Route path={ROUTES.ORDERS}>
            <Orders />
          </Route>
          <Route path={ROUTES.ADDRESS}>
            <Address />
          </Route>
          <Route path={ROUTES.WISHLIST}>
            <Wishlist />
          </Route>
          <Route path={ROUTES.ACCOUNT}>
            <MyAccount />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withAuthorization(AccountPage);
