import React, { useRef } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Inputs from "../inputs/Inputs";
import { Form, Spinner } from "react-bootstrap";
import { useFireStore } from "../../context/FireStoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductModal = ({ value, id, initialData, icon, isUpdate }) => {
  const { addToStore, update } = useFireStore();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const brandRef = useRef();
  const descriptionRef = useRef();
  const quantityRef = useRef();
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewProduct = async () => {
    try {
      const productData = {
        name: nameRef.current.value,
        price: Number(priceRef.current.value),
        category: categoryRef.current.value,
        quantity: Number(quantityRef.current.value),
        description: descriptionRef.current.value,
        brand: brandRef.current.value,
        imageUrl: imageUrl,
      };
      await addToStore(productData);
      handleClose();
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_time");
    data.append("cloud_name", "dkhpqub1n");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkhpqub1n/image/upload",
      {
        method: "POST",
        body: data,
      },
    );
    const uploadImageURL = await res.json();
    console.log(uploadImageURL);
    setImageUrl(uploadImageURL.url);
    setLoading(false);
  };
  const handleUpdate = async () => {
    try {
      const updatedDate = {
        name: nameRef.current.value,
        price: Number(priceRef.current.value),
        category: categoryRef.current.value,
        quantity: Number(quantityRef.current.value),
        description: descriptionRef.current.value,
        brand: brandRef.current.value,
        imageUrl: imageUrl,
      };
      await update(id, updatedDate);
      handleClose();
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  const handleSubmit = () => {
    if (isUpdate === true) {
      handleUpdate();
    } else {
      handleNewProduct();
    }
  };
  return (
    <div>
      <Button
        variant="success"
        onClick={handleShow}
        style={{
          width: value ? "100%" : "auto",
          padding: value ? "10px" : "3px",
        }}
      >
        <div className="d-flex align-items-center justify-content-center">
          <span>{value}</span>
          <span style={{ fontSize: "20px" }} className="ms-1">
            {icon && <FontAwesomeIcon icon={icon} />}
          </span>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {isUpdate?"Update Product" :"New Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Inputs
              type={"text"}
              id={"Name"}
              ref={nameRef}
              defaultValue={initialData?.name}
            />
            <Inputs
              type={"number"}
              id={"Price"}
              ref={priceRef}
              defaultValue={initialData?.price}
            />

            <Inputs
              type={"text"}
              id={"category"}
              ref={categoryRef}
              defaultValue={initialData?.category || ""}
            />
            <Inputs
              type={"text"}
              id={"Brand"}
              ref={brandRef}
              defaultValue={initialData?.brand}
            />
            <label htmlFor="Description">Description</label>
            <textarea
              id="Description"
              ref={descriptionRef}
              className="form-control"
              defaultValue={initialData?.description}
            />
            <Inputs
              type={"number"}
              id={"Quantity"}
              ref={quantityRef}
              defaultValue={initialData?.quantity}
            />
            <Inputs type={"file"} id={"image"} onChange={handleFileUpload} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner></Spinner> : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductModal;
