import { StOwnerCard } from "./StOwnerCard/StOwnerCard";
import { StTagList } from "./Tag/StTagList";
import styles from "./StRecipeMainInfo.module.css";

export const StRecipeMainInfo = ({ data }) => {
  const { area, category, time, title, description, owner } = data;

  return (
    <div className={styles.recipe_main_info_wrapper}>
      <h3 className={styles.recipe_header}>{title}</h3>
      <StTagList tags={{ area, category, time }} />
      <p className={styles.recipe_description}>{description}</p>
      <StOwnerCard owner={owner} />
    </div>
  );
};
