import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Buttons from "../../components/Buttons";
import { useFireStore } from "../../context/FireStoreContext";
import Search from "../../components/Search/Search";
import NoImage from "../../assets/image-icon-front-side.jpg";
import SeeMore from "../../components/seeMore/SeeMore";
import { Link, useNavigate } from "react-router-dom";
const Shop = () => {
  const { allProducts } = useFireStore();
  const [displayProducts, setDisplayedProduct] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (allProducts) {
      setDisplayedProduct(allProducts);
    }
  }, [allProducts]);
  return (
    <div className="shop ">
      <Container className="">
        <Search
          products={allProducts}
          setDisplayedProduct={setDisplayedProduct}
        />
        <div className="d-flex justify-content-beteen gap-5 align-items-start flex-wrap  ">
          {displayProducts?.map((product) => {
            return (
              <Link
                to={`/details-page`}
                state={{ product: product }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  key={product.id}
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
                    style={{ width: "200px", height: "240px" }}
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
