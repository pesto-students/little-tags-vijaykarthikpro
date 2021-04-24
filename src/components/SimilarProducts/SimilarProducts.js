import React from 'react';
import { Link } from "react-router-dom";
import ProductsData from '../../data/products';
// import Card from '../Card/Card';
import './SimilarProducts.scss';

const onlyFourProducts = ProductsData.filter((_,index) => index < 4);
console.log("onlyFourProducts: ",onlyFourProducts);

export default function SimilarProducts() {

    
  const displayTitleText = (title) => {
    const words = title.split(" ");
    if (words.length > 4) {
      const letters = title.substring(0, 20);
      return <span className="title">{`${letters}...`}</span>;
    } else {
      return <span className="title">{title}</span>;
    }
  };

    const displayProducts = () => {
        return onlyFourProducts.map((item) => {
          const { id, image, title, price } =  item
          return (
            <div className="card" key={id}>
              <Link key={id} to={`/product-details/${id}`}>
                <div className="card-img">
                  <img src={image} alt="" />
                </div>
              </Link>
              <div className="card-header">
                {displayTitleText(title)}
                <p className="price">
                  <span>$</span>
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


    return (<div className="similar-products-container">
        <h1 className="heading">Similar Products</h1>
        <div className="similar-card-container">
            {/* <Card productsData={onlyFourProducts}/> */}
            <div className="similar-products-content">{displayProducts()}</div>
        </div>
    </div>)
}