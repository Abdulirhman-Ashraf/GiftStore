import { Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import "./checkout.css";

const Checkout = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="checkout">
      <Container>
        <h1 style={{ fontWeight: "bold" }} className="mb-4">checkout</h1>
        <Form onSubmit={handleSubmit} className="form">
          <Row className="d-flex align-items-start">
            <Col xs={12} md={6}>
              <h4 >billing & shipping address</h4>
              <Row className="my-3 " >
                <Form.Group as={Col} controlId="formGridName" > 
                  <Form.Label>name</Form.Label>
                  <Form.Control type="text" placeholder="Name" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" required/>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>phone</Form.Label>
                <Form.Control type="tel" placeholder="1234 Main St" required/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formGridAddress1"
                aria-required
              >
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" required/>
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control required/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState" aria-required>
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Row>

              <button  type="submit" className="checkoutBtn">
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
                  required
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
                  required
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
