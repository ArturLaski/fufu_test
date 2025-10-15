import { nanoid } from "@reduxjs/toolkit";
import { StTagListItem } from "./TagItem.jsx";
import styles from "./Tag.module.css";

export const StTagList = ({ tags }) => {
  const tagsKeys = Object.keys(tags);

  return (
    <ul className={styles.tags_list}>
      {tagsKeys.map((tagsKey) => (
        <StTagListItem key={nanoid()} tagInfo={tags[tagsKey]} />
      ))}
    </ul>
  );
};
