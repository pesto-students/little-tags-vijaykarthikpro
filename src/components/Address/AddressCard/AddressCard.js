import React from "react";
import PropTypes from 'prop-types';
import "./AddressCard.scss";

export default function AddressCard({ addressData, handleMakeDefaultAddress, handleRemoveAddress, selectAddressForShipping, isCheckout }) {


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

      const handleAddressSelection = () =>{
        selectAddressForShipping(id)
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
          {isCheckout && <input name="address" type="radio" onClick={handleAddressSelection} />  }
          <div>
            <div className="address-details">
              <div className="header">
                <h4>Address- {id + 1}</h4>
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
          
        </div>
      );
    });
  };

  return <div>{displayAddress()}</div>;
}


AddressCard.propTypes = {
  addressData: PropTypes.array,
  handleMakeDefaultAddress: PropTypes.func,
  handleRemoveAddress: PropTypes.func,
  selectAddressForShipping: PropTypes.func,
  isCheckout: PropTypes.bool
}
