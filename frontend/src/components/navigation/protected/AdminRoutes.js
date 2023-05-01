import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = ({ children }) => {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  let location = useLocation();

  if (!userAuth?.isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default AdminRoutes;
