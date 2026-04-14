import { Alert, Table } from "react-bootstrap";
import { useFireStore } from "../../context/FireStoreContext";
import ProductModal from "../../components/AddProduct/AddProduct";
import SeeMore from "../../components/seeMore/SeeMore";
import Search from "../../components/search/Search";
import { useEffect, useState } from "react";
import NoImage from "../../assets/image-icon-front-side.jpg";
import PaginationCom from "../../components/pagination/Pagination";
import "./dashboard.css";

const Dashboard = () => {
  const { products, handleDelete } = useFireStore();
  const [displayedProduct, setDisplayedProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (products) {
      setDisplayedProduct(products);
    }
  }, [products]);
  const slicedProduct = 6;
  const startIndex = (currentPage - 1) * slicedProduct;
  const totalPages = Math.ceil( displayedProduct.length/slicedProduct);

  return (
    <>
      <div className="container profile">
        <div className="text-center mt-5">
          {<ProductModal value={"New Product"} />}
        </div>
        <Search
          products={products}
          setDisplayedProduct={setDisplayedProduct}
          location={"dashboard"}
        />
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
            <tbody>
              {displayedProduct
                ?.slice(startIndex, startIndex + slicedProduct)
                .map((product, index) => {
                  return (
                    <tr key={product.id}>
                      <td>{startIndex+index + 1}</td>
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
        <PaginationCom
          totalPages={totalPages}
          active={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      
    </>
  );
};

export default Dashboard;
