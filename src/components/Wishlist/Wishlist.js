import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromWishlist, addItemToCart } from '../../actions';
import "./Wishlist.scss";
import FirebaseContext from '../Firebase/context';
import withAuthorization from "../Session/withAuthorization";
import Toast from '../Toast/Toast';

const LOGO_COLOR = "#D99E32"

function Wishlist() {

  const firebase = useContext(FirebaseContext);
  const wishlist = useSelector(state=> state.wishlistState.wishlist);
  const cart = useSelector(state => state.cartState.cart);
  const user = useSelector(state => state.sessionState.authUser);
  const isUserLoggedIn = useSelector(state => state.sessionState.isUserLoggedIn);
  const dispatch = useDispatch();
  const [totalItems, setTotalItems] = useState(wishlist.length);
  const [toast, setToast] = useState([]);

  useEffect(() => {
    setTotalItems(wishlist.length);
    if(isUserLoggedIn) {
      firebase.saveDataToDatabase(user.uid, "wishlist", wishlist);
      firebase.saveDataToDatabase(user.uid, "cart", cart);
    }
  },[cart, firebase, isUserLoggedIn, user, wishlist]);

  const displayWishlistItems = () => {
    return wishlist.map((product) => {
      const {  uniqueId, image, title, price, size = 'XS' } = product;

      return (
        <div className="item-row" key={uniqueId}>
          <div className="product-image">
            <img src={image} alt="item" />
          </div>
          <div className="details-column">
            <div className="item-details">
              <div className="main-details">
                <span className="bold-title">{title}</span>
                <span className="details-text">Size : {size}</span>
              </div>
              <div className="price">
                <span className="price-text">₹ {price}</span>
              </div>
            </div>
            <div className="buttons">
              <span
                className="wishlist-button"
                onClick={() => {
                  dispatch(addItemToCart(product));
                  dispatch(removeItemFromWishlist(uniqueId));
                  setToast([...toast, {id: new Date().getTime(), description: 'Added to cart !', backgroundColor: LOGO_COLOR}]);
                }}
              >
                Add to bag
              </span>
              <span
                className="remove-btn"
                onClick={() => {
                  dispatch(removeItemFromWishlist(uniqueId));
                }}
              >
                Remove
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="wishlist-container">
      <span className="my-wishlist-heading">My Wishlist ( {totalItems} items )</span>
      <div className="wishlist">
        {displayWishlistItems()}
      </div>
      <Toast toastList={toast} position="top-right" autoDelete dismissTime={4000} />
    </div>
  );
}

export default withAuthorization(Wishlist);
