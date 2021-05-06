/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductListPage.scss";
import products from "../../data/products";
import {
  routePathMap,
  productFilterCategories,
  productFilterPrices,
} from "../../Utils";
import Card from "../Card/Card";
import Toast from "../Toast/Toast";
import NoSearchResultsImg from "../../assets/images/no-search-results.svg";

// const WHITE_COLOR = "#FFFFFF";
let routeFilteredData = [];

export default function ProductListPage() {
  const [data, setData] = useState(products);
  const [toast /* , setToast */] = useState([]);
  // const [routeFilteredData, setRouteFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const languageSelected = useSelector((state) => state.sessionState.language);
  const languageData = useSelector((state) => state.sessionState.data);
  const location = useLocation();
  const pathName = location.pathname.split("/")[2];

  useEffect(() => {
    const isPathMatching = (path) => {
      return Object.keys(routePathMap).includes(path);
    };

    if (isPathMatching(pathName)) {
      const filteredProducts = products.filter((product) => {
        if (product.category === routePathMap[pathName]) return product;
        return null;
      });
      // setRouteFilteredData(filteredProducts);
      routeFilteredData = filteredProducts;
      setData(filteredProducts);
    }
  }, [pathName]);

  const handleClearFiltering = () => {
    setData(routeFilteredData);
    setSelectedCategory("");
    setSelectedPrice("");
  };

  useEffect(() => {
    let filteredProducts = products;
    if (selectedCategory === "") {
      filteredProducts = routeFilteredData;
    }
    if (selectedCategory !== "") {
      filteredProducts = products.filter(
        ({ category }) => category === selectedCategory
      );
    }
    if (selectedPrice !== "") {
      productFilterPrices.forEach((prices) => {
        const { priceRange, from, to } = prices;
        if (selectedPrice === priceRange) {
          filteredProducts = filteredProducts.filter(
            ({ price }) => price >= from && price <= to
          );
        }
      });
    }

    setData(filteredProducts);
  }, [selectedCategory, selectedPrice]);

  const showFilter = () => {
    const filterCategories = () => {
      return productFilterCategories.map((filter, id) => {
        const { displayName, category, hindiName } = filter;
        return (
          <li key={id}>
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
              <span>{languageSelected === "EN" ? displayName : hindiName}</span>
            </label>
          </li>
        );
      });
    };

    const filterPrices = () => {
      return productFilterPrices.map((filter, id) => {
        const { priceRange, from, to } = filter;
        return (
          <li key={id}>
            <label>
              <input
                type="radio"
                name="price"
                value={priceRange}
                checked={selectedPrice === priceRange}
                onChange={() => setSelectedPrice(priceRange)}
              />
              <span>
                Rs.{from} - Rs.{to}
              </span>
            </label>
          </li>
        );
      });
    };

    return (
      <div>
        <div className="filter-heading-row">
          <span className="filter-title">{languageData.filters}</span>
          <button className="clear-button" onClick={handleClearFiltering}>
            {languageData.clearAll}
          </button>
        </div>
        <div className="filter-contents">
          <div className="category-type">
            <span className="title-headings">{languageData.categories}</span>
            <ul>{filterCategories()}</ul>
          </div>
          <div className="price-type">
            <span className="title-headings">{languageData.price}</span>
            <ul>{filterPrices()}</ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="list-container">
        <div className="filter">{showFilter()}</div>
        <div
          className={
            data.length > 0
              ? "card-container"
              : "card-container background-grey"
          }
        >
          {data.length > 0 ? (
            <Card productsData={data} />
          ) : (
            <div className="no-results-found">
              <img
                className="big-search-icon"
                src={NoSearchResultsImg}
                alt="no results found"
              />
              <span>Sorry, We couldn't find any results!</span>
            </div>
          )}
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
