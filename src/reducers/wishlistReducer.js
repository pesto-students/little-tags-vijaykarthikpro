import * as ACTIONS from '../constants/actionTypes';

const initialState = {
    wishlist: []
}

export default function cartReducer(state = initialState, action) {
    
    switch(action.type) {
        case ACTIONS.ADD_ITEM_TO_WISHLIST : {
            const { product } = action;
            return { ...state, wishlist : [...state.wishlist, product]};
        }
        case ACTIONS.REMOVE_ITEM_FROM_WISHLIST : {
            const { wishlist } = state;
            const { id } = action
            const filteredWishlist = wishlist.filter((product) => product.id !== id);
            return { ...state, wishlist : filteredWishlist} 
        }
        case ACTIONS.UPDATE_WISHLIST_ITEM : {
            const { wishlist } = state;
            const { id, size, quantity } = action
            wishlist.map((product) => {
                if(product.id === id) {
                    return { ...product, size, quantity }
                }
                return product;
            });
            break;
        }
        default: 
            return state;
    }
}