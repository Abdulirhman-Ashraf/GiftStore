import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useFireStore } from "../../context/FireStoreContext";
import Search from "../../components/search/Search";
import NoImage from "../../assets/image-icon-front-side.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./shop.css";
const Shop = () => {
  const { products } = useFireStore();
  const [displayProducts, setDisplayedProduct] = useState([]);
  const navigate = useNavigate();
  const [serachParam] = useSearchParams();

  const categoryFromUrl = serachParam.get("category");
  useEffect(() => {
    if (categoryFromUrl) {
      const filteredProducts = products.filter(
        (product) => product.category === categoryFromUrl,
      );
      setDisplayedProduct(filteredProducts);
    } else {
      setDisplayedProduct(products);
    }
  }, [products, categoryFromUrl]);
  const removeFilter = () => {
    navigate("/shop");
  };
  return (
    <div className="shop ">
      <Container>
        <h2 className="text-center mt-5" style={{ fontWeight: "bold" }}>
          shop
        </h2>
        <Search
          products={products}
          setDisplayedProduct={setDisplayedProduct}
          location={"shop"}
        />

        {categoryFromUrl && (
          <Badge onClick={() => removeFilter()} className="mb-3 ms-4 categoryLabel">
            {categoryFromUrl} <FontAwesomeIcon icon={faX} />
          </Badge>
        )}

        {!displayProducts.length && <Alert variant="info">Not Found!</Alert>}
        <Row className=" m-auto" >
          {displayProducts?.map((product) => {
            return (
              <Col  md={4}>
              
                <Card
                  style={{
                    width: "100%",
                    height: "380px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "10px",
                    border: "none",
                    overflow: "hidden",
                    borderRadius: "8px",
                    padding: "10px",
                    margin:"10px auto",

                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={product?.imageUrl || NoImage}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{
                        fontSize: "14px",
                        textTransform: "uppercase",
                        fontWeight: "600",
                      }}
                    >
                      {product.name}
                    </Card.Title>
                    <Card.Title style={{ fontSize: "16px" }}>
                      <strong>${product.price.toFixed(2)}</strong>
                    </Card.Title>
                    <Link
                      key={product.id}
                      to={`/details-page`}
                      state={{ product: product }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button className="btn productBtn">Product Details</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
