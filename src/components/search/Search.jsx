import Inputs from "../inputs/Inputs";
import { Form } from "react-bootstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ products = [], setDisplayedProduct, location }) => {
  const searchRef = useRef();
  const categoryRef = useRef();
  const navigate = useNavigate();
  const productsCategories = products
    .map((product) => product.category)
    .filter((category) => category);
  const uniqueCategories = ["All", ...new Set(productsCategories)];
  
  const handleFilter = () => {
    const searchValue = searchRef.current.value;
    const categoryValue = categoryRef.current.value;
    let filteredResult = products;
    if (categoryValue != "All") {
      filteredResult = filteredResult.filter(
        (product) =>
          product.category.toLowerCase() === categoryValue.toLowerCase(),
      );
      navigate(`/${location}?category=${categoryValue}`);
    }
    if (searchValue) {
      filteredResult = filteredResult.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
    if (categoryValue === "All") {
      navigate(`/${location}`);
    }
    setDisplayedProduct(filteredResult);
  };

  return (
    <div className="search">
      <Form
        className="d-flex justify-content-center align-items-center "
        onSubmit={(e) => e.preventDefault()}
      >
        <select
          className="form-select me-1"
          aria-label="Default select example"
          style={{ width: "150px" }}
          onChange={handleFilter}
          ref={categoryRef}
        >
          {uniqueCategories.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>
        <Inputs
          type={"search"}
          id={"Search"}
          noLabel={true}
          ref={searchRef}
          onChange={handleFilter}
          style={{ width: "400px" }}
        />
      </Form>
    </div>
  );
};

export default Search;
