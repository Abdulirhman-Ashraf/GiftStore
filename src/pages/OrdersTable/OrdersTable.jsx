import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import PaginationCom from "../../components/pagination/Pagination";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { useFireStore } from "../../context/FireStoreContext";
import './style.css'
const OrdersTable = ({ filteredOrders }) => {
  const { updateOrders } = useFireStore();
  const [currentPage, setCurrentPage] = useState(1);
  const slicedProduct = 6;
  const startIndex = (currentPage - 1) * slicedProduct;
  const totalPages = Math.ceil(filteredOrders.length / slicedProduct);
  const handleStatus = async (id,status) => {
    await updateOrders(id,{status:status});
  };
  return (
    <div className="orderTable">
      <Table responsive  striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Date / Time</th>
            <th>Total Price</th>
            <th>Details</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {!filteredOrders ? (
            <div>NO Orders</div>
          ) : (
            filteredOrders
              ?.slice(startIndex, startIndex + slicedProduct)
              ?.map((items, index) => (
                <tr key={items.id}>
                  <td>{startIndex+index+1}</td>
                  <td>{items.shippingData.name}</td>
                  <td>
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {items.createAt.toDate().toLocaleDateString("en-EG")}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {items.createAt.toDate().toLocaleTimeString("en-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td>{items.totalPrice.toFixed(2)} $</td>
                  <td>
                    {" "}
                    <OrderDetails
                      Details={{
                        shippingData: items.shippingData,
                        totalPrice: items.totalPrice,
                        paymentMethod: items.paymentMethod,
                        items: items.items,
                        createAt: items.createAt,
                        status: items.status,
                      }}
                    />
                  </td>
                  <td>
                    <select
                      name="status"
                      id="status"
                      className="form-select"
                      value={items?.status}
                      onChange={(e) =>
                        handleStatus(items.id, e.target.value
                        )
                      }
                    >
                      <option value="pending">pending</option>
                      <option value="fulfilled ">fulfilled </option>
                    </select>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </Table>

      <PaginationCom
        totalPages={totalPages}
        active={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default OrdersTable;
