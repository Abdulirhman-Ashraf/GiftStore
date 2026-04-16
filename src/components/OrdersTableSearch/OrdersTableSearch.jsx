import React, { useState } from "react";
import { useFireStore } from "../../context/FireStoreContext";
import "./search.css";
import Inputs from "../inputs/Inputs";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
const OrdersTableSearch = ({ setFilteredOrders }) => {
  const { orderItems } = useFireStore();
  const [search, setSearch] = useState("");
  const handleFilter = (e) => {
    e.preventDefault();
    if (!search) setFilteredOrders(orderItems);
    const filteredResult = orderItems.filter((item) =>
      item.shippingData.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredOrders(filteredResult);
  };
  return (
    <>
      <div className="search">
          <Form onSubmit={handleFilter}>
            <Row className="align-items-center ">
              <Col md={9} xs={12}>
                <Inputs
                  type={"search"}
                  id={"Search by Name"}
                  required
                  className="searchInput form-control"
                  noLabel={true}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </Col>
              <Col md={3} xs={12}>
                <Button type="submit" className="btn searchBtn">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
      </div>
    </>
  );
};

export default OrdersTableSearch;
