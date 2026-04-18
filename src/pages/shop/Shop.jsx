import { useEffect, useState } from "react";
import { Alert, Badge, Card, Col, Container, Row } from "react-bootstrap";
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
  const [serachParams] = useSearchParams();

  const categoryFromUrl = serachParams.get("category");
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
    setCurrentPage(1);
  }, [products, activeCategory]);
  const removeFilter = () => {
    navigate("/shop");
  };

  // pagination
  const slicedProduct = 6;
  const startIndex = (currentPage - 1) * slicedProduct;
  const totalPages = Math.ceil(displayProducts.length / slicedProduct);
  return (
    <div className="shop">
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
            ?.slice(startIndex, startIndex + slicedProduct)
            .map((product) => {
              return (
                <Col md={4} xs={12} key={product.id}>
                  <Card className="shop-card">
                    <Card.Img
                      variant="top"
                      src={product?.imageUrl || NoImage}
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text style={{ fontSize: "16px" }}>
                        <strong>${product.price.toFixed(2)}</strong>
                      </Card.Text>
                      <button className="btn productBtn">
                        <Link
                          key={product.id}
                          to={`/details-page`}
                          state={{ product: product }}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Product Details
                        </Link>
                      </button>
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
