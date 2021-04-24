import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { setAddress } from "../../actions";
import AddressCard from "./AddressCard/AddressCard";
import "./Address.scss";
import FirebaseContext from '../Firebase/context';
import AddressForm from "./AddressFormModal/AddressForm";

export default function Address({ isCheckout, selectAddressForShipping }) {

  const firebase = useContext(FirebaseContext);
  const user = useSelector((state) => state.sessionState.authUser);
  const [showForm, setShowForm] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [isDefaultAddress , setDefaultAddress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() =>{
    if(user.address) {
      setUserAddresses(user.address);
    }
  },[user.address]);
  
  const showAddressForm = () => setShowForm(true);

  useEffect(() => {
    dispatch(setAddress(userAddresses));
    firebase.saveDataToDatabase(user.uid, "address", userAddresses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddresses]);

/*   const handleAddressSelection = () => {
    selectAddressForShipping()
  } */

  const handleMakeDefaultAddress = (id) =>{

    let updatedAddresses = userAddresses.map((address, index) => {
      if(index !== id) {
        return { ...address, isDefault: false}
      }
      return {...address, isDefault : true}
    });

    setUserAddresses(updatedAddresses);
  }

  const handleRemoveAddress = (id) => {
    let updatedAddresses = userAddresses.filter((_,index) => index !== id );
    setUserAddresses(updatedAddresses);
  }

  const handleFormClose = () =>{
    setShowForm(false);
  }

  function handleFormSubmit(e) {
    const isDefaultAvailable = userAddresses.filter(({ isDefault }) =>
      isDefault ? true : false
    );
    console.log(isDefaultAvailable);
    setShowForm(false);
    e.preventDefault();
    let isCurrentAddressDefault = false;
    if (!isDefaultAvailable.length > 0) {
      setDefaultAddress(true);
      isCurrentAddressDefault = true;
    }
    const { elements } = e.target;
    const currentDetails = {
      name: elements[0].value,
      mobile: elements[1].value,
      pincode: elements[2].value,
      state: elements[3].value,
      area: elements[4].value,
      town: elements[5].value,
      city: elements[6].value,
      isDefault: isCurrentAddressDefault,
    };
    setUserAddresses([...userAddresses, currentDetails]);
  }

  return (
    <div className="address-page">
      <span className="my-address-heading">{isCheckout ? 'Select Address' : 'My Address'}</span>
      <div className="main-address">
        <div>
          <button onClick={showAddressForm}>+ <span>ADD NEW ADDRESS</span></button>
        </div>
        {showForm && <AddressForm handleFormSubmit={handleFormSubmit} handleFormClose={handleFormClose} isDefaultAddress={isDefaultAddress}/>}
      </div>
      <AddressCard 
        addressData = {userAddresses} 
        handleMakeDefaultAddress = {handleMakeDefaultAddress}
        handleRemoveAddress = {handleRemoveAddress}
        selectAddressForShipping = {selectAddressForShipping}
        isCheckout = {isCheckout}
      />
    </div>
  );
}

Address.propTypes = {
  isCheckout: PropTypes.bool,
  selectAddressForShipping: PropTypes.func,
}
