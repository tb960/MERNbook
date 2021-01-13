import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const IsLoggedInRoute = ({
  component: Component,
  auth: { isLoggedIn },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(IsLoggedInRoute);
