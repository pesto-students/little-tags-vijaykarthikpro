import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../../assets/icons/clear.svg'
import './AddressForm.scss';

export default function AddressForm({ handleFormSubmit, handleFormClose, isDefaultAddress }) {


    return (<div className="address-form-modal">
        <div className="outer">
        <div className="address-form-header">
            <h4>Add Address</h4>
            <img className="close-icon" src={closeIcon} alt="close" onClick={handleFormClose}/>
        </div>
        <div className="form-fields">
          <form onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="Name" required/>

            <input type="text" name="mobile" placeholder="Mobile" required/>

            <div className="pincode">
              <input type="text" name="pincode" placeholder="Pincode" required/>
              <input type="text" name="state" placeholder="State" id="state" required/>
            </div>

            <input type="text" name="area" placeholder="Area" required/>

            <input type="text" name="town" placeholder="Town" required/>

            <input type="text" name="city" placeholder="City" required/>
            {!isDefaultAddress && <li>
              <input type="checkbox" />
              <span>Make this my default address</span>
            </li>}
            
            <input type="submit" value="Save"/>
            
          </form>
      </div>
      </div>
  </div>)
}

AddressForm.propTypes = {
    handleFormSubmit: PropTypes.func.isRequired,
    isDefaultAddress: PropTypes.bool.isRequired
}