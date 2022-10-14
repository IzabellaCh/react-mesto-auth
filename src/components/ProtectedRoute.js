import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {() =>
        props.LoggetIn ? <Component {...props} /> : <Redirect to="./sing-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;