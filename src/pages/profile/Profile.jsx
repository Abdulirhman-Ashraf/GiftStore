import { useAuth } from "../../context/AuthContext";
import Buttons from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { useFireStore } from "../../context/FireStoreContext";
import { Table } from "react-bootstrap";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { userName, orderItems } = useFireStore();
 
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

      <h3 className="text-center">Orders</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <td>Date/Time</td>
            <th>Price</th>
            <th>Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderItems?.map((items) =>
            items.items?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <div style={{ fontWeight: "bold" }}>
                    {items.createAt?.toDate().toLocaleDateString("en-EG")}
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {items.createAt?.toDate().toLocaleTimeString("en-EG")}
                  </div>
                </td>
                <td>{item.price + "$"}</td>
                <td>
                  <img src={item.imageUrl} alt="" />
                </td>
                <td>
                  <div>{items.status}</div>
                </td>
              </tr>
            )),
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Profile;
