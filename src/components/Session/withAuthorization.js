import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FirebaseContext from "../Firebase/context";
import * as ROUTES from "../../constants/routes";
import './withAuthorization.scss';

const withAuthorization = (Component) => {
  const NewComponent = (props) => {
    const firebase = useContext(FirebaseContext);

    const next = (authUser) => {
      if (!authUser) {
        props.history.push(ROUTES.HOME);
      }
    };
    const fallback = () => {};
    useEffect(() => {
      firebase.onAuthChangeListener(next, fallback);
    });

    return props.authUser ? (
      <Component {...props} />
    ) : (<div className="authorization-container">
        <p>You need to login in to access this page</p>
    </div>
    );
  };

  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });
  const component1 = connect(mapStateToProps)(NewComponent);
  return withRouter(component1);
  // return withRouter(connect(mapStateToProps)(NewComponent))
};

export default withAuthorization;
