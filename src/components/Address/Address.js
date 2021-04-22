import React, { useState } from "react";
import AddressCard from "./AddressCard/AddressCard";
import "./Address.scss";

export default function Address() {
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const showAddressForm = () => setShowForm(true);

  function handleChange(e) {
    setShowForm(false);
    e.preventDefault();
    const { elements } = e.target;
    const currentDetails = {
      name: elements[0].value,
      mobile: elements[1].value,
      pincode: elements[2].value,
      state: elements[3].value,
      area: elements[4].value,
      town: elements[5].value,
      city: elements[6].value,
      isDefault: elements[8].checked,
    };
    setUserDetails([...userDetails, currentDetails]);
  }

  return (
    <div>
      <h3>My Address</h3>
      <div className="main-address">
        <div>
          <button onClick={showAddressForm}>+ ADD NEW ADDRESS</button>
        </div>
        {showForm && (
          <form onSubmit={handleChange}>
            <input type="text" name="name" placeholder="Name" />

            <input type="text" name="mobile" placeholder="Mobile" />

            <div className="pincode">
              <input type="text" name="pincode" placeholder="Pincode" />
              <input type="text" name="state" placeholder="State" id="state" />
            </div>

            <input type="text" name="area" placeholder="Area" />

            <input type="text" name="town" placeholder="Town" />

            <input type="text" name="city" placeholder="City" />

            <div>
              <input type="submit" value="Save"></input>
            </div>
            <li>
              <input type="checkbox" />
              <span>Make this my default address</span>
            </li>
          </form>
        )}
      </div>
      {!showForm && <AddressCard addressData={userDetails} />}
    </div>
  );
}
