import { Link } from "react-router-dom";
import styles from "./StBreadCrumbs.module.css";

const StBreadCrumbs = ({ currentPage }) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.link_to_home}>
        StHome
      </Link>
      <span className={styles.slash}>/</span>
      <span className={styles.current_page}>{currentPage}</span>
    </div>
  );
};

export default StBreadCrumbs;
