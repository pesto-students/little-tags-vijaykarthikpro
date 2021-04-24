import {
  SET_AUTH_USER,
  REMOVE_AUTH_USER,
  ADD_USER_ADDRESS,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CONFIRM_ORDER,
  CANCEL_ORDER,
  ADD_ITEM_TO_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST,
  UPDATE_WISHLIST_ITEM,
  UPDATE_CART_ITEM,
  SET_CART_FROM_FIREBASE,
  SET_WISHLIST_FROM_FIREBASE,
  REMOVE_CART_ITEMS,
  REMOVE_WISHLIST_ITEMS,
  SET_ORDERS_FROM_FIREBASE,
  REMOVE_ORDERS
} from "../constants/actionTypes";

// User actions

export const setAuthUser = (authUser, isUserLoggedIn) => ({
  type: SET_AUTH_USER,
  authUser,
  isUserLoggedIn,
});

export const removeAuthUser = () => ({
  type: REMOVE_AUTH_USER,
});

export const setAddress = (address) => ({
  type: ADD_USER_ADDRESS,
  address,
});
// Cart actions

export const addItemToCart = (product) => ({
  type: ADD_ITEM_TO_CART,
  product,
});

export const removeItemFromCart = (id) => ({
  type: REMOVE_ITEM_FROM_CART,
  id,
});

export const updateItemInCart = (id, size, quantity) => ({
  type: UPDATE_CART_ITEM,
  id,
  size,
  quantity,
});

export const removeOrders = () => ({
  type: REMOVE_ORDERS
})

// Orders actions

export const confirmOrder = (orders) => ({
  type: CONFIRM_ORDER,
  orders
});

export const cancelOrder = (id) => ({
  type: CANCEL_ORDER,
  id,
});

export const setOrdersFromFirebase = (orders) => ({
  type: SET_ORDERS_FROM_FIREBASE,
  orders
})

// wishlist actions

export const addItemToWishlist = (product) => ({
  type: ADD_ITEM_TO_WISHLIST,
  product,
});

export const removeItemFromWishlist = (id) => ({
  type: REMOVE_ITEM_FROM_WISHLIST,
  id,
});

export const updateItemInWishlist = (id, size, quantity) => ({
  type: UPDATE_WISHLIST_ITEM,
  id,
  size,
  quantity,
});

// firebase actions

export const setCartFromFirebase = (cart) => ({
  type: SET_CART_FROM_FIREBASE,
  cart,
});

export const setWishlistFromFirebase = (wishlist) => ({
  type: SET_WISHLIST_FROM_FIREBASE,
  wishlist,
});

export const removeCartItems = () => ({
  type: REMOVE_CART_ITEMS,
});

export const removeWishlistItems = () => ({
  type: REMOVE_WISHLIST_ITEMS,
});
