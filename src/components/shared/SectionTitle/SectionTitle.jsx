import styles from "./StSectionTitle.module.css";
import cx from "classnames";

const StSectionTitle = ({ text, addStyle='' }) => {
  return <h2 className={cx(styles.section_title , addStyle)}>{text}</h2>;
};

export default StSectionTitle;
