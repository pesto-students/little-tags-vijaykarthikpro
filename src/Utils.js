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

