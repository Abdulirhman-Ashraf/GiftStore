import { useAuth } from "../../context/AuthContext";
import Buttons from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { useFireStore } from "../../context/FireStoreContext";
import { Alert, Table } from "react-bootstrap";
import PaginationCom from "../../components/pagination/Pagination";
import "./profile.css";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { userName, orderItems } = useFireStore();
  const [currentPage, setCurrentPage] = useState(1);

  const myOrders = orderItems.filter(
    (items) => items.userId === currentUser?.uid,
  );
  const slicedProduct = 6;
  const startIndex = (currentPage - 1) * slicedProduct;
  const totalPages = Math.ceil(myOrders.length / slicedProduct);
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
      {!myOrders.length ? <Alert className="text-center">No Orders</Alert>:
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <td>Date/Time</td>
            <th>Price</th>
            <th>Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myOrders
            ?.slice(startIndex, startIndex + slicedProduct)
            .map((items) =>
              items.items?.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
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
    }
      <PaginationCom
        totalPages={totalPages}
        active={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Profile;
