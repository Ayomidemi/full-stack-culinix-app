import styles from "./styles.module.scss";

import { SetStateAction, useState } from "react";
import Pagination from "../../components/UI/pagination";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.home_wrapper}>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
