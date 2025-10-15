import ReactPaginate from "react-paginate";
import styles from "./StPagination.module.css";
import { useEffect, useState } from "react";

const StPagination = ({ pageCount, onPageChange, currentPage }) => {
  const [, setPageRangeDisplayed] = useState(st_getPageRangeDisplayed());
  useEffect(() => {
    const st_handleResize = () => {
      setPageRangeDisplayed(st_getPageRangeDisplayed());
    };

    window.addEventListener("resize", st_handleResize);
    return () => window.removeEventListener("resize", st_handleResize);
  }, []);

  function st_getPageRangeDisplayed() {
    const width = window.innerWidth;
    return width < 768 ? 1 : 3;
  }

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakLinkClassName={styles.breakMe}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={st_getPageRangeDisplayed()}
      onPageChange={onPageChange}
      containerClassName={styles.pagination}
      subContainerClassName={`${styles.pages} ${styles.pagination}`}
      activeClassName={styles.active}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.pageItem}
      nextClassName={styles.pageItem}
      previousLinkClassName={styles.previousItem}
      nextLinkClassName={styles.nextItem}
      disabledClassName={styles.disabled}
      pageClassName={styles.pageItem}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default StPagination;
