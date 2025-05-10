import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ allowedRole, children }) => {
  const role = sessionStorage.getItem("role");

  console.log("Current role:", role); // Debugging line

  if (!role) {
    console.log("No role found, redirecting to login"); // Debugging line
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    console.log(`Role ${role} not allowed, redirecting to restaurants`); // Debugging line
    return <Navigate to="/restaurants" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
