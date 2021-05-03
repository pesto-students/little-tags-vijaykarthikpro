import * as ACTIONS from "../constants/actionTypes";

const initialState = {
  wishlist: [],
};

// eslint-disable-next-line consistent-return
export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM_TO_WISHLIST: {
      const { product } = action;
      return { ...state, wishlist: [...state.wishlist, product] };
    }
    case ACTIONS.REMOVE_ITEM_FROM_WISHLIST: {
      const { wishlist } = state;
      const { id } = action;
      const filteredWishlist = wishlist.filter(
        (product) => product.uniqueId !== id
      );
      return { ...state, wishlist: filteredWishlist };
    }
    case ACTIONS.UPDATE_WISHLIST_ITEM: {
      const { wishlist } = state;
      const { id, size, quantity } = action;
      wishlist.map((product) => {
        if (product.uniqueId === id) {
          return { ...product, size, quantity };
        }
        return product;
      });
      break;
    }
    case ACTIONS.SET_WISHLIST_FROM_FIREBASE: {
      return { ...state, wishlist: action.wishlist };
    }
    case ACTIONS.REMOVE_WISHLIST_ITEMS: {
      return { ...state, wishlist: [] };
    }
    default:
      return state;
  }
}
