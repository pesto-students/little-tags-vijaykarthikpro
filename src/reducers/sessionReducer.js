import * as ACTIONS from "../constants/actionTypes";

const initialState = {
  authUser: null,
  isUserLoggedIn: false,
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_AUTH_USER:
      return {
        ...state,
        authUser: action.authUser,
        isUserLoggedIn: action.isUserLoggedIn,
      };
    case ACTIONS.REMOVE_AUTH_USER:
      return { ...state, authUser: null, isUserLoggedIn: false };

    case ACTIONS.ADD_USER_ADDRESS: {
      return {
        ...state,
        authUser: {
          ...state.authUser,
          address: action.address,
        },
      };
    }
    default:
      return state;
  }
}
