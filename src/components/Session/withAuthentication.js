import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { setAuthUser, setCartFromFirebase, setWishlistFromFirebase, removeCartItems, removeWishlistItems } from "../../actions";
import FirebaseContext from "../Firebase/context";
import { saveToLocalStorage, removeFromLocalStorage, getFromLocalStorage } from '../../Utils';

const withAuthentication = (Component) => {
  const NewComponent = (props) => {
    const firebase = useContext(FirebaseContext);
    
    const next = async (authUser) => {
      console.log("next function called from with Authentication:");
      const userDetails = {
        uid: authUser.uid,
        email: authUser.email, 
        name: authUser.displayName, 
        emailVerified: authUser.emailVerified  
      }
      saveToLocalStorage('authUser',userDetails);
      props.setAuthUser(userDetails,true);
    
    };

    const fallback = () => {
      removeFromLocalStorage('authUser')
      props.setAuthUser(null,false);
    };
    useEffect(() => {
      const user = JSON.parse(getFromLocalStorage('authUser'));
      if(user) {
        props.setAuthUser(user,true);
      } else {
        props.setAuthUser(null,false);
      }
      firebase.onAuthChangeListener(next, fallback);
    });

    return <Component {...props} />;
  };

  return connect(null, { setAuthUser, setCartFromFirebase, setWishlistFromFirebase, removeCartItems, removeWishlistItems })(NewComponent);
};

export default withAuthentication;
