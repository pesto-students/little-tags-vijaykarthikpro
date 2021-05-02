import React from "react";
import "./OrderCard.scss";

export default function OrderCard({ ordersData }) {
  const displayOrder = () => {
    return ordersData.map((item,id) => {
      const { image, title, price, address :{ name, area, town, city, pincode, state, mobile } } = item;
      return (
        <div className="card-main" key={id}>
          <div className="card-top">
            <div>
              <span className="order-title">{title}</span>
              <p>Color-Black</p>
              <span className="order-title"> ₹ {price}</span>
              <div className="subtitle-size">
                Ordered -<span>1st Thu, 2021</span>
              </div>
              {/* <div className="subtitle-size">
                Delivered -<spann>10th Thu, 2021</spann>
              </div> */}
            </div>

            <div className="order-image">
              <img src={image} alt="order-card-img" />
            </div>
          </div>
          <div className="card-bottom">
            <div className="address-section">
              <span className="order-title">Address</span>
              <div className="address-content">
                <div>{name}</div>
                <div>{area}</div>
                <div>{town}</div>
                <div>
                  {city}
                  <span>-{pincode}</span>
                </div>
                <div>{state}</div>
                <div>
                  <span>Mobile : </span>
                  {mobile}
                </div>
              </div>
            </div>
            <div className="price-section">
              <span className="order-title">Price details</span>
              <div className="price-details">
                <div className="price-title">
                  <li>Selling Price</li>
                  <li>Shiping Fee</li>
                  <li>Total amount</li>
                </div>
                <div className="price">
                  <li>₹ {price}</li>
                  <li>Free</li>
                  <li>₹ {price}</li>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return <div className="order-main">{displayOrder()}</div>;
}
