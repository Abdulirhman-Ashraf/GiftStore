import { useEffect, useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";
import { useFireStore } from "../../context/FireStoreContext";
import Search from "../../components/search/Search";
import NoImage from "../../assets/image-icon-front-side.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./shop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
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
        <Search
          products={products}
          setDisplayedProduct={setDisplayedProduct}
          location={'shop'}
        />
        
        { categoryFromUrl && (
          <div onClick={() => removeFilter()} className="my-3 categoryLabel">
            {categoryFromUrl} <FontAwesomeIcon icon={faFilterCircleXmark} />
          </div>
        )}
 
        {!displayProducts.length && <Alert variant="info">Not Found!</Alert>}
        <div className="d-flex justify-content-start gap-5 align-items-start flex-wrap  ">
          {displayProducts?.map((product) => {
            return (
              <Link
                key={product.id}
                to={`/details-page`}
                state={{ product: product }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  style={{
                    width: "220px",
                    height: "350px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "center ",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={product?.imageUrl || NoImage}
                    style={{
                      width: "200px",
                      height: "240px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title style={{ fontSize: "16px" }}>
                      {product.name}
                    </Card.Title>
                    <Card.Title style={{ fontSize: "16px" }}>
                      ${product.price}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Shop;
