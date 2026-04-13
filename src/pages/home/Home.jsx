import SwiperPage from "../../components/SwiperComponent/Swiper";
import { useFireStore } from "../../context/FireStoreContext";
import img_1 from "../../assets/service-1.jpg";
import img_2 from "../../assets/service-3.jpg";
import img_3 from "../../assets/service-4.jpg";
import "./home.css";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const Home = () => {
  const { products } = useFireStore();
  return (
    <section className="home">
      <div className="header">
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
        <div className="one"></div>
      </div>
      <div className="container">
        <div className="service row">
          <div className="col-md-4">
            <img src={img_1} alt="" />
          </div>
          <div className="col-md-4">
            <img src={img_3} alt="" />
          </div>
          <div className="col-md-4">
            <img src={img_2} alt="" />
          </div>
        </div>
        <h1 className="text-center">Welcome to our Store</h1>
        <p className="text-center">
          Discover a wide range of products at unbeatable prices. Shop now and
          experience the best in quality and customer service.
        </p>
        <h2 className="text-center my-4">Best Selles</h2>
        <Row>

           {products?.map((product) => (
            <Col
            md={3}
            className="my-2"
            >
             <Link
            to={`/details-page`}
            state={{ product: product }}
            style={{ textDecoration: "none", color: "inherit" }}
            >
            <Card
              key={product.id}
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
                style={{  height: "240px",objectFit:"cover" }}
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
      </div>
      </section>
  );
};

export default Home;
