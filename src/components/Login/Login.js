import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { saveToLocalStorage } from "../../Utils";
import { setAuthUser } from "../../actions";
import FirebaseContext from "../Firebase/context";
import FbIcon from "../../assets/icons/fb-logo.svg";
import GoogleIcon from "../../assets/icons/google-logo.svg";
import Dialog from '../Dialog/Dialog';
import Toast from '../Toast/Toast';
import "./Login.scss";

const GREEN_COLOR = '#32CD32';

export default function Login({ showLogin, handleModalOpen }) {

  const firebase = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState([]);

  const handleGoogleSignIn = () => {
    firebase
      .doGoogleSignIn()
      .then((authUser) => {
        const userDetails = {
          email: authUser.email,
          name: authUser.displayName,
          emailVerified: authUser.emailVerified,
        };

        saveToLocalStorage("authUser", userDetails);
        setAuthUser(userDetails);
        setToast([...toast, {id: new Date().getTime(), description: 'Successfully Logged In !', backgroundColor: GREEN_COLOR}])
        handleModalOpen();

        return firebase.user(authUser.user.uid).update({
          email: authUser.user.email,
          displayName: authUser.user.displayName,
          roles: {},
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleFacebookSignIn = () => {
    firebase
      .doFacebookSignIn()
      .then((authUser) => {
        
        const userDetails = {
          email: authUser.email,
          name: authUser.displayName,
          emailVerified: authUser.emailVerified,
        };

        saveToLocalStorage("authUser", userDetails);
        setAuthUser(userDetails);

        handleModalOpen();
        setToast([...toast, {id: new Date().getTime(), description: 'Successfully Logged In !', backgroundColor: GREEN_COLOR}])

        return firebase.user(authUser.user.uid).set({
          email: authUser.user.email,
          displayName: authUser.user.displayName,
          roles: {},
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleModalClose = () => {
    handleModalOpen();
    setErrorMessage("");
  };

  const loginOptions = () =>{
    return (
      <div className="login-options">
          <div className="box">
              <button className="google-login" onClick={handleGoogleSignIn}>
                <img className="google-img" src={GoogleIcon} alt="google-icon"/>
                <span>Continue with Google</span>
              </button>
              <button className="facebook-login" onClick={handleFacebookSignIn}>
                <img className="fb-img" src={FbIcon} alt="fb-icon"  />
                <span>Continue with Facebook</span>
              </button>
            </div>
      </div>
    )
  }

  const showErrorMessage = () => {
    return (<div className="box">
          <p className="login-error">{errorMessage}</p>
      </div>);
  }

  return (
    <>
      {showLogin ? (<div>
        {errorMessage ?  
        (<Dialog handleModalClose={handleModalClose} displayContent={showErrorMessage}/>) :
        (<Dialog handleModalClose={handleModalClose} displayContent={loginOptions}/>)  }
      </div>
      ) : null
      }
       <Toast toastList={toast} position="top-right" autoDelete dismissTime={4000} />
    </>
  );
}

Login.propTypes = {
  showLogin: PropTypes.bool,
  handleModalOpen: PropTypes.func,
};

Login.defaultProps = {
  showLogin: false,
  handleModalOpen: () => {},
};
