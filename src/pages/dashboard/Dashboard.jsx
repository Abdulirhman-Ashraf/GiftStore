import { Alert, Col, Row } from "react-bootstrap";
import { useFireStore } from "../../context/FireStoreContext";
import ProductModal from "../../components/AddProduct/AddProduct";
import Search from "../../components/search/Search";
import { useEffect, useState } from "react";

import ProductsTable from "../productsTable/ProductsTable";
import OrdersTable from "../OrdersTable/OrdersTable";
import Buttons from "../../components/Buttons";
import OrdersTableSearch from "../../components/OrdersTableSearch/OrdersTableSearch";
import "./dashboard.css";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { products } = useFireStore();
  const [displayedProduct, setDisplayedProduct] = useState([]);
  const [filteredOrders, setFiltedOrders] = useState(null);
  const { orderItems } = useFireStore();

  const [currentTable, setCurrentTable] = useState("products");
  useEffect(() => {
    if (products) {
      setDisplayedProduct(products);
    }
    if (orderItems) {
      setFiltedOrders(orderItems);
    }
  }, [products, orderItems]);

  return (
    <>
      <div className="container profile">
        <div className="text-center mt-5 mb-3">
          {<ProductModal value={"New Product"} icon={faSquarePlus }/>}
        </div>
        {currentTable === "products" ? (
          <Search
            products={products}
            setDisplayedProduct={setDisplayedProduct}
            location={"dashboard"}
          />
        ) : (
          <OrdersTableSearch setFilteredOrders={setFiltedOrders} />
        )}

        <Row className="my-3 ">
          <Col xs={12} md={6} className="mb-2 mx-auto">
            <Buttons
              variant={"success"}
              value={"Products"}
              active={currentTable === "products"}
              onClick={() => setCurrentTable("products")}
              style={{ width: "100%", paddingBlock: "10px" }}
            />
          </Col>
          <Col xs={12} md={6}>
            <Buttons
              variant={"success"}
              value={"Orders"}
              active={currentTable === "orders"}
              onClick={() => setCurrentTable("orders")}
              style={{ width: "100%", paddingBlock: "10px" }}
            />
          </Col>
        </Row>

        <>
          {currentTable === "products" ? (
            displayedProduct.length === 0 ? (
              <Alert variant="info">Not Found!</Alert>
            ) : (
              <ProductsTable displayedProduct={displayedProduct} />
            )
          ) : filteredOrders.length === 0 ? (
            <Alert variant="info">Not Found!</Alert>
          ) : (
            <OrdersTable filteredOrders={filteredOrders} />
          )}
        </>
      </div>
    </>
  );
};

export default Dashboard;
