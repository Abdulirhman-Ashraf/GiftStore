import Inputs from "../inputs/Inputs";
import { Form } from "react-bootstrap";
import { useEffect, useRef } from "react";

const Search = ({ products = [], setDisplayedProduct }) => {
  const searchRef = useRef();
  const categoryRef = useRef();
  const productsCategories = products
    .map((product) => product.category)
    .filter((category) => category);
  const uniqueCategories = ["All", ...new Set(productsCategories)];
  const handleFilter = () => {
    const searchValue = searchRef.current.value;
    const categoryValue = categoryRef.current.value;

    let filteredResult = products;
    if (categoryValue != "All") {
      filteredResult = filteredResult.filter((product) =>
        product.category.toLowerCase().includes(categoryValue.toLowerCase()),
      );
    }
    if (searchValue) {
      filteredResult = filteredResult.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
    setDisplayedProduct(filteredResult);
    console.log(filteredResult[0])
  };

  return (
    <div className="search">
      <Form
        className="d-flex justify-content-center align-items-center "
        onSubmit={(e) => e.preventDefault()}
      >
        <select
          className="form-select"
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
