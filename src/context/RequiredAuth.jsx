import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate,  useLocation } from "react-router-dom";
import { useFireStore } from "./FireStoreContext";

const RequiredAuth = ({ children }) => {
  const { currentUser } = useAuth();
const {role}=useFireStore()
  const location=useLocation()

  if(!currentUser){
    return <Navigate to={"/login"}/>
  }
  
  return children;
};

export default RequiredAuth;
