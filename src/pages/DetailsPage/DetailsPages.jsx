import { Container } from "react-bootstrap";
import NoImage from "../../assets/image-icon-front-side.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import SeeMore from "../../components/seeMore/SeeMore";
import Buttons from "../../components/Buttons";
import { useAuth } from "../../context/AuthContext";
import { useFireStore } from "../../context/FireStoreContext";
import { useEffect, useState } from "react";
import "./detailsPage.css";

const DetailsPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addToCart, setIsCartOpen, cartItems } = useFireStore();

  const [loading, setLoading] = useState(false);
  const isProductInCart = cartItems?.some(
    (item) => item.productId === product?.id,
  );
  const ChangedStock = cartItems?.find(
    (item) => item?.productId === product?.id,
  );

  const [stockCount, setStockCount] = useState(1);
  useEffect(() => {
    if (ChangedStock) {
      setStockCount(ChangedStock?.count);
    }
  }, [ChangedStock]);
  // handle category on Click
  const handleCategory = (category) => {
    navigate(`/shop?category=${category}`);
  };
  const handleAddCart = async () => {
    if (!currentUser) {
      alert("You need to login first to add products to your cart");
      navigate("/login");
      return;
    }
    if (!cartItems) return;
    if (isProductInCart) {
      alert("This product is already in your cart");
      return;
    } else {
      setLoading(true);
      try {
        await addToCart({
          ...product,
          count: stockCount,
          productId: product.id,
        });
        setIsCartOpen(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="detailsPage">
      <Container>
        <div className="row details-container mt-5">
          <div className="left col-12 col-md-4">
            <img src={product?.imageUrl || NoImage} alt="product image" />
          </div>
          <div className="center col-12 col-md-4">
            <div>
              in stock :
              <span style={{ color: "green", fontSize: "13px" }}>
                {product?.quantity}
              </span>
            </div>
            <div>
              <h3> {product?.name}</h3>
            </div>
            <div style={{ fontSize: "20px" }}>
              <strong> ${product?.price}</strong>
            </div>
            <div onClick={() => handleCategory(product?.category)}>
              <b>Category</b> :{" "}
              <span className="category">{product?.category}</span>
            </div>
            {product?.brand && <div>Brand : {product?.brand}</div>}
            <div>
              <b>Description </b> :{" "}
              <SeeMore text={product?.description || "No text"} />
            </div>
          </div>
          <div className="right  col-12 col-md-4">
            <div className="mb-2">
              Total Price <strong> ${product?.price * stockCount}</strong>
            </div>
            <div className="stock ">
              <Buttons
                variant={"success"}
                disabled={isProductInCart || stockCount <= 1}
                value={"-"}
                onClick={() => {
                  if (stockCount > 1) {
                    setStockCount((prev) => prev - 1);
                  }
                }}
              />
              <div>{stockCount}</div>
              <Buttons
                variant={"success"}
                value={"+"}
                disabled={isProductInCart || stockCount >= product.quantity}
                onClick={() => {
                  if (stockCount < product.quantity) {
                    setStockCount((prev) => prev + 1);
                  }
                }}
              />
            </div>
            <Buttons
              variant={"success"}
              value={"Add To Cart"}
              onClick={handleAddCart}
              style={{ width: "100%" }}
              disabled={loading}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailsPage;
