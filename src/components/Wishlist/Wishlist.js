import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromWishlist, addItemToCart } from '../../actions';
import "./Wishlist.scss";
import FirebaseContext from '../Firebase/context';
import withAuthorization from "../Session/withAuthorization";

function Wishlist() {

  const firebase = useContext(FirebaseContext);
  const wishlist = useSelector(state=> state.wishlistState.wishlist);
  const cart = useSelector(state => state.cartState.cart);
  const user = useSelector(state => state.sessionState.authUser);
  const dispatch = useDispatch();
  const [totalItems , setTotalItems] = useState(wishlist.length);

  useEffect(()=>{
    setTotalItems(wishlist.length);
    firebase.saveDataToDatabase(user.uid, "wishlist", wishlist);
    firebase.saveDataToDatabase(user.uid, "cart", cart);
  },[cart, firebase, user.uid, wishlist]);

  const displayWishlistItems = () =>{
    return wishlist.map((product)=>{
      const { id, image, title, price } = product;

      return(
          <div className="item-row" key={id}>
            <div className="product-image">
              <img src={image} alt="item" />
            </div>
            <div className="details-column">
              <div className="item-details">
                <div className="main-details">
                  <span className="bold-title">{title}</span>
                  <span className="details-text">Size : XL</span>
                </div>
                <div className="price">
                  <span className="bold-title">₹ {price}</span>
                </div>
              </div>
              <div className="buttons">
                <span className="wishlist-button" onClick={()=> {dispatch(addItemToCart(product)); dispatch(removeItemFromWishlist(id))}}>Add to bag</span>
                <span className="remove-btn" onClick={()=>dispatch(removeItemFromWishlist(id))}>
                  Remove
                </span>
              </div>
            </div>
          </div>
      )

    })
    
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist">
          <h3 className="bold-title">My Wishlist ( {totalItems} items )</h3>
          {displayWishlistItems()}
      </div>      
    </div>
  );
}

export default withAuthorization(Wishlist);
