export const SIZES = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
};

export const saveToLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export const uniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const routePathMap = {
  men: "men clothing",
  women: "women clothing",
  electronics: "electronics",
  jewellery: "jewellery",
  tshirts: "tshirt",
  jackets: "jacket",
};

export const productFilterCategories = [
  {
    displayName: 'Jackets',
    category: 'jacket'
  },
  {
    displayName: 'Electronics',
    category: 'electronics'
  },
  {
    displayName: 'T-Shirts',
    category: 'tshirt'
  },
  {
    displayName: 'Jewellery',
    category: 'jewellery'
  }
]

export const productFilterPrices = [
  {
    priceRange: 'low',
    from: 300,
    to: 1000
  },
  {
    priceRange: 'medium',
    from: 1000,
    to: 3000
  },
  {
    priceRange: 'high',
    from: 3000,
    to: 5000
  },
  {
    priceRange: 'highest',
    from: 5000,
    to: 10000
  }
]

export const throttleFunction = (func, delay) => {
  let prev = 0;

  // eslint-disable-next-line consistent-return
  return (...args) => {
    const now = new Date().getTime();

    if (now - prev > delay) {
      prev = now;
      return func(...args);
    }
  };
};

export function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
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
