import { useFireStore } from "../../context/FireStoreContext";
import img_1 from "../../assets/service-1.jpg";
import img_2 from "../../assets/service-3.jpg";
import img_3 from "../../assets/service-4.jpg";
import CategoryInHome from "../../components/categoryInHome/CategoryInHome";
import "./home.css";
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
       <CategoryInHome products={products} h2={"Best Sells"} dist={"shop"} />
       <CategoryInHome products={products} h2={"Gifts For Your Lover"}  category={"valentine"}/>
       <CategoryInHome products={products} h2={"Lovely Gifts To Your Child"}  category={"children"}/>

      </div>
      </section>
  );
};

export default Home;
