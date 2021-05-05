import React from "react";
import { useSelector } from "react-redux";
import "./MyAccount.scss";

export default function Address() {
  const user = useSelector((state) => state.sessionState.authUser);
  const orders = useSelector(state=> state.ordersState.orders);
  const wishlist = useSelector(state=> state.wishlistState.wishlist);
  const cart = useSelector(state => state.cartState.cart);

  return (
    <div className="my-account">
      <div className="welcome-user">
        {/* <span className="Welcoome">Welcome </span> */}
        <div className="username"><span>Name</span>: {user.name}</div>
        <div className="email"><span>Email</span>: {user.email}</div>
      </div>
      <div className="card-content">
        <div className="card-element">
          <span className="card-title"> My Orders </span>
          <span className="display-number">{orders.length}</span>
        </div>
        <div className="card-element">
          <span className="card-title"> My Wishlist </span>
          <span className="display-number">{wishlist.length}</span>
        </div>
        <div className="card-element">
          <span className="card-title"> My Bag </span>
          <span className="display-number">{cart.length}</span>
        </div>
      </div>
    </div>
  );
}
