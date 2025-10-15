import styles from "./StModalTitle.module.css";
import cx from "classnames";

const StModalTitle = ({ text }) => {
    return <h2 className={cx(styles.modal_title)}>{text}</h2>;
};

export default StModalTitle;
