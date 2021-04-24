import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, addItemToWishlist, updateItemInCart, confirmOrder, removeCartItems } from '../../actions';
import './CheckoutPage.scss';
import withAuthorization from '../Session/withAuthorization';
import FirebaseContext from '../Firebase/context';
import { SIZES } from "../../Utils";
import Address from '../Address/Address';


function CheckoutPage() {

  const firebase = useContext(FirebaseContext);
  const cart = useSelector(state => state.cartState.cart);
  const wishlist = useSelector(state=> state.wishlistState.wishlist);
  const orders = useSelector(state=> state.ordersState.orders);
  const user = useSelector(state => state.sessionState.authUser);
  const isUserLoggedIn = useSelector(state => state.sessionState.isUserLoggedIn);
  const dispatch = useDispatch(); 
  const [totalItems, setTotalItems] = useState(cart.length);
  const cartItemsTotalPrice = cart.reduce((acc, product)=>{
    return acc += product.price; 
  },0)

  const [totalPrice, setTotalPrice] = useState(cartItemsTotalPrice);
  const [showSelectAddress,setShowSelectAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({});

  useEffect(()=>{
    setTotalItems(cart.length);

    if(isUserLoggedIn) {
      firebase.saveDataToDatabase(user.uid, "cart", cart);
      firebase.saveDataToDatabase(user.uid, "wishlist", wishlist);
      firebase.saveDataToDatabase(user.uid, "orders", orders);
    }
  },[cart, firebase, isUserLoggedIn, user, wishlist, cartItemsTotalPrice, orders])




  const displayCartItems = () => {

    return cart.map((product)=>{
      let { uniqueId, title, price, image, quantity = 1, size = 'XS' } = product;

      const sizes = Object.values(SIZES).map((item,id) => {
        return <option key={id}>{item}</option>
      });

      const handleSizeSelection = (e) => {
        let sizeSelected = e.target.value;
        dispatch(updateItemInCart(uniqueId, sizeSelected, quantity))
      }

      const handleQuantityIncrease = () => {
        quantity += 1; 
        setTotalPrice(totalPrice + price); 
        dispatch(updateItemInCart(uniqueId,size,(quantity)))
      }

      const handleQuantityDecrease = () =>{
        const minimumQuantity = quantity === 1 ? true : false;
        if(!minimumQuantity) {
          quantity -= 1;
          setTotalPrice(totalPrice - price)
          dispatch(updateItemInCart(uniqueId,size,(quantity)))
        }
      }

      return (
        <div className="item-row" key={uniqueId}>
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
                  <button className="decrease-button" onClick={handleQuantityDecrease}>
                    -
                  </button>
                  <span className="count-value">{quantity}</span>
                  <button className="increase-button" onClick={handleQuantityIncrease}>
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
                dispatch(removeItemFromCart(uniqueId));
              }}>Move to Wishlist</span>
              <span className="remove-btn" onClick={()=>{
                if(totalItems === 1) {
                  setTotalPrice(0);
                } else {
                  setTotalPrice(totalPrice - (quantity * price));
                }
                
                dispatch(removeItemFromCart(uniqueId));
              }}>Remove</span>
            </div>
          </div>
        </div>
      )

    })
    
  }

  const selectAddressForShipping = (id) =>{
    const selectedAddress = user.address.filter((_,index)=> index === id);
    setShippingAddress(selectedAddress[0]);
  }

  const displayAddressSelection = () =>{
    return <Address isCheckout={true} selectAddressForShipping={selectAddressForShipping} shippingAddress={shippingAddress}/>
  }

  const handlePlaceOrder = () => {

    if(cart.length !== 0) {
      if(Object.keys(shippingAddress).length !== 0) {
        const orders = cart.map((item)=>{
          return {...item, address: shippingAddress}
        });
        dispatch(confirmOrder(orders));
        dispatch(removeCartItems());
        setTotalPrice(0);
        alert("Order placed successfully");
      } else {
        alert("selected shipping address");
      }
    } else {
      alert("Add items to cart");
    }
    
  }




  return (<div className="checkout-container">
      <div className="cart-list">
        <div className="checkout-header">
          <button onClick={()=> setShowSelectAddress(false)}>Bag</button>
          <button onClick={()=> setShowSelectAddress(true)}>Address</button>
        </div>
        {!showSelectAddress && <span className="bold-title">My Shopping Bag ( {totalItems} items )</span>}
        {!showSelectAddress ? displayCartItems() : displayAddressSelection()}
      </div>
      <div className="price-column">
        <span className="bold-title">Price Details ( {totalItems} items )</span>
        <div>
          <div className="price-details">
            <div className="left">
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
