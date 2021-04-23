import * as ACTIONS from '../constants/actionTypes';

const initialState = {
    cart: []
}

export default function cartReducer(state = initialState, action) {
    
    switch(action.type) {
        case ACTIONS.ADD_ITEM_TO_CART : {
            const { cart } = state;
            const { product } = action;
            return { ...state, cart : [...cart, product]}; 
        }
        case ACTIONS.REMOVE_ITEM_FROM_CART : {
            const { cart } = state;
            const { id } = action
            const filteredCart = cart.filter((product) => product.uniqueId !== id);
            return { ...state, cart : filteredCart } 
        }
        case ACTIONS.UPDATE_CART_ITEM : {
            let { cart } = state;
            const { id, size, quantity } = action
            const udpatedCart = cart.map((item) => {
                if(item.uniqueId === id) {
                    return { ...item, size, quantity }
                }
                return item;
            });
            return { ...state, cart: udpatedCart }
        }
        case ACTIONS.SET_CART_FROM_FIREBASE : {
            return { ...state, cart : action.cart}; 
        }
        case ACTIONS.REMOVE_CART_ITEMS : {
            return { ...state, cart: [] }
        }
        default: 
            return state;
    }
}