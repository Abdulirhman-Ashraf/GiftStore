import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useFireStore } from "../../context/FireStoreContext";
import Inputs from "../../components/inputs/Inputs";
import "./checkout.css";
const Checkout = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [error, setError] = useState();
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || {
    cartItems: [],
    totalPrice: 0,
  };
  const { addOrder, update, cleanCart } = useFireStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  // handle Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMethod === "") {
      alert("select payment method");
      return;
    }
    try {
      await addOrder({
        items: cartItems,
        totalPrice: totalPrice,
        shippingData: formData,
        paymentMethod: selectedMethod,
        userId: currentUser?.uid,
      });
      const updatePromises = cartItems.map((item) => {
        const newStock = item.quantity - item.count;
        return update(item.productId, { quantity: newStock });
      });
      await Promise.all(updatePromises);
      await cleanCart();
      alert("Order success!");
      navigate("/profile");
    } catch (error) {
      setError(error);
      console.log(error);
      console.log(cartItems);
    }
  };
  return (
    <section className="checkout">
      <Container>
        <h1 style={{ fontWeight: "bold" }} className="mb-4">
          checkout
        </h1>
        <Form onSubmit={handleSubmit} className="form">
          <Row className="d-flex align-items-start">
            <Col xs={12} md={6}>
              <h4>billing & shipping address</h4>
              <Row className="my-3 ">
            
                <Col>
                  <Inputs
                    id={"name"}
                    placeholder={"name"}
                    type={"text"}
                    onChange={handleChange}
                    value={formData.name}
                    name={"name"}
                  />
                </Col>

                <Col>
                  <Inputs
                    id={"email"}
                    type={"email"}
                    onChange={handleChange}
                    value={formData.email}
                  />
                </Col>
              </Row>

              <Col>
                <Inputs
                  id={"phone"}
                  type={"tel"}
                  onChange={handleChange}
                  value={formData.phone}
                  name={"phone"}
                  maxlength={"11"}
                />
              </Col>
              <Col>
                <Inputs
                  id={"address"}
                  placeholder={"1234 Main St"}
                  type={"text"}
                  onChange={handleChange}
                  value={formData.address}
                />
              </Col>

              <Row className="mb-3">
                <Col>
                  <Inputs
                    id={"city"}
                    type={"text"}
                    onChange={handleChange}
                    value={formData.city}
                  />
                </Col>

                <Col>
                  <Inputs
                    id={"state"}
                    type={"text"}
                    onChange={handleChange}
                    value={formData.state}
                  />
                </Col>
                <Col>
                  <Inputs
                    id={"zip"}
                    onChange={handleChange}
                    value={formData.zip}
                    isRequired={false}
                  />
                </Col>
              </Row>
            </Col>

            <Col xs={12} md={6}>
              <h4>payment details</h4>
              <Row className="d-flex align-items-center mt-4">
                <Col xs={6} md={12}>
                  <Form.Check type="radio" id="paypal" className=" p-0">
                    <Form.Check.Input
                      type="radio"
                      name="payment_method"
                      value="paypal"
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="d-none"
                    />
                    <Form.Check.Label
                      className={` d-flex align-items-center p-3 border rounded ${selectedMethod === "paypal" ? "border-primary bg-light" : ""}`}
                      style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                    >
                      <div className="ms-3 fs-3"> </div>
                      <div className="d-flex flex-column">
                        <span className="fw-bold text-dark">(PayPal)</span>
                      </div>
                      {selectedMethod === "paypal" && (
                        <span className="me-auto text-primary fs-4">✔</span>
                      )}
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
                <Col xs={6} md={12}>
                  <Form.Check type="radio" id="cash" className=" p-0">
                    <Form.Check.Input
                      type="radio"
                      name="payment_method"
                      value="cash"
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="d-none"
                    />
                    <Form.Check.Label
                      className={` d-flex align-items-center p-3 border rounded ${selectedMethod === "cash" ? "border-primary bg-light" : ""}`}
                      style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                    >
                      <div className="ms-4 fs-2">
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-bold text-dark">(Cash)</span>
                      </div>
                      {selectedMethod === "cash" && (
                        <span className="me-auto text-primary fs-4">✔</span>
                      )}
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
              </Row>
            </Col>

            <button type="submit" className="checkoutBtn">
              Submit
            </button>
          </Row>
        </Form>
      </Container>
    </section>
  );
};

export default Checkout;
