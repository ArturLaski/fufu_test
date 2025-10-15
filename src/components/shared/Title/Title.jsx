import styles from "./StTitle.module.css";
import cx from "classnames";

const StTitle = ({ text }) => {
  return <h1 className={cx(styles.title)}>{text}</h1>;
};

export default StTitle;
