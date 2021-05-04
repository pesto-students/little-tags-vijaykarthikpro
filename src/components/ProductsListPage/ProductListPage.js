/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ProductListPage.scss";
import products from "../../data/products";
import { routePathMap } from "../../Utils";
import Card from "../Card/Card";
import Toast from "../Toast/Toast";

// const WHITE_COLOR = "#FFFFFF";

export default function ProductListPage() {
  const [data, setData] = useState(products);
  const [toast/* , setToast */] = useState([]);
  const [routeFilteredData, setRouteFilteredData] = useState([]);
  // const [categoryData, setCategoryData] = useState([]);
  // const [lowPriceData, setLowPriceData] = useState([]);
  // const [mediumPriceData, setMediumPriceData] = useState([]);
  // const [highPriceData, setHighPriceData] = useState([]);
  // const [priceFilteredData, setPriceFilteredData] = useState([]); 
  // const [showFilters, setShowFilters] = useState(true);
  const [selectedCategory , setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState([]);

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
      setRouteFilteredData(filteredProducts);
      // setCategoryData(filteredProducts);
      setData(filteredProducts);
    }
  }, [pathName]);

  // const handleCategory = (e) => {
  //   const {
  //     target: { value },
  //   } = e;

  //   setIsChecked({ ...isChecked, category: true });

  //   if (value === "jacket")
  //     setIsChecked({
  //       ...isChecked,
  //       jacket: true,
  //       electronics: false,
  //       tshirt: false,
  //       jewellery: false,
  //     });
  //   if (value === "electronics")
  //     setIsChecked({
  //       ...isChecked,
  //       jacket: false,
  //       electronics: true,
  //       tshirt: false,
  //       jewellery: false,
  //     });
  //   if (value === "tshirt")
  //     setIsChecked({
  //       ...isChecked,
  //       jacket: false,
  //       electronics: false,
  //       tshirt: true,
  //       jewellery: false,
  //     });
  //   if (value === "jewellery")
  //     setIsChecked({
  //       ...isChecked,
  //       jacket: false,
  //       electronics: false,
  //       tshirt: false,
  //       jewellery: true,
  //     });

  //   const category = products.filter(
  //     (product) => product.category === e.target.value
  //   );
  //   setCategoryData(category);
  //   setData(category);
  // };

  // const handlePrice = (e) => {
  //   const priceRange = e.target.name;
  //   const checked = e.target.checked;

  //   setIsChecked({ ...isChecked, price: true });

  //   if (priceRange === "low") {
  //     if (checked) {
  //       setIsChecked({ ...isChecked, low: true });

  //       const filteredData = categoryData.filter(
  //         (product) => product.price >= 300 && product.price <= 1000
  //       );

  //       if (filteredData.length === 0) {
  //         setToast([
  //           ...toast,
  //           {
  //             id: new Date().getTime(),
  //             description: "No match found !",
  //             backgroundColor: WHITE_COLOR,
  //           },
  //         ]);
  //       } else {
  //         setLowPriceData(filteredData);
  //       }
  //     } else {
  //       setIsChecked({ ...isChecked, low: false });
  //       setLowPriceData([]);
  //     }
  //   } else if (priceRange === "medium") {
  //     if (checked) {
  //       setIsChecked({ ...isChecked, medium: true });

  //       const filteredData = categoryData.filter(
  //         (product) => product.price > 1000 && product.price <= 3000
  //       );

  //       if (filteredData.length === 0) {
  //         setToast([
  //           ...toast,
  //           {
  //             id: new Date().getTime(),
  //             description: "No match found !",
  //             backgroundColor: WHITE_COLOR,
  //           },
  //         ]);
  //       } else {
  //         setMediumPriceData(filteredData);
  //       }
  //     } else {
  //       setIsChecked({ ...isChecked, medium: false });
  //       setMediumPriceData([]);
  //     }
  //   } else if (priceRange === "high") {
  //     if (checked) {
  //       setIsChecked({ ...isChecked, high: true });

  //       const filteredData = categoryData.filter(
  //         (product) => product.price > 3000 && product.price <= 5000
  //       );

  //       if (filteredData.length === 0) {
  //         setToast([
  //           ...toast,
  //           {
  //             id: new Date().getTime(),
  //             description: "No match found !",
  //             backgroundColor: WHITE_COLOR,
  //           },
  //         ]);
  //       } else {
  //         setHighPriceData(filteredData);
  //       }
  //     } else {
  //       setIsChecked({ ...isChecked, high: false });
  //       setHighPriceData([]);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (
  //     lowPriceData.length === 0 &&
  //     mediumPriceData.length === 0 &&
  //     highPriceData.length === 0
  //   ) {
  //     setData(categoryData);
  //   } else {
  //     setData([...lowPriceData, ...mediumPriceData, ...highPriceData]);
  //   }
  // }, [
  //   lowPriceData,
  //   mediumPriceData,
  //   highPriceData,
  //   categoryData,
  //   isChecked,
  //   routeFilteredData,
  // ]);

  useEffect(()=>{
    if(selectedPrice.length === 0 && routeFilteredData.length !== 0){
      setData(routeFilteredData);
    } 
    // else if(selectedPrice.length !== 0 && routeFilteredData.length !== 0) {
    //       setData(priceFilteredData);
    // }
  },[selectedPrice, routeFilteredData]);


  // useEffect(()=>{
  //   if(selectedPrice.includes('low')) {

  //     const filteredData = data.filter((product) => product.price >= 300 && product.price <= 1000);
  //     setPriceFilteredData([...priceFilteredData, ...filteredData]);

  //   } else if( ! selectedCategory.includes('low')) {

  //     const filteredData = data.filter((product) => product.price >= 300 && product.price <= 1000);
  //     const removeLowPriceData = priceFilteredData.filter((product) => !filteredData.includes(product));

  //     setPriceFilteredData(removeLowPriceData);
  //   }
  // },[selectedPrice, priceFilteredData, data])


  // useEffect(()=>{
  //   if(selectedPrice.includes('medium')) {

  //     const filteredData = data.filter((product) => product.price >= 1000 && product.price <= 3000);
  //     setPriceFilteredData([...priceFilteredData, ...filteredData]);

  //   } else if(!selectedPrice.includes('medium')) {
      
  //     const filteredData = data.filter((product) =>product.price >= 1000 && product.price <= 3000);
  //     const removeMediumPriceData = priceFilteredData.filter((product) => !filteredData.includes(product));

  //     setPriceFilteredData(removeMediumPriceData);
  //   }
  // },[selectedPrice, priceFilteredData, data]);

  // useEffect(() =>{
  //   if(selectedPrice.includes('high')) {

  //     const filteredData = data.filter((product) => product.price >= 3000 && product.price <= 5000);
  //     setPriceFilteredData([...priceFilteredData, ...filteredData]);

  //   } else if(!selectedPrice.includes('high')) {

  //     const filteredData = data.filter((product) =>product.price >= 3000 && product.price <= 5000);
  //     const removeHighPriceData = priceFilteredData.filter((product) => !filteredData.includes(product));

  //     setPriceFilteredData(removeHighPriceData);
  //   }
  // },[selectedPrice, priceFilteredData, data]);


  // useEffect(()=>{
  //   if(selectedPrice.length == 0) {
  //     setData(routeFilteredData);
  //   } else {
  //     setData(priceFilteredData);
  //   }
  // },[selectedPrice])

  const handleClearFiltering = () => {

    setData(routeFilteredData);
    // setCategoryData(routeFilteredData);
  };
  // useEffect(() => {
  //   handlePrice();
  // });
  const showFilter = () => {
    return (
      <div>
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
                  checked={selectedCategory === 'jacket'}
                  onChange={()=>{ setSelectedCategory('jacket');}}
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
                  checked={selectedCategory === 'electronics'}
                  onChange={()=>{ setSelectedCategory('electronics');}}
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
                  checked={selectedCategory === 'tshirt'}
                  onChange={()=>{ setSelectedCategory('tshirt');}}
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
                  checked={selectedCategory === 'jewellery'}
                  onChange={()=>{ setSelectedCategory('jewellery');}}
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
                  checked={selectedPrice.includes('low')}
                  onChange={(e)=> {
                    if(e.target.checked) {
                      setSelectedPrice([...selectedPrice, 'low'])
                    } else {
                      const filteredSelectedPrice = selectedPrice.filter((price)=> price !== 'low' );
                      setSelectedPrice(filteredSelectedPrice);
                    }
                  }}
                  // onClick={handlePrice}
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
                  checked={selectedPrice.includes('medium')}
                  onChange={(e)=> {
                    if(e.target.checked) {
                      setSelectedPrice([...selectedPrice, 'medium'])
                    } else {
                      const filteredSelectedPrice = selectedPrice.filter((price)=> price !== 'medium' );
                      setSelectedPrice(filteredSelectedPrice);
                    }
                    
                  }}
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
                  checked={selectedPrice.includes('high')}
                  onChange={(e)=> {
                    if(e.target.checked) {
                      setSelectedPrice([...selectedPrice, 'high'])
                    } else {
                      const filteredSelectedPrice = selectedPrice.filter((price)=> price !== 'high' );
                      setSelectedPrice(filteredSelectedPrice);
                    }
                    
                  }}
                  // onClick={handleClick}
                />
                <span>3000-5000</span>
              </label>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    );
  };

  return (
    <div>
      <button
        className="filter-btn"
        //  onClick={() => setShowFilters()}
      >
        FILTERS
      </button>
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
        dismissTime="4000"
      />
    </div>
  );
}
