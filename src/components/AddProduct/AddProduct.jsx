import React, { useRef } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Inputs from "../inputs/Inputs";
import { Form, Spinner } from "react-bootstrap";
import { useFireStore } from "../../context/FireStoreContext";

const ProductModal = ({ value, id, initialData }) => {
  const { addToStore, update } = useFireStore();
  const [show, setShow] = useState(false);
  const [loading,setLoading] = useState(false);
  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const brandRef = useRef();
  const descriptionRef = useRef();
  const quantityRef = useRef();
  const [imageUrl,setImageUrl] = useState(initialData?.imageUrl||"");

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
        imageUrl: imageUrl
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
        imageUrl: imageUrl
      };
      await update(id, updatedDate);
      handleClose();
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  const handleSubmit = () => {
    if (value === "Update") {
      handleUpdate();
    } else {
      handleNewProduct();
    }
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        {value}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Product</Modal.Title>
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
            {/* <label htmlFor="category">Choose a Category:</label>
            <br /> */}
            {/* <select
              ref={categoryRef}
              defaultValue={initialData?.category || ""}
              name="category"
              id="category"
              className=" my-3 form-select"
            >
              <option value="" disabled hidden>
                Select an option
              </option>
              <option value="Clothing">Clothing</option>
              <option value="Tech">Tech</option>
              <option value="video game">Video Game</option>
              <option value="Books">Books</option>
              <option value="School">School</option>
              <option value="Personal Care">Personal Care</option>
            </select> */}
                    <Inputs
              type={"text"}
              id={"category"}
              ref={categoryRef}
              defaultValue={initialData?.category ||""}
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
            <Inputs
              type={"file"}
              id={"image"}
              onChange={handleFileUpload}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ?<Spinner></Spinner> :"Save Changes"} 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductModal;
