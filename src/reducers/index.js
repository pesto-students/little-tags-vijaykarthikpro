import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import wishlistReducer from './wishlistReducer';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  cartState: cartReducer,
  ordersState: orderReducer,
  wishlistState: wishlistReducer
});

export default rootReducer;