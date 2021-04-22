import React, { /* useEffect */ useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, addItemToWishlist, updateItemInCart } from '../../actions';
import './CheckoutPage.scss';
import withAuthorization from '../Session/withAuthorization';
import FirebaseContext from '../Firebase/context';
import { SIZES } from "../../Utils";


function CheckoutPage() {

  const firebase = useContext(FirebaseContext);
  const cart = useSelector(state => state.cartState.cart);
  console.log(cart);
  const wishlist = useSelector(state=> state.wishlistState.wishlist);
  const user = useSelector(state => state.sessionState.authUser);
  const dispatch = useDispatch(); 
  const [totalItems, setTotalItems] = useState(cart.length);

  const cartItemsTotalPrice = cart.reduce((acc, product)=>{
    return acc += product.price; 
  },0)

  const [totalPrice, setTotalPrice] = useState(cartItemsTotalPrice);

  useEffect(()=>{
    setTotalItems(cart.length);
    /* firebase.saveDataToDatabase(user.uid, "cart", cart);
    firebase.saveDataToDatabase(user.uid, "wishlist", wishlist); */
  },[cart, firebase, user, wishlist])


  const displayCartItems = () => {

    return cart.map((product)=>{
      let { id,  title, price, image, quantity = 1, size = 'XS' } = product;

      const sizes = Object.values(SIZES).map((item,id) => {
        return <option key={id}>{item}</option>
      });

      const handleSizeSelection = (e) => {
        let sizeSelected = e.target.value;
        dispatch(updateItemInCart(id, sizeSelected, quantity))
      }

      return (
        <div className="item-row" key={id}>
        <div className="product-image">
          <img src={image} alt="product-img"/>
        </div>
        <div className="details-column">
          <div className="item-details">
              <div className="main-details">
                <span className="bold-title">{title}</span>
                <div>
                <span className="details-text">Size : </span>
                <select defaultValue={size} onChange={handleSizeSelection}>
                  {sizes}
                </select>
                </div>
                <span className="quantity-title details-text">Quantity :</span>
                <div className="quantity">
                  <button className="decrease-button" onClick={()=> {
                    const minimumQuantity = quantity === 1 ? true : false;
                    if(!minimumQuantity) {
                      quantity -= 1;
                      setTotalPrice(totalPrice - price)
                      dispatch(updateItemInCart(id,size,(quantity)))
                    }
                  }}>
                    -
                  </button>
                  <span className="count-value">{quantity}</span>
                  <button className="increase-button" onClick={()=> { quantity += 1; setTotalPrice(totalPrice + price); dispatch(updateItemInCart(id,size,(quantity)))}}>
                    +
                  </button>
                </div>
              </div>
              <div className="price">
                <span className="bold-title">₹ {price}</span>
              </div> 
            </div>
            <div className="buttons">
              <span className="wishlist-button" onClick={()=> {
                if(totalItems === 1) {
                  setTotalPrice(0);
                } else {
                  setTotalPrice(totalPrice - (quantity * price));
                }
                dispatch(addItemToWishlist(product)); 
                dispatch(removeItemFromCart(id));
              }}>Move to Wishlist</span>
              <span className="remove-btn" onClick={()=>{
                if(totalItems === 1) {
                  setTotalPrice(0);
                } else {
                  setTotalPrice(totalPrice - (quantity * price));
                }
                
                dispatch(removeItemFromCart(id));
              }}>Remove</span>
            </div>
          </div>
        </div>
      )

    })
    
  }

  const handlePlaceOrder = () => {
    return null;
  }


  return (<div className="checkout-container">
    <div className="cart-list">
      <h3 className="bold-title">My Shopping Bag ( {totalItems} items )</h3>
      {displayCartItems()}
    </div>
    <div className="price-column">
      <h3 className="bold-title">Price Details ( {totalItems} items )</h3>
      <div>
        <div className="price-details">
          <div className="left bold-title">
            <span>TOTAL MRP</span>
            <span>DISCOUNT</span>
            <span>COUPON</span>
            <span>SHIPPING FEE</span>
            <span className="total-amount">TOTAL AMOUNT</span>
          </div>
          <div className="right">
            <span>₹ {parseInt(totalPrice).toFixed(2)}</span>
            <span>₹ 500</span>
            <span>₹ 0</span>
            <span>FREE</span>
            <span className="total-amount">₹ {parseInt(totalPrice).toFixed(2)}</span>
          </div>
        </div>
        <button onClick={handlePlaceOrder}>PLACE ORDER</button>
      </div>
    </div>
  </div>);
}

export default withAuthorization(CheckoutPage);
