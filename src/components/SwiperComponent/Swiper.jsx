import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Card } from "react-bootstrap";
import NoImage from "../../assets/image-icon-front-side.jpg";
import { Link, useNavigate } from "react-router-dom";

const SwiperPage = ({ products }) => {
  const navigate = useNavigate();
  return (
    <Swiper
    style={{margin:"auto"}}
      spaceBetween={20}
      slidesPerView={5}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}

    >
      {products?.map((product) => (
        <SwiperSlide>
          <Link
            to={`/details-page`}
            state={{ product: product }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              key={product.id}
              style={{
                width: "220px",
                height: "320px",
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
                style={{ width: "200px", height: "240px",objectFit:"cover" }}
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default SwiperPage;
