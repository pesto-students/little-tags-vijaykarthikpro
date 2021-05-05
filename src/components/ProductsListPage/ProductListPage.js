/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductListPage.scss';
import products from '../../data/products';
import { routePathMap, productFilterCategories, productFilterPrices } from '../../Utils';
import Card from '../Card/Card';
import Toast from '../Toast/Toast';

// const WHITE_COLOR = "#FFFFFF";

export default function ProductListPage() {
  const [data, setData] = useState(products);
  const [toast /* , setToast */] = useState([]);
  const [routeFilteredData, setRouteFilteredData] = useState([]);

  // const [categoryData, setCategoryData] = useState([]);
  // const [lowPriceData, setLowPriceData] = useState([]);
  // const [mediumPriceData, setMediumPriceData] = useState([]);
  // const [highPriceData, setHighPriceData] = useState([]);
  // const [priceFilteredData, setPriceFilteredData] = useState([]);
  // const [showFilters, setShowFilters] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState([]);

  const location = useLocation();
  const pathName = location.pathname.split('/')[2];

  useEffect(() => {
    const isPathMatching = (path) => {
      return Object.keys(routePathMap).includes(path);
    };

    if (isPathMatching(pathName)) {
      const filteredProducts = products.filter((product) => {
        if (product.category === routePathMap[pathName]) return product;
        return null;
      });
      setRouteFilteredData(filteredProducts);
      // setCategoryData(filteredProducts);
      setData(filteredProducts);
    }
  }, [pathName]);

  const handleClearFiltering = () => {
    setData(routeFilteredData);
    setSelectedCategory('');
    setSelectedPrice([]);
  };


  useEffect(() => {
    let filteredProducts = products;
    if (selectedCategory !== '') {
      filteredProducts = products.filter(
        ({ category }) => category === selectedCategory
      );
    }
    if (selectedPrice.length) {
      productFilterPrices.forEach((prices) => {
        const { priceRange, from , to } = prices;
        if (selectedPrice.includes(priceRange)) {
          filteredProducts = filteredProducts.filter(
            ({ price }) => price >= from && price <= to
          );

        } else if(!selectedPrice.includes(priceRange)) {
          filteredProducts = filteredProducts.filter(
            ({ price }) => !(price >= from && price <= to)
          );
          }
      })
    }
    setData(filteredProducts);
  }, [selectedCategory, selectedPrice]);


  const showFilter = () => {

    const filterCategories = () =>{
        return productFilterCategories.map((filter, id)=>{
          const { displayName, category } = filter
          return ( <li key={id}>
            <label>
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => {
                  setSelectedCategory(category);
                }}
              />
              <span>{displayName}</span>
            </label>
          </li>)
        })
    }

    const filterPrices = () =>{
        return productFilterPrices.map((filter, id) => {
          const { priceRange, from, to } = filter;
          return (
            <li key={id}>
              <label>
                <input
                  type="checkbox"
                  id={priceRange}
                  name={priceRange}
                  checked={selectedPrice.includes(priceRange)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPrice([...selectedPrice, priceRange]);
                    } else {
                      const filteredSelectedPrice = selectedPrice.filter(
                        (price) => price !== priceRange
                      );
                      setSelectedPrice(filteredSelectedPrice);
                    }
                  }}
                />
                <span>{from} - {to}</span>
              </label>
            </li>
          )
        })
    }

    return (
      <div>
        <div className="filter-heading-row">
          <h2>FILTERS</h2>
          <button onClick={handleClearFiltering}>clear</button>
        </div>
        <div>
          <span className="main-title">Categories</span>
          <ul>
            {filterCategories()}
          </ul>
        </div>
        <div>
          <span className="main-title">Price</span>
          <ul>
            {filterPrices()}
          </ul>
        </div>
        <div></div>
      </div>
    );
  };

  return (
    <div>
      <div className="list-container">
        <div className="filter">{showFilter()}</div>
        <div className="card-container">
          <Card productsData={data} />
        </div>
      </div>
      <Toast
        toastList={toast}
        position="bottom-left"
        autoDelete
        dismissTime={4000}
      />
    </div>
  );
}
