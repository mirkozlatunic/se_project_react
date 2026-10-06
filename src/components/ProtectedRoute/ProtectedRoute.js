import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, loggedIn, isCheckingAuth, ...props }) {
  return (
    <Route {...props}>
      {isCheckingAuth ? null : loggedIn ? children : <Redirect to="/" />}
    </Route>
  );
}

export default ProtectedRoute;
