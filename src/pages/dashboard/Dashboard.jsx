import { Alert, Table } from "react-bootstrap";
import { useFireStore } from "../../context/FireStoreContext";
import ProductModal from "../../components/AddProduct/AddProduct";
import SeeMore from "../../components/seeMore/SeeMore";
import Search from "../../components/search/Search";
import { useEffect, useState } from "react";
import NoImage from "../../assets/image-icon-front-side.jpg";
import "./dashboard.css";

const Dashboard = () => {
  const { products, handleDelete } = useFireStore();
  const [displayedProduct, setDisplayedProduct] = useState([]);
  useEffect(() => {
    if (products) {
      setDisplayedProduct(products);
    }
  }, [products]);

  return (
    <div className="container profile">
      <div className="d-flex justify-content-center align-items-center gap-3">
        {<ProductModal value={"New Product"} />}
        <Search
          products={products}
          setDisplayedProduct={setDisplayedProduct}
          location={"dashboard"}
        />
      </div>
      {!displayedProduct.length ? (
        <Alert variant="info">Not Found!</Alert>
      ) : (
        <Table bordered size="sm" className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody >
            {displayedProduct.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>
                    <strong>{product.price} </strong>$
                  </td>
                  <td>
                    <SeeMore text={product.description} />
                  </td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <img src={product?.imageUrl || NoImage} alt="" />
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="btn btn-warning"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {
                      <ProductModal
                        value={"Update"}
                        id={product.id}
                        initialData={product}
                      />
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Dashboard;
