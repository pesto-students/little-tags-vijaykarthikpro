import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../actions";
import AddressCard from "./AddressCard/AddressCard";
import "./Address.scss";

export default function Address() {
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.sessionState.authUser);
  console.log(user, "user from address");
  const showAddressForm = () => setShowForm(true);

  useEffect(() => {
    dispatch(setAddress(userDetails));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  function handleChange(e) {
    const isDefaultAvailable = userDetails.filter(({ isDefault }) =>
      isDefault ? true : false
    );
    console.log(isDefaultAvailable);
    setShowForm(false);
    e.preventDefault();
    let isCurrentAddressDefault = false;
    if (!isDefaultAvailable.length > 0) {
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
            <li>
              <input type="checkbox" />
              <span>Make this my default address</span>
            </li>
            <div>
              <input type="submit" value="Save"></input>
            </div>
          </form>
        )}
      </div>
      {!showForm && <AddressCard addressData={userDetails} />}
    </div>
  );
}
