import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Holder from "../holder/Holder";

function OrderDetails({ Details }) {
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <Button variant="primary"  onClick={handleShow}>
        Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentPage === 1 && (
            <div className="customer">
              <h4>Customer</h4>

              <Holder label={"Name"} value={Details.shippingData.name} />
              <Holder label={"Phone"} value={Details.shippingData.phone} />
              <Holder label={"email"} value={Details.shippingData.email} />
              <Holder label={"Address"} value={Details.shippingData.address} />
              <Holder label={"City"} value={Details.shippingData.city} />
              <Holder label={"State"} value={Details.shippingData.state} />
              <Holder label={"Payment"} value={Details.paymentMethod} />
            </div>
          )}
          {currentPage === 2 && (
            <div className="Items">
              <h4>Ordered Items</h4>
              {Details.items.map((item) => (
                <div key={item.id}>
                  <Holder label={"Image"} imageUrl={item.imageUrl} />
                  <Holder label={"Name"} value={item.name} />
                  <Holder label={"Quantity"} value={item.count} />
                  <Holder label={"Price"} value={`${item.price} $`} />
                  <Holder
                    label={"Subtotal"}
                    value={`${item.count * item.price} $`}
                  />
                </div>
              ))}
            </div>
          )}
          {currentPage === 3 && (
            <div className="Summary">
              <h4>Summary</h4>
              <Holder label={"Total Price"} value={Details.totalPrice + "$"} />
              <Holder
                label={"Date"}
                value={Details.createAt.toDate().toLocaleDateString("en-EG")}
              />
              <Holder
                label={"Time"}
                value= {Details.createAt.toDate().toLocaleTimeString("en-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
              />
              <Holder
                label={"Status"}
                value= {Details.status}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handlePrev}
            disabled={currentPage === 1 ? true : false}
          >
            Prev
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentPage === 3 ? true : false}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderDetails;
