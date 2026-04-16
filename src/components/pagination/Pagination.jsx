import { Pagination } from "react-bootstrap";

const PaginationCom = ({ totalPages, active, setCurrentPage }) => {
  let items = [];

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return  <Pagination >{items}</Pagination>;
};

export default PaginationCom;
