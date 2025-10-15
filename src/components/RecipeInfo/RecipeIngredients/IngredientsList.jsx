import { StIngredientsItem } from "./StIngredientsItem";
import styles from "./Ingredients.module.css";

export const StIngredientsList = ({ ingredients }) => {
  return (
    <ul className={styles.ingredients_list}>
      {ingredients.map(({ ingredient, mesure }) => (
        <StIngredientsItem
          key={ingredient._id}
          pathImg={ingredient.img}
          name={ingredient.name}
          mesure={mesure}
        />
      ))}
    </ul>
  );
};
