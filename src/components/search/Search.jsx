import Inputs from "../inputs/Inputs";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Search = ({ products = [], setDisplayedProduct }) => {
  const [search, setSearch] = useState("");
  const categoryRef = useRef();
  const navigate = useNavigate();
  const productsCategories = products
    .map((product) => product.category)
    .filter((category) => category);
  const uniqueCategories = ["All", ...new Set(productsCategories)];

  const handleFilter = (e, forceEmpty = false) => {
    if (e) e.preventDefault();
    const searchValue = forceEmpty ? "" : search;

    const categoryValue = categoryRef.current.value;
    let filteredResult = products;
    if (categoryValue != "All") {
      filteredResult = filteredResult.filter(
        (product) =>
          product.category.toLowerCase() === categoryValue.toLowerCase(),
      );
    }
    if (searchValue) {
      filteredResult = filteredResult.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
    if (categoryValue === "All") {
      navigate(`/shop`);
    }
    setDisplayedProduct(filteredResult);
  };

  return (
    <div className="search">
        <Form  onSubmit={handleFilter}>
          <Row className="align-items-center ">
            <Col md={3}>
              <select
                className="form-select "
                aria-label="Default select example"
                onChange={handleFilter}
                ref={categoryRef}
              >
                {uniqueCategories.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
              </select>
            </Col>
            <Col md={6}>
              <Inputs
              
                type={"search"}
                id={"Search"}
                required
                className="searchInput form-control"
                noLabel={true}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value === "") {
                    handleFilter(null, true);
                  }
                }}
              />
            </Col>
            <Col md={3}>
              <Button type="submit" className="btn searchBtn">
                Search
                <span style={{marginInline:"3px"}}>

                <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </Button>
            </Col>
          </Row>
        </Form>
    </div>
  );
};

export default Search;
