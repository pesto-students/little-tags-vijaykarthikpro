import React /* useState */ from "react";
import PropTypes from "prop-types";
import "./Card.scss";
import { Link, Switch, Route } from "react-router-dom";
import ProductDetailsPage from "../ProductDetailsPage/ProductDetailsPage";

export default function Card({ productsData }) {
  /*   const [isWishlist, setWishlist] = useState(false);

  const wishlistIcon = () => {
    if (isWishlist) {
      return <img src={WishlistFilledIcon} alt="" />;
    } else {
      return <img src={WishlistIcon} alt="" />;
    }
  }; */

  const displayTitleText = (title) => {
    const words = title.split(" ");
    if (words.length > 4) {
      const letters = title.substring(0, 18);
      return <span className="title">{`${letters}...`}</span>;
    } else {
      return <span className="title">{title}</span>;
    }
  };

  const displayProducts = () => {
    return productsData.map((item) => {
      const { id, image, title, price } = item;
      return (
        <div className="card" key={id}>
          <Link key={id} to={`/product-details/${id}`}>
            <div className="card-img">
              <img src={image} alt="product-card" />
            </div>
          </Link>
          <div className="card-header">
            {displayTitleText(title)}
            <p className="price">
              <span>₹</span>
              <span className="price-text">{price}</span>
            </p>
            {/* <button
              className="wishlist-btn"
              onClick={() => setWishlist(!isWishlist)}
            >
              {wishlistIcon()}
              <span className="wishlist-btn-text">Add to Wishlist</span>
            </button> */}
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div className="main-content">{displayProducts()}</div>
      <Switch>
        <Route path="/product-details/:id">
          <ProductDetailsPage />
        </Route>
      </Switch>
    </>
  );
}

Card.propTypes = {
  productsData : PropTypes.array.isRequired,
}

Card.defaultProps = {
  productsData : [
    {
      id: 1,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
  ],
};
