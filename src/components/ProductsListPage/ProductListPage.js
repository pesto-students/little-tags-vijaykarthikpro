import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ProductListPage.scss";
import products from "../../data/products";
import { routePathMap } from "../../Utils";
import Card from "../Card/Card";

export default function ProductListPage() {
  const [data, setData] = useState(products);

  let location = useLocation();
  let pathName = location.pathname.split("/")[2];

  const handleCategory = (e) => {
    const categoryData = products.filter(
      (product) => product.category === e.target.value
    );
    setData(categoryData);
  };

  const handlePrice = (e) => {
    console.log(e.target.name);
    const priceData = data.filter((product) => {
      if (product.price >= 300 && product.price <= 1000) return product;
      else if (product.price > 1000 && product.price <= 3000) return product;
      else if (product.price > 3000 && product.price <= 5000) return product;
      return null;
    });
    setData(priceData);
  };

  useEffect(() => {
    const isPathMatching = (path) => {
      return Object.keys(routePathMap).includes(path);
    };

    if (isPathMatching(pathName)) {
      const filteredProducts = products.filter((product) => {
        if (product.category === routePathMap[pathName]) return product;
        return null;
      });
      setData(filteredProducts);
    }
  }, [pathName]);

  return (
    <div className="list-container">
      <div className="filter">
        <h2>FILTERS</h2>
        <div>
          <span className="main-title">Categories</span>
          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="jacket"
                  onChange={handleCategory}
                />
                <span>Jackets</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  value="electronics"
                  name="category"
                  onChange={handleCategory}
                />
                <span>Electronics</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="tshirt"
                  onChange={handleCategory}
                />
                <span>T-shirts</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="jewellery"
                  onChange={handleCategory}
                />
                <span>Jewellery</span>
              </label>
            </li>
          </ul>
        </div>
        <div>
          <span className="main-title">Price</span>

          <ul>
            <li>
              <label>
                <input type="checkbox" name="low" onChange={handlePrice} />
                <span>300-1000</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="middle" onChange={handlePrice} />
                <span>1000-3000</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="high" onChange={handlePrice} />
                <span>3000-5000</span>
              </label>
            </li>
          </ul>
        </div>
        <div>
          <span className="main-title">Color</span>
          <ul>
            <li>
              <label>
                <input type="checkbox" />
                <span>White</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                <span>Black</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                <span>Red</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                <span>Blue</span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <Card className="card-container" productsData={data} />
    </div>
  );
}
