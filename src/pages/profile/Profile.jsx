import { useAuth } from "../../context/AuthContext";
import Buttons from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { Table } from "react-bootstrap";
import { useFireStore } from "../../context/FireStoreContext";
import ProductModal from "../../components/AddProduct/AddProduct";
import SeeMore from "../../components/seeMore/SeeMore";
import Search from "../../components/search/Search";
import { useEffect, useState } from "react";
import NoImage from "../../assets/image-icon-front-side.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { products ,handleDelete} = useFireStore();
  const [displayedProduct, setDisplayedProduct] = useState([]);
  useEffect(() => {
    if (products) {
      setDisplayedProduct(products);
    }
  }, [products]);
  
  return (
    <div className="container profile">
      <h3 className="my-4">Welcome :{currentUser?.email}</h3>
      <Buttons
        value={"log out"}
        onClick={() => {
          (
            logout(), navigate("/login"));
        }}
      />


    </div>
  );
};

export default Profile;
