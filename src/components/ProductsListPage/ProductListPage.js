import React,{ useState }  from "react";
import { useLocation } from 'react-router-dom';
import products from "../../data/products";
import "./ProductListPage.scss";
import Card from "../Card/Card";
import { useEffect } from "react";

export default function ProductListPage() {
  const [data, setData] = useState(products);

  let location = useLocation();
  let pathName = location.pathname.split('/')[2];

  useEffect(()=>{

    const routePathMap = {
      men : 'men clothing',
      women : 'women clothing',
      electronics : 'electronics',
      jewellery : 'jewelery',
      tshirts: 'tshirt',
      jackets: 'jacket'
    }

    const isPathMatching = (path) => {
      return Object.keys(routePathMap).includes(path)
    }

    if(isPathMatching(pathName)) {
      const filteredProducts = products.filter( product => { 
        if(product.category === routePathMap[pathName]) return product;
        return null;
      });
      setData(filteredProducts);
    }
  },[pathName]);
  

  return (
    <div className="list-container">
      <div className="filter">
        <h2>FILTERS</h2>
        <div>
          <span className="main-title">Categories</span>
          <ul>
            <li>
              <label>
                <input type="radio" />
                <span>Jackets</span>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" />
                <span>Electronics</span>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" />
                <span>T-shirts</span>
              </label>
            </li>
            <li>
              <label>
                <input type="radio" />
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
                <input type="checkbox" />
                <span>1000-2000</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                <span>2000-4000</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                <span>5000-10000 </span>
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

      <Card className="card-container" data={data} />
    </div>
  );
}
