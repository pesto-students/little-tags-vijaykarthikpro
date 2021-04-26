export const SIZES = {
    XS: 'XS',
    S: 'S',
    M: 'M',
    L: 'L',
    XL: 'XL'
}

export const saveToLocalStorage = (key,value) => {
    return localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
}

export const removeFromLocalStorage = (key) => {
    return localStorage.removeItem(key);
}

export const uniqueId = () =>{
    return Math.random().toString(36).substr(2, 9);
}

export const routePathMap = {
    men: "men clothing",
    women: "women clothing",
    electronics: "electronics",
    jewellery: "jewellery",
    tshirts: "tshirt",
    jackets: "jacket",
}

export const throttleFunction=(func, delay)=>{
  
    let prev = 0; 
    
    return (...args) => {

      let now = new Date().getTime(); 
        
      if(now - prev> delay){ 
        prev = now;
        return func(...args);  
      }
    }
  }

  export function loadScript(src) {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

