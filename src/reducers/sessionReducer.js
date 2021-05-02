import * as ACTIONS from "../constants/actionTypes";
import dataEN from "../data/languageData/en";
import dataHN from "../data/languageData/hin";

const initialState = {
  authUser: null,
  isUserLoggedIn: false,
  language: "EN",
  data: dataEN,
};

const setLanguage = (state = initialState, action) => {
  let data;
  switch (action.language) {
    case "EN":
      data = dataEN;
      break;
    case "HI":
      data = dataHN;
      break;
    default:
      break;
  }
  return {
    ...state,
    ...{ language: action.language, data },
  };
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

    case ACTIONS.SET_LANGUAGE: {
      return setLanguage(state, action);
    }

    default:
      return state;
  }
}
