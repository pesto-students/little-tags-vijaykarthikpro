import React from "react";
import "./AddressCard.scss";

export default function AddressCard({ addressData, handleMakeDefaultAddress, handleRemoveAddress }) {

  const displayAddress = () => {

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

      const handleMakeDefault = () =>{
        handleMakeDefaultAddress(id);
      }

      const handleRemove = () =>{
        if(isDefault) {
          alert("Make any other address as default and then remove this address!");
        } else {
          handleRemoveAddress(id);
        }
      }

      return (
        <div className="address-card" key={id}>
          <div className="address-details">
            <div className="header">
              <h3>Address- {id + 1}</h3>
              {isDefault && <div>Default address</div>}
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
              <span>Mobile : </span>
              {mobile}
            </div>
          </div>
          <div className="action-buttons">
            
            {!isDefault ?
              <span className="remove-btn" onClick={handleMakeDefault}>Make Default</span> :
              <div></div>
            }

            <span className="remove-btn" onClick={handleRemove}>Remove</span> 
          </div>
        </div>
      );
    });
  };

  return <div>{displayAddress()}</div>;
}
