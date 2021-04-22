import React, { useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";
import FirebaseContext from "../Firebase/context";
import "./AccountPage.scss";
import Orders from "../OrdersPage/Orders";
import Wishlist from "../Wishlist/Wishlist";
import Address from "../Address/Address";
// import MyAccount from "./MyAccount/MyAccount";
import * as ROUTES from "../../constants/routes";
import withAuthorization from "../Session/withAuthorization";

function AccountPage() {
  const firebase = useContext(FirebaseContext);
  const handleLogout = () => {
    firebase.doSignOut();
  };

  return (
    <div className="account-main">
      <div className="account-aside">
        <Link to={ROUTES.ORDERS} className="nav-links">
          Orders
        </Link>
        <Link to={ROUTES.ADDRESS} className="nav-links">
          Address
        </Link>
        <Link to={ROUTES.WISHLIST} className="nav-links">
          Wishlist
        </Link>
        <Link to={ROUTES.HOME} className="nav-links" onClick={handleLogout}>
          Log Out
        </Link>
      </div>
      <div className="account-content">
        {/* <MyAccount /> */}
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
        </Switch>
      </div>
    </div>
  );
}

export default withAuthorization(AccountPage);
