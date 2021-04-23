import * as ACTIONS from '../constants/actionTypes';

const initialState = {
    orders: []
}

export default function cartReducer(state = initialState, action) {
    
    switch(action.type) {
        case ACTIONS.CONFIRM_ORDER : {
            const { orders } = action;
            return { ...state, orders: [...state.orders, ...orders] };
        }
        case ACTIONS.CANCEL_ORDER : {
            const { orders } = state;
            const { id } = action
            const filteredOrders = orders.map((product) => product.id !== id);
            return { ...state, orders : filteredOrders} 
        }
        default: 
            return state;
    }
}