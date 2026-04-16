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
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./shop.css";
import PaginationCom from "../../components/pagination/Pagination";
const Shop = () => {
  const { products } = useFireStore();
  const [displayProducts, setDisplayedProduct] = useState([]);
  const navigate = useNavigate();
  const [serachParam] = useSearchParams();

  const categoryFromUrl = serachParam.get("category");
  const location = useLocation();
  const categoryFromHome = location.state?.category;
  const activeCategory = categoryFromHome || categoryFromUrl;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (activeCategory) {
      const filteredProducts = products.filter(
        (product) => product.category === activeCategory,
      );
      setDisplayedProduct(filteredProducts);
    } else {
      setDisplayedProduct(products);
    }
  }, [products, activeCategory]);
  const removeFilter = () => {
    navigate("/shop");
  };

  // pagination
  const slicedProduct = 6;
  const startIndex = (currentPage - 1) * slicedProduct;
  const totalPages = Math.ceil(displayProducts.length / slicedProduct);
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

        {activeCategory && (
          <Badge
            onClick={() => removeFilter()}
            className="mb-3 ms-4 categoryLabel"
          >
            {activeCategory} <FontAwesomeIcon icon={faX} />
          </Badge>
        )}

        {!displayProducts.length && <Alert variant="info">Not Found!</Alert>}
        <Row className=" m-auto">
          {displayProducts
            ?.slice(startIndex,startIndex + slicedProduct)
            .map((product, index) => {
              return (
                <Col md={4} xs={12} key={index}>
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
                      margin: "10px auto",

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
                          whiteSpace:'nowrap',
                          textOverflow:'ellipsis',
                            overflow: "hidden",

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
                        <button className="btn productBtn">
                          Product Details
                        </button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
        <div className="ms-2">

        <PaginationCom
          totalPages={totalPages}
          active={currentPage}
          setCurrentPage={setCurrentPage}
          />
          </div>
      </Container>
    </div>
  );
};

export default Shop;
