import styles from "./Tag.module.css";

export const StTagListItem = ({ tagInfo }) => {
  return <li className={styles.tag_list_item}>{!Number(tagInfo) ? tagInfo : `${tagInfo} min`}</li>;
};
