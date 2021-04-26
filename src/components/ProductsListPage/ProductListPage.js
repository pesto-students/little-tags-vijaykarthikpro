import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ProductListPage.scss";
import products from "../../data/products";
import { routePathMap } from "../../Utils";
import Card from "../Card/Card";

export default function ProductListPage() {
  const [data, setData] = useState(products);
  const [routeFilteredData, setRouteFilteredData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [lowPriceData, setLowPriceData] = useState([]);
  const [mediumPriceData, setMediumPriceData] = useState([]);
  const [highPriceData, setHighPriceData] = useState([]);
  const [isChecked, setIsChceked] = useState({
    jacket: false, 
    electronics: false, 
    tshirt: false, 
    jewellery: false, 
    low: false, 
    medium: false, 
    high: false,
    category: false,
    price: false});
  let location = useLocation();
  let pathName = location.pathname.split("/")[2];

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
      setCategoryData(filteredProducts);
      setData(filteredProducts);

    }
  }, [pathName]);


  const handleCategory = (e) => {
    let { target: { value }} = e;
    
    setIsChceked({...isChecked, category: true});
   
    if(value === 'jacket') setIsChceked({...isChecked, jacket: true, electronics: false, tshirt: false, jewellery: false});
    if(value === 'electronics') setIsChceked({...isChecked, jacket: false, electronics: true, tshirt: false, jewellery: false});
    if(value === 'tshirt') setIsChceked({...isChecked, jacket: false, electronics: false, tshirt: true, jewellery: false});
    if(value === 'jewellery') setIsChceked({...isChecked, jacket: false, electronics: false, tshirt: false, jewellery: true});
    
    const category = products.filter(
      (product) => product.category === e.target.value
    );
    setCategoryData(category);
    setData(category);
  };

  const handlePrice = (e) => {
    let priceRange = e.target.name;
    let checked = e.target.checked;


    setIsChceked({...isChecked, price : true});

      if (priceRange === "low") {
        
        if(checked) {

          setIsChceked({...isChecked, low: true});

          const filteredData = categoryData.filter(
            (product) => product.price >= 300 && product.price <= 1000
          )

          if(filteredData.length === 0) {
            alert("No match found!!");
          } else{
            setLowPriceData(filteredData);
          }
          

        } else {
          setIsChceked({...isChecked, low: false});
          setLowPriceData([]);
        }
        
      } else if (priceRange === "medium") {

        if(checked) {

          setIsChceked({...isChecked, medium: true});

          const filteredData = categoryData.filter(
            (product) => product.price > 1000 && product.price <= 3000
          );

          if(filteredData.length === 0) {
            alert("No match found!!");
          } else{
            setMediumPriceData(filteredData);
          }

        } else {
          setIsChceked({...isChecked, medium: false});
          setMediumPriceData([]);
        }
        
      } else if (priceRange === "high") {
        if(checked) {
          setIsChceked({...isChecked, high: true});

          const filteredData = categoryData.filter(
            (product) => product.price > 3000 && product.price <= 5000
          );

          if(filteredData.length === 0) {
            alert("No match found!!");
          } else{
            setHighPriceData(filteredData);
          }
         
        } else {
          setIsChceked({...isChecked, high: false});
          setHighPriceData([]);

        }
      }
      
  };

  useEffect(() =>{
    if(lowPriceData.length === 0 && mediumPriceData.length === 0 && highPriceData.length === 0) {

      setData(categoryData);
      
    } else {

      setData([...lowPriceData, ...mediumPriceData, ...highPriceData]);
      
    }
  },[lowPriceData, mediumPriceData, highPriceData, categoryData, isChecked, routeFilteredData]);


  const handleClearFiltering = () =>{
   
    setIsChceked({
      jacket: false, 
      electronics: false, 
      tshirt: false, 
      jewellery: false, 
      low: false, 
      medium: false, 
      high: false,
      category: false,
      price: false});

    setData(routeFilteredData);
    setCategoryData(routeFilteredData);
  }
  // useEffect(() => {
  //   handlePrice();
  // });

  return (
    <div className="list-container">
      <div className="filter">
        <div className="filter-heading-row">
          <h2>FILTERS</h2>
          <button onClick={handleClearFiltering}>clear</button>
        </div>
        <div>
          <span className="main-title">Categories</span>
          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="jacket"
                  checked={isChecked.jacket}
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
                  checked={isChecked.electronics}
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
                  checked={isChecked.tshirt}
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
                  checked={isChecked.jewellery}
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
                <input
                  type="checkbox"
                  id="low"
                  name="low"
                  checked={isChecked.low}
                  onChange={handlePrice}
                  // onClick={handleClick}
                />
                <span>300-1000</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  id="medium"
                  name="medium"
                  checked={isChecked.medium}
                  onChange={handlePrice}
                  // onClick={handleClick}
                />
                <span>1000-3000</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  id="high"
                  name="high"
                  checked={isChecked.high}
                  onChange={handlePrice}
                  // onClick={handleClick}
                />
                <span>3000-5000</span>
              </label>
            </li>
          </ul>
        </div>
        <div>
          {/* <span className="main-title">Color</span> */}
          {/* <ul>
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
          </ul> */}
        </div>
      </div>

      <div className="card-container">
        <Card productsData={data} />
      </div>
      
    </div>
  );
}
