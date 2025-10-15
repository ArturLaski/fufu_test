import styles from "./StSectionSubtitle.module.css";
import cx from "classnames";

const StSectionSubtitle = ({ text, customStyle }) => {
  return <h3 className={cx(styles.section_subtitle, customStyle)}>{text}</h3>;
};

export default StSectionSubtitle;
