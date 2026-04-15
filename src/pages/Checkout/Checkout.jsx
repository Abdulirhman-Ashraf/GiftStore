import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import "./checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useFireStore } from "../../context/FireStoreContext";
const Checkout = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [error, setError] = useState();
  const location = useLocation();
  const userOrder = location.state?.cartItems;
  const { addOrder } = useFireStore();
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
        items: userOrder,
        shippingData: formData,
        paymentMethod: selectedMethod,
        userId: currentUser?.uid,
      });
      alert("Order success!");
      navigate("/profile");
    } catch (error) {
      setError(error);
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
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="1234 Main St"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formGridAddress1"
                aria-required
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    value={formData.city}
                    name="city"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.state}
                    name="state"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    value={formData.zip}
                    name="zip"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <button type="submit" className="checkoutBtn">
                Submit
              </button>
            </Col>

            <Col xs={12} md={6}>
              <h4>payment details</h4>

              <Form.Check type="radio" id="paypal" className="mt-3 p-0">
                <Form.Check.Input
                  type="radio"
                  name="payment_method"
                  value="paypal"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="d-none"
                />
                <Form.Check.Label
                  className={`w-100 d-flex align-items-center p-3 border rounded ${selectedMethod === "paypal" ? "border-primary bg-light" : ""}`}
                  style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                >
                  <div className="ms-3 fs-2"> </div>
                  <div className="d-flex flex-column">
                    <span className="fw-bold text-dark">(PayPal)</span>
                  </div>
                  {selectedMethod === "paypal" && (
                    <span className="me-auto text-primary fs-4">✔</span>
                  )}
                </Form.Check.Label>
              </Form.Check>
              <Form.Check type="radio" id="cash" className="mt-4 p-0">
                <Form.Check.Input
                  type="radio"
                  name="payment_method"
                  value="cash"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="d-none"
                />
                <Form.Check.Label
                  className={`w-100 d-flex align-items-center p-2 border rounded ${selectedMethod === "cash" ? "border-primary bg-light" : ""}`}
                  style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                >
                  <div className="ms-3 fs-2">
                    <FontAwesomeIcon icon={faWallet} />
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
        </Form>
      </Container>
    </section>
  );
};

export default Checkout;
