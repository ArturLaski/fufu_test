import { Navigate, useParams } from "react-router-dom";
import { StRecipeInfo } from "../../components/StRecipeInfo/StRecipeInfo";
import { useGetRecipyByIdQuery } from "../../store/services/recipeService";
import { StPopularRecipes } from "../../components/StPopularRecipes/StPopularRecipes";
import styles from "./StRecipe.module.css";
import { useEffect } from "react";
import StBreadCrumbs from "../../components/StBreadCrumbs/StBreadCrumbs";
import { StLoader } from "../../components/shared/StLoader/StLoader";

const StRecipe = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error: isError } = useGetRecipyByIdQuery(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {isError && <Navigate to="/error500" replace={true} />}
      {!isError && (
        <main className={styles.main_container}>
          {recipe && <StBreadCrumbs currentPage={recipe.data.title} />}
          {isLoading ? <StLoader /> : <StRecipeInfo recipe={recipe.data} />}
          <StPopularRecipes />
        </main>
      )}
    </>
  );
};

export default StRecipe;
