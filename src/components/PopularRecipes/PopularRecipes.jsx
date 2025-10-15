import { useGetPopularRecipeQuery } from "../../store/services/recipeService";
import { StPopularRecipesList } from "./StPopularRecipesList";
import styles from "./StPopularRecipes.module.css";
import { StLoader } from "../shared/StLoader/StLoader";
import { Navigate } from "react-router-dom";

export const StPopularRecipes = () => {
  const { data: popularRecipes, isLoading, error: isError } = useGetPopularRecipeQuery();

  return (
    <section className={styles.popular_recipes_container}>
      {isError && <Navigate to="/error500" replace={true} />}
      <h3 className={styles.header_popular_recipes}>Popular recipes</h3>
      {!isError && isLoading ? <StLoader /> : <StPopularRecipesList recipes={popularRecipes} />}
    </section>
  );
};
