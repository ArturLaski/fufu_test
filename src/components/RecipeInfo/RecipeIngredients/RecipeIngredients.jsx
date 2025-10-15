import { StIngredientsList } from "./StIngredientsList";
import styles from "./Ingredients.module.css";

export const StRecipeIngredients = ({ ingredients }) => {
  return (
    <div>
      <h3 className={styles.ingredients_subtitel}>Ingredients</h3>
      <StIngredientsList ingredients={ingredients} />
    </div>
  );
};
