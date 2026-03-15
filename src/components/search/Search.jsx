import Inputs from "../inputs/Inputs";
import { Form } from "react-bootstrap";
import { useRef } from "react";

const Search = ({ products, setDisplayedProduct,  }) => {
  const searchRef = useRef();
  const handleResult = (e) => {
    e.preventDefault();
    const searchValue = searchRef.current.value;
    if (searchValue) {
      const filteredProducts = products?.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase()) 
      );
      setDisplayedProduct(filteredProducts);
    } else {
      setDisplayedProduct(products);
    }
  };
  return (
    <div className="search">
      <Form className="d-flex justify-content-center align-items-center ">
        <Inputs
          type={"search"}
          id={"Search"}
          noLabel={true}
          ref={searchRef}
          onChange={handleResult}
          style={{ width: "400px" }}
        />
      </Form>
    </div>
  );
};

export default Search;
