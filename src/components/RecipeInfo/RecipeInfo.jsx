import { useEffect, useState } from "react";
import {
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
} from "../../store/services/recipeService.js";
import st_handleFavorite from "../../utilities/st_handleFavorite.js";
import StButton from "../shared/StButton/StButton.jsx";
import style from "./StRecipeInfo.module.css";
import { StRecipeIngredients } from "./StRecipeIngredients/StRecipeIngredients";
import { StRecipeMainInfo } from "./StRecipeMainInfo/StRecipeMainInfo.jsx";
import { StRecipePreparation } from "./StRecipePreparation/StRecipePreparation.jsx";
import recipe_without_img from "../../images/recipe_without_img.jpg";
import { useSelector } from "react-redux";
import { st_selectFavoriteRecipes } from "../../store/selectors/selectors.js";
import { st_selectToken } from "../../store/features/authSlice.js";
import { StCustomModal } from "../shared/index.js";
import { StSignInForm } from "../SignIn/StSignInForm.jsx";
import { StSignUpForm } from "../SignUp/StSignUpForm.jsx";

export const StRecipeInfo = ({ recipe }) => {
  const { thumb, title, instructions, ingredients, _id } = recipe;
  const favoritesRecipe = useSelector(st_selectFavoriteRecipes);
  const [isFavorite, setIsFavorite] = useState(favoritesRecipe.includes(_id));
  const token = useSelector(st_selectToken);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSignInOpen, setModalSignInOpen] = useState(true);
  const [modalSignUpOpen, setModalSignUpOpen] = useState(false);
  const [addFavoriteRecipe] = useAddFavoriteRecipeMutation();
  const [removeFavoriteRecipe] = useRemoveFavoriteRecipeMutation();

  useEffect(() => {
    setIsFavorite(favoritesRecipe.includes(_id));
  }, [favoritesRecipe, _id]);

  const st_handleClickSignToogle = () => {
    setModalSignUpOpen(!modalSignUpOpen);
    setModalSignInOpen(!modalSignInOpen);
  };

  return (
    <section className={style.recipe_info_container}>
      <img
        className={style.recipe_img}
        src={thumb !== "[object FileList]" ? thumb : recipe_without_img}
        alt={title}
      />
      <div className={style.recipe_info_wrapper}>
        <StRecipeMainInfo data={recipe} />
        <StRecipeIngredients ingredients={ingredients} />
        <StRecipePreparation instruction={instructions} />
        {token ? (
          !isFavorite ? (
            <StButton
              text="Add to favorites"
              variant="add_favorite"
              onClick={() => st_handleFavorite(addFavoriteRecipe, _id, "add", setIsFavorite)}
            />
          ) : (
            <StButton
              text="Remove from favorites"
              variant="add_favorite"
              onClick={() => st_handleFavorite(removeFavoriteRecipe, _id, "delete", setIsFavorite)}
            />
          )
        ) : (
          <StButton
            text="Add to favorites"
            variant="add_favorite"
            onClick={() => {
              setModalIsOpen(!modalIsOpen);
            }}
          />
        )}
      </div>
      <StCustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(!modalIsOpen)}>
        {modalSignUpOpen && <StSignUpForm st_handleClickSignIn={st_handleClickSignToogle} />}
        {modalSignInOpen && <StSignInForm st_handleClickSignUp={st_handleClickSignToogle} />}
      </StCustomModal>
    </section>
  );
};
