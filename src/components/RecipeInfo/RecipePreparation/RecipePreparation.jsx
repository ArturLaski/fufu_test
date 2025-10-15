import st_formatInstruction from "../../../utilities/st_formatInstruction";
import styles from "./StRecipePreparation.module.css";

export const StRecipePreparation = ({ instruction }) => {
  return (
    <div>
      <h4 className={styles.recipe_preparation}>StRecipe Preparation</h4>
      <div
        className={styles.instruction}
        dangerouslySetInnerHTML={{ __html: st_formatInstruction(instruction) }}
      />
    </div>
  );
};
