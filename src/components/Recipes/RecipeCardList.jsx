import StRecipeCard from "../StPopularRecipes/StRecipeCard/StRecipeCard";
import styles from "./StRecipes.module.css";

export const StRecipeCardList = ({ recipes }) => {
  const { data } = recipes;

  return (
    <ul className={styles.recipes_search_wrapp}>
      {data.map((recipe) => {
        return <StRecipeCard key={recipe._id} recipe={recipe} />;
      })}
    </ul>
  );
};
