import * as ACTIONS from '../constants/actionTypes';

const initialState = {
    cart: []
}

export default function cartReducer(state = initialState, action) {
    
    switch(action.type) {
        case ACTIONS.ADD_ITEM_TO_CART : {
            const { product } = action;
            return { ...state, cart : [...state.cart, product]};
        }
        case ACTIONS.REMOVE_ITEM_FROM_CART : {
            const { cart } = state;
            const { id } = action
            const filteredCart = cart.filter((product) => product.id !== id);
            console.log("filteredCart: ",filteredCart);
            return { ...state, cart : filteredCart } 
        }
        case ACTIONS.UPDATE_CART_ITEM : {
            const { cart } = state;
            const { id, size, quantity } = action
            const udpatedCart = cart.map((product) => {
                if(product.id === id) {
                    return { ...product, size, quantity }
                }
                return product;
            });
            return { ...state, cart: udpatedCart }
        }
        default: 
            return state;
    }
}