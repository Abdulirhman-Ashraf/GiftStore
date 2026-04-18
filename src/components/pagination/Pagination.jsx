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

  return totalPages>1 && <Pagination >
    <Pagination.Prev
        onClick={() => setCurrentPage(active - 1)}
        disabled={active === 1}
      />

      { items}
      <Pagination.Next
        onClick={() => setCurrentPage(active + 1)}
        disabled={active === totalPages}
      />
  
  </Pagination>;
};

export default PaginationCom;
