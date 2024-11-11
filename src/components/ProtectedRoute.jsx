/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  return token ? <Component {...rest} /> : <Navigate to="/signup" />;
};

export default ProtectedRoute;
