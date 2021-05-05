import React from 'react';
import { Link } from "react-router-dom";
import ProductsData from '../../data/products';
// import Card from '../Card/Card';
import './SimilarProducts.scss';



export default function SimilarProducts({ selectedCategory }) {

  const filteredData = ProductsData.filter((product) => product.category === selectedCategory );
  
    
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
        return filteredData.map((item, index) => {
          const { id, image, title, price } =  item
          if(index < 4 ){
            return (
              <div className="card" key={id}>
                <Link className="card-link" key={id} to={`/product-details/${title}`}>
                  <div className="card-img">
                    <img src={image} alt="" />
                  </div>
                <div className="card-header">
                  {displayTitleText(title)}
                  <p className="price">
                    <span>$</span>
                    <span className="price-text">{price}</span>
                  </p>
                </div>
                </Link>
              </div>
            );
          }
          return null;
        });
      };


    return (<div className="similar-products-container">
        <h1 className="heading">Similar Products</h1>
        <div className="similar-card-container">
            <div className="similar-products-content">{displayProducts()}</div>
        </div>
    </div>)
}