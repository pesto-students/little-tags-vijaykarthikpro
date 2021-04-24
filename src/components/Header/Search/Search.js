import React, { useState } from "react";
import SearchIcon from "../../../assets/icons/search.svg";
import "./Search.scss";

// const searchCategory = [
//   { category: "men jackets" },
//   { category: "women jackets" },
//   { category: "electornics" },
//   { category: "jewellery" },
//   { category: "t-shirts" },
// ];

export default function Search() {
  const [searchItem, setSearchItem] = useState("");

  const handleSearchInput = (e) => {
    setSearchItem(e.target.value);
  };

  const displaySearchResult = (item) => {
    return <div>Search result</div>;
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
        <div className="search-result">{displaySearchResult(searchItem)}</div>
      )}
    </div>
  );
}
