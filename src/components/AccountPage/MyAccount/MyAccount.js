import React from "react";
import { useSelector } from "react-redux";
import "./MyAccount.scss";

export default function Address() {
  const user = useSelector((state) => state.sessionState.authUser);
  return (
    <div className="my-account">
      <span className="Welcoome">Welcome </span>
      <span className="username">{user.name.split(" ")[0]}</span>
      <div className="card-content">
        <div className="card-element"> My Orders</div>
        <div className="card-element"> My Wishlist</div>
        <div className="card-element"> My Bag</div>
      </div>
    </div>
  );
}
