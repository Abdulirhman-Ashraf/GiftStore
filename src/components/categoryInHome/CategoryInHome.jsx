import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import NoImage from "../../assets/image-icon-front-side.jpg";

const CategoryInHome = ({ products, h2, category }) => {
  const [filteredProducts, setfilteredProducts] = useState();
  useEffect(() => {
    if (category) {
      setfilteredProducts ( products?.filter((ele) => ele.category === category))
    } else {
      setfilteredProducts(products);
    }
  }, []);
  return (
    <Row>
      <Row className="align-items-center">
        <Col md={11}>
          <h2 className=" my-4">{h2}</h2>
        </Col>
        <Col md={1}>
          <Link to="/shop" state={{ category: category }}>
            see more
          </Link>
        </Col>
      </Row>

      {filteredProducts?.slice(0, 8)?.map((product) => (
        <Col md={3} xs={6} className="my-2" key={product.id}>
          <Link
            to={`/details-page`}
            state={{ product: product }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              style={{
                height: "320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center ",
                border: "none",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Img
                variant="top"
                src={product?.imageUrl || NoImage}
                style={{ height: "240px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "15px",
                    overflow: "hidden",
                    height: "20px",
                  }}
                >
                  {product.name}
                </Card.Title>
                <Card.Title style={{ fontSize: "16px" }}>
                  {product.price}$
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default CategoryInHome;
