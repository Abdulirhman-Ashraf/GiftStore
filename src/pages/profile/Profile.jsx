import { useAuth } from "../../context/AuthContext";
import Buttons from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { useFireStore } from "../../context/FireStoreContext";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const {  userName } = useFireStore();

  return (
    <div className="container profile">
      <h3 className="my-4">Welcome: {userName}</h3>
      <h4 className="my-4">Email: {currentUser.email}</h4>
      <Buttons
        value={"log out"}
        onClick={() => {
          (logout(), navigate("/login"));
        }}
      />
    </div>
  );
};

export default Profile;
