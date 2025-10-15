import { Link } from "react-router-dom";
import styles from "./StRecipeCard.module.css";
import cx from "classnames";
import StSectionSubtitle from "../../shared/StSectionSubtitle/StSectionSubtitle";
import StIconButton from "../../shared/StIconButton/StIconButton";
import StIcon from "../../shared/StIcon/StIcon";

import withoutAvatar from "../../../images/user_without_avatar.jpg";
import { useSelector } from "react-redux";
import { st_selectFavoriteRecipes } from "../../../store/selectors/selectors";
import { st_selectToken } from "../../../store/features/authSlice";
import {
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
} from "../../../store/services/recipeService";
import { useEffect, useState } from "react";
import st_handleFavorite from "../../../utilities/st_handleFavorite";
import { StCustomModal } from "../../shared";
import { StSignUpForm } from "../../SignUp/StSignUpForm";
import { StSignInForm } from "../../SignIn/StSignInForm";

const StRecipeCard = ({ recipe }) => {
  const { _id, title, owner, description, thumb } = recipe;

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

  const st_addToFavorites = () => {
    if (!isFavorite) {
      st_handleFavorite(addFavoriteRecipe, _id, "add", setIsFavorite);
    } else {
      st_handleFavorite(removeFavoriteRecipe, _id, "delete", setIsFavorite);
    }
  };

  return (
    <>
      <li className={cx(styles.recipeCard)}>
        <Link to={`/recipe/${_id}`}>
          <img src={thumb} alt={title} className={styles.recipeImage} />
        </Link>
        <div className={styles.textWrap}>
          <StSectionSubtitle customStyle={styles.header_card} text={title} />
          <p className={styles.recipeDescription}>{description}</p>
        </div>
        <div className={styles.avatarBtnswrap}>
          <Link to={`/user/${owner._id}`} className={cx(styles.avatarWrapper)}>
            <img
              src={owner.avatar || `${withoutAvatar}`}
              alt={`${owner.name} avatar`}
              className={styles.avatar}
            />
            <span>{owner.name}</span>
          </Link>
          <ul className={styles.iconList}>
            <li>
              {token ? (
                !isFavorite ? (
                  <StIconButton
                    style={styles.style_button_notFavorit}
                    iconId="icon-heart"
                    onClick={st_addToFavorites}
                  />
                ) : (
                  <StIconButton
                    style={styles.style_button_favorit}
                    stroke="#FFF"
                    iconId="icon-heart"
                    onClick={st_addToFavorites}
                  />
                )
              ) : (
                <StIconButton
                  style={styles.style_button_notFavorit}
                  iconId="icon-heart"
                  onClick={() => {
                    setModalIsOpen(!modalIsOpen);
                  }}
                />
              )}
            </li>
            <li>
              <Link to={`/recipe/${_id}`} className={styles.iconWrapper}>
                <StIcon iconId="icon-arrow-up-right" />
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <StCustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(!modalIsOpen)}>
        {modalSignUpOpen && <StSignUpForm st_handleClickSignIn={st_handleClickSignToogle} />}
        {modalSignInOpen && <StSignInForm st_handleClickSignUp={st_handleClickSignToogle} />}
      </StCustomModal>
    </>
  );
};

export default StRecipeCard;
