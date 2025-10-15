import styles from "./StPopularRecipes.module.css";
import StRecipeCard from "./StRecipeCard/StRecipeCard";

export const StPopularRecipesList = ({ recipes }) => {
  const { data } = recipes;

  return (
    <ul className={styles.popular_recipes_list}>
      {data.map(({ recipe }) => {
        return <StRecipeCard key={recipe._id} recipe={recipe} />;
      })}{" "}
    </ul>
  );
};
