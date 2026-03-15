import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate,  useLocation } from "react-router-dom";
import { useFireStore } from "./FireStoreContext";

const RequiredRole = ({ children }) => {
  const { currentUser } = useAuth();
const {role}=useFireStore()
  const location=useLocation()

  if (role !="admin" ) {
    return <Navigate to={"/"} />;
  }
  
  
  return children;
};

export default RequiredRole;
