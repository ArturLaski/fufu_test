import { useDispatch, useSelector } from "react-redux";
import StSmallRecipePhoto from "../StSmallRecipePhoto/StSmallRecipePhoto";
import StIconButton from "../shared/StIconButton/StIconButton";
import styles from "./StSmallRecipeCard.module.css";
import { st_selectIsAuthorizedUser, st_selectRecipes } from "../../store/selectors/profileSelectors.js";
import { NavLink } from "react-router-dom";
import st_handleFavorite from "../../utilities/st_handleFavorite.js";
import {
  useRemoveFavoriteRecipeMutation,
  useRemoveRecipeMutation,
} from "../../store/services/recipeService.js";
import { st_selectFavoriteRecipes } from "../../store/selectors/selectors.js";
import { setFavoriteRecipes } from "../../store/features/favoriteRecipesSlice.js";
import { setUserAddedRecipes } from "../../store/features/profileSlice.js";

const StSmallRecipeCard = ({ data, tab }) => {
  const dispatch = useDispatch();
  const favoritesRecipe = useSelector(st_selectFavoriteRecipes);
  const recipes = useSelector(st_selectRecipes);
  const isAuthorizedUser = useSelector(st_selectIsAuthorizedUser);
  const [removeFavoriteRecipe] = useRemoveFavoriteRecipeMutation();
  const [removeRecipe] = useRemoveRecipeMutation();

  const st_deleteRecipe = () => {
    if (tab === "recipe") {
      dispatch(setUserAddedRecipes(recipes.filter((el) => el._id !== data._id)));
      removeRecipe(data._id);
    } else {
      dispatch(setFavoriteRecipes(favoritesRecipe.filter((el) => el !== data._id)));
      st_handleFavorite(removeFavoriteRecipe, data._id, "delete");
    }
  };

  return (
    <li className={styles.recipeCardWrapper}>
      <div className={styles.flexPhotoWrapper}>
        <StSmallRecipePhoto imgUrl={data.thumb} title={data.title} />
        <div className={styles.recipeTextWrapper}>
          <h5 className={styles.recipeTitle}> {data.title} </h5>
          <p className={styles.recipeInstructions}>{data.instructions}</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <NavLink to={`/recipe/${data._id}`}>
          <StIconButton
            iconId="icon-arrow-up-right"
            style={styles.iconBtn}
            styleSVG={styles.icon}
          ></StIconButton>
        </NavLink>
        {isAuthorizedUser && (
          <StIconButton
            iconId="icon-trash"
            onClick={st_deleteRecipe}
            style={styles.iconBtn}
            styleSVG={styles.icon}
          />
        )}
      </div>
    </li>
  );
};

export default StSmallRecipeCard;
