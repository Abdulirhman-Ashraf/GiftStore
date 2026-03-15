import SwiperPage from "../../components/SwiperComponent/Swiper";
import { useFireStore } from "../../context/FireStoreContext";
import home from "../../assets/1.jpg";
import "./home.css";
const Home = () => {
  const { allProducts } = useFireStore();
  return (
    <section className="home">
      <div className="container">
        <div className="header" >

        </div>
        <h1 className="text-center">Welcome to our Store</h1>
        <p className="text-center">
          Discover a wide range of products at unbeatable prices. Shop now and
          experience the best in quality and customer service.
        </p>
        <h2 className="text-center my-4">Best Selles</h2>
        <SwiperPage products={allProducts} />
        <h2 className="text-center my-4">Books</h2>
        <SwiperPage products={allProducts} />
        <h2 className="text-center my-4">Best Offers</h2>
        <SwiperPage products={allProducts} />
      </div>
    </section>
  );
};

export default Home;
