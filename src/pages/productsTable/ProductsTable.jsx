import { Table } from "react-bootstrap";
import { useFireStore } from "../../context/FireStoreContext";
import ProductModal from "../../components/AddProduct/AddProduct";
import SeeMore from "../../components/seeMore/SeeMore";
import { useEffect, useState } from "react";
import NoImage from "../../assets/image-icon-front-side.jpg";
import PaginationCom from "../../components/pagination/Pagination";

import "./dashboard.css";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProductsTable = ({ displayedProduct }) => {
  const { handleDelete } = useFireStore();
  const [currentPage, setCurrentPage] = useState(1);

  const slicedProduct = 6;
  const startIndex = (currentPage - 1) * slicedProduct;
  const totalPages = Math.ceil(displayedProduct.length / slicedProduct);
useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);
  return (
    <>
      <div className=" profile">
        <Table responsive striped hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th className="low-priority">Description</th>
              <th className="low-priority">Brand</th>
              <th className="low-priority">Category</th>
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
                    <td>{startIndex + index + 1}</td>
                    <td>
                      <SeeMore text={product.name} />
                    </td>
                    <td>
                      <strong>{product.price} </strong>$
                    </td>
                    <td className="low-priority">
                      <SeeMore text={product.description} />
                    </td>
                    <td className="low-priority">{product.brand}</td>
                    <td className="low-priority">{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <img src={product?.imageUrl || NoImage} alt="" />
                    </td>
                    <td>
                      <button
                        type="submit"
                        className="btn btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                    <td>
                      {
                        <ProductModal
                          isUpdate={true}
                          icon={faPenToSquare}
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

        <PaginationCom
          totalPages={totalPages}
          active={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default ProductsTable;
