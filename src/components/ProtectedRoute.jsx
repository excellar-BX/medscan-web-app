/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/option" /> : <Component {...rest} />;
};

export default ProtectedRoute;
