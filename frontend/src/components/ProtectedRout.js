import React from "react";
import { Navigate } from "react-router-dom";
import Footer from "./Footer.js";

const ProtectedRoute = ({ loggedIn, children }) => {
  return loggedIn ? children : <Navigate to="./sign-in" />;
};

export default ProtectedRoute;
