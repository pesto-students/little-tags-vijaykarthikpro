import React from "react";
import "./AddressCard.scss";

export default function AddressCard({ addressData }) {
  const displayAddress = () => {
    console.log(addressData, "user data from card");
    return addressData.map((userData, id) => {
      const {
        name,
        mobile,
        pincode,
        state,
        area,
        town,
        city,
        isDefault,
      } = userData;
      return (
        <div className="address-card" key={id}>
          <div className="default-address">
            <h3>Address- {id + 1}</h3>
            {isDefault ? (
              <div>Default Address</div>
            ) : (
              <button>Make Default</button>
            )}
          </div>
          <div>{name}</div>
          <div>{area}</div>
          <div>{town}</div>
          <div>
            {city}
            <span>-{pincode}</span>
          </div>
          <div>{state}</div>
          <div>
            <span>Mobile-</span>
            {mobile}
          </div>
        </div>
      );
    });
  };

  return <div>{displayAddress()}</div>;
}
