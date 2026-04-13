import { Button, Card, Col, Container, Offcanvas, Row } from "react-bootstrap";
import NoImage from "../../assets/image-icon-front-side.jpg";
import { useFireStore } from "../../context/FireStoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMinus,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Buttons from "../../components/Buttons";
import { useState } from "react";
import "./cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { setIsCartOpen, isCartOpen, cartItems, deleteFromCart, updateStock } =
    useFireStore();
  const handleClose = () => setIsCartOpen(false);
  const handleShow = () => setIsCartOpen(true);
  const [loadingId, setLoadingId] = useState(null);
  const handleRemove = async (id) => {
    await deleteFromCart(id);
  };

  const handleUpdate = async (id, stockCount) => {
    if (stockCount < 1) return;
    try {
      setLoadingId(id);
      await updateStock(id, stockCount);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="cartPage">
      <Container>
        <Button
          onClick={handleShow}
          style={{
            padding: "0",
            margin: "0",
            border: "none",
            background: "none",
            color: "black",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Cart <FontAwesomeIcon className="cartIcon" icon={faCartShopping} />
        </Button>

        <Offcanvas
          show={isCartOpen}
          onHide={handleClose}
          placement="end"
          className="offcanvas"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cartItems.length === 0 ? (
              <div className="text-center">Your cart is empty</div>
            ) : (
              cartItems?.map((item) => (
                <Card
                  key={item.id}
                  style={{ overflow: "hidden", border: "none" }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex ",
                    }}
                  >
                    <Card.Img
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      src={item?.imageUrl || NoImage}
                    />
                    <Card.Body
                      style={{
                        display: "flex ",
                        justifyContent: "space-between ",
                        alignItems: "center ",
                      }}
                    >
                      <div style={{ marginRight: "3px" }}>
                        <Card.Title style={{ fontSize: "16px" }}>
                          {item.name}
                        </Card.Title>
                        <Card.Text
                          style={{ fontWeight: "600" }}
                        >{`Total Price : $${item.price * item.count}`}</Card.Text>
                        <div
                          className="stock"
                          style={{
                            display: "flex ",
                            alignItems: "center ",
                            justifyContent: "space-between ",
                            border: "1px solid #6d5e5e4f",
                            borderRadius: "6px",
                            width: "90px",
                            height: "30px",
                          }}
                        >
                          <Buttons
                            value={<FontAwesomeIcon icon={faMinus} />}
                            loading={loadingId === item.id}
                            onClick={() => {
                              if (item.count > 1) {
                                handleUpdate(item.id, item.count - 1);
                              }
                            }}
                            style={{
                              width: "30px",
                              height: "30px",
                              fontSize: "10px",
                              border: "1px solid #0000007e ",
                            }}
                          />
                          <div>{item.count}</div>
                          <Buttons
                            value={<FontAwesomeIcon icon={faPlus} />}
                            loading={loadingId === item.id}
                            onClick={() => {
                              if (item.count < item.quantity) {
                                handleUpdate(item.id, item.count + 1);
                              }
                            }}
                            style={{
                              width: "30px",
                              height: "30px",

                              fontSize: "10px",
                              border: "1px solid #00000059 ",
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        {/* remove button */}
                        <Button
                          variant="primary"
                          onClick={() => handleRemove(item.id)}
                          style={{
                            padding: "0",
                            width: "40px",
                            background: "none",
                            border: "none",
                            color: "red",
                            textAlign: "right",
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                      </div>
                    </Card.Body>
                  </div>
                </Card>
              ))
            )}
          </Offcanvas.Body>
          {cartItems.length && (
            <div className="cartFooter">
              <Row style={{ fontWeight: "bold" }} className="totalPrice">
                <Col md={9}>Subtotal</Col>
                <Col md={3}>
                  $
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.count,
                    0,
                  )}
                </Col>
              </Row>
              <Link to={"/checkout"}>
                <Buttons
                  value={"Checkout"}
                  style={{ width: "100% ", height: "50px", fontSize: "20px" }}
                  onClick={()=>handleClose()}
                />
              </Link>
            </div>
          )}
        </Offcanvas>
      </Container>
    </div>
  );
};

export default Cart;
