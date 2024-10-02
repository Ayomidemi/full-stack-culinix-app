import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import styles from "./styles.module.scss";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  const pagesPerSet = 5;
  const currentSet = Math.ceil(currentPage / pagesPerSet);

  const startPage = (currentSet - 1) * pagesPerSet + 1;
  const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);

  const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(
    (num) => startPage + num
  );

  return (
    <div className={styles.pagination_wrap}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft size={17} />
      </button>

      {pageNumbers.map((number) => (
        <p
          key={number}
          className={`${styles.number} ${
            currentPage === number ? styles.active_number : ""
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </p>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight size={17} />
      </button>
    </div>
  );
};

export default Pagination;
