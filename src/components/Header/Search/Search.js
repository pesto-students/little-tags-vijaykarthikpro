import React, { useState, useEffect } from "react";
import SearchIcon from "../../../assets/icons/search.svg";
import ProductsData from "../../../data/products";
import { Link } from "react-router-dom";
import "./Search.scss";

export default function Search() {
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  console.log("searchResults: ",searchResults);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchItem(e.target.value);
    // console.log();
  };

  useEffect(() =>{
    const currentResult = ProductsData.filter(({ title }) => {
      return  title.match(searchItem);
    });
    setSearchResults(currentResult);
  },[searchItem]);

  const handleSearchClick = () =>{
    setSearchItem('');
    setSearchResults([]);
  }

  const displaySearchResult = () => {
    return searchResults.map((item, index) => {
      return (
        <li key={index} onClick={handleSearchClick}>
          <Link to={`/product-details/${item.title}`} className="dropdown-search-items">{item.title}</Link>
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
      {searchItem.length === 0 ? null : (
        <div className="search-result">{displaySearchResult()}</div>
      )}
    </div>
  );
}
