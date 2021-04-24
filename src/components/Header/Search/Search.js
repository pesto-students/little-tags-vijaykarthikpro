import React, { useState } from "react";
import SearchIcon from "../../../assets/icons/search.svg";
import ProductData from "../../../data/products";
import { Link } from "react-router-dom";
import "./Search.scss";

export default function Search() {
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchItem(e.target.value);
    const currentResult = ProductData.filter((product) => {
      return product.title.match(e.target.value);
    });
    setSearchResults(currentResult);
    // console.log();
  };

  const displaySearchResult = () => {
    searchResults.map((item, index) => {
      return (
        <li key={index}>
          <Link className="dropdown-link">{item.title}</Link>
        </li>
      );
    });
  };

  return (
    <div className="search-main">
      <input
        type="text"
        value={searchItem}
        onChange={handleSearchInput}
        placeholder="Search items..."
      />
      <img className="search-icon" src={SearchIcon} alt="search-icon" />
      {!searchItem ? null : (
        <div className="search-result">{displaySearchResult()}</div>
      )}
    </div>
  );
}
