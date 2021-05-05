/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../actions";
import { SIZES } from "../../Utils";
import "./ProductDetailsPage.scss";
import CartIcon from "../../assets/icons/cart-filled.svg";
import WishlistIcon from "../../assets/icons/wishlist-filled.svg";
import Products from "../../data/products";
import FirebaseContext from "../Firebase/context";
import Login from "../Login/Login";
import Carousel from "../Carousel/Carousel";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import Toast from "../Toast/Toast";

const GREEN_COLOR = "#32CD32";

export default function ProductDetailsPage() {
  const cart = useSelector((state) => state.cartState.cart);
  const wishlist = useSelector((state) => state.wishlistState.wishlist);
  const firebase = useContext(FirebaseContext);
  const user = useSelector((state) => state.sessionState.authUser);
  const isUserLoggedIn = useSelector(
    (state) => state.sessionState.isUserLoggedIn
  );
  const [quantityCount, setQuantityCount] = useState(1);
  const [product, setProduct] = useState({});
  const [isAddToCart, setAddToCart] = useState(false);
  const [isAddToWishlist, setAddToWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState(SIZES.XS);
  const [showLogin, setShowLogin] = useState(false);
  const [toast, setToast] = useState([]);

  const showLoginModal = () => setShowLogin(!showLogin);

  const dispatch = useDispatch();
  const location = useLocation();
  const title = location.pathname.split("/")[2];

  useEffect(() => {
    Products.map((item) => {
      if (item.title.toString() === title) setProduct(item);
      return null;
    });
  }, [title]);

  useEffect(() => {
    if (isUserLoggedIn) {
      firebase.saveDataToDatabase(user.uid, "cart", cart);
      firebase.saveDataToDatabase(user.uid, "wishlist", wishlist);
    }
  }, [cart, firebase, isUserLoggedIn, user, wishlist]);

  const displaySizes = () => {
    const sizesList = Object.values(SIZES);
    return sizesList.map((size, id) => {
      if (size === selectedSize) {
        return (
          <span
            key={id}
            className="size selected"
            onClick={() => setSelectedSize(size)}
          >
            {" "}
            {size}{" "}
          </span>
        );
      } else {
        return (
          <span key={id} className="size" onClick={() => setSelectedSize(size)}>
            {" "}
            {size}{" "}
          </span>
        );
      }
    });
  };

  const increaseCount = () => setQuantityCount(quantityCount + 1);

  const decreaseCount = () => {
    const countValue = quantityCount < 2 ? 1 : quantityCount - 1;
    setQuantityCount(countValue);
  };

  const handleAddToCartClick = () => {
    if (isUserLoggedIn) {
      setShowLogin(false);
      setAddToCart(!isAddToCart);
    } else {
      setShowLogin(true);
    }
  };

  const handleAddToWishlistClick = () => {
    if (isUserLoggedIn) {
      setShowLogin(false);
      setAddToWishlist(!isAddToWishlist);
    } else {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    if (isAddToCart) {
      product.size = selectedSize;
      product.quantity = quantityCount;
      product.uniqueId = new Date().getTime();
      dispatch(addItemToCart(product));
      setToast([
        ...toast,
        {
          id: new Date().getTime(),
          description: "Added To Cart",
          backgroundColor: GREEN_COLOR,
        },
      ]);
    } else if (isUserLoggedIn) dispatch(removeItemFromCart(product.uniqueId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddToCart]);

  useEffect(() => {
    if (isAddToWishlist) {
      product.size = selectedSize;
      product.quantity = quantityCount;
      product.uniqueId = new Date().getTime();
      dispatch(addItemToWishlist(product));
      setToast([
        ...toast,
        {
          id: new Date().getTime(),
          description: "Added To Wishlist",
          backgroundColor: GREEN_COLOR,
        },
      ]);
    } else if (isUserLoggedIn)
      dispatch(removeItemFromWishlist(product.uniqueId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddToWishlist]);

  return (
    <div className="product-details-container">
      <div className="details">
        <div className="image-carousel">
          {product.hasOwnProperty("imageCarousel") ? (
            <Carousel slides={product.imageCarousel} />
          ) : (
            <img src={product.image} alt="products" />
          )}
        </div>
        <div className="description">
          <h3 className="title">{product.title ? product.title : "Jacket"}</h3>
          <h3>
            Price : <span className="price-text">₹</span>
            <span className="price-text">{product.price}</span>
          </h3>
          <p className="description-text">{product.description}</p>
          <h3 className="size-title">Size</h3>
          <div className="sizes-list">{displaySizes()}</div>
          <h3 className="quantity-title">Quantity</h3>
          <div className="quantity">
            <button className="decrease-button" onClick={decreaseCount}>
              -
            </button>
            <span className="count-value">{quantityCount}</span>
            <button className="increase-button" onClick={increaseCount}>
              +
            </button>
          </div>
          <div className="add-to-buttons">
            <button className="cart" onClick={handleAddToCartClick}>
              <img src={CartIcon} alt="cart-icon" />
              <span className="cart-btn-text">
                {isAddToCart ? "Remove from Cart" : "Add to Cart"}
              </span>
            </button>
            <button className="wishlist" onClick={handleAddToWishlistClick}>
              <img src={WishlistIcon} alt="wishlist-icon" />
              <span className="wishlist-btn-text">
                {isAddToWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <SimilarProducts />
      <Login showLogin={showLogin} handleModalOpen={showLoginModal} />
      <Toast
        toastList={toast}
        position="top-right"
        autoDelete
        dismissTime={4000}
      />
    </div>
  );
}
