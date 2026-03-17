import SwiperPage from "../../components/SwiperComponent/Swiper";
import { useFireStore } from "../../context/FireStoreContext";
import "./home.css";
const Home = () => {
  const { products } = useFireStore();
  return (
    <section className="home">
      <div className="container">
        <div className="header"></div>
        <h1 className="text-center">Welcome to our Store</h1>
        <p className="text-center">
          Discover a wide range of products at unbeatable prices. Shop now and
          experience the best in quality and customer service.
        </p>
        <h2 className="text-center my-4">Best Selles</h2>
        <SwiperPage products={products} />
      </div>
    </section>
  );
};

export default Home;
