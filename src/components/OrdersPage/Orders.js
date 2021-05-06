import React from "react";
import { useSelector } from 'react-redux';
// import OrdersData from "../../data/products";
import OrderCard from "./OrderCard/OrderCard";
import "./Orders.scss";

export default function Orders() {

  const ordersData = useSelector(state=> state.ordersState.orders);

  return (
    <div className="orders-page">
      <span className="my-orders-title">My Orders</span>
      <OrderCard ordersData={ordersData} />
      {ordersData.length === 0 && <div className="display-txt">Hey, You have not placed any orders yet!</div>}
    </div>
  );
}
