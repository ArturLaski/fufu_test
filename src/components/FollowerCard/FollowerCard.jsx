import StButton from "../shared/StButton/StButton";
import StIconButton from "../shared/StIconButton/StIconButton";
import styles from "./StFollowerCard.module.css";
import StSmallRecipePhoto from "../StSmallRecipePhoto/StSmallRecipePhoto.jsx";
import { useStResponsiveValue } from "../../utilities/index.js";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { st_selectId } from "../../store/features/authSlice.js";

const StFollowerCard = ({ data, tab, st_handleFollowUser, st_handleUnfollowUser }) => {
  const recipeCardsVisability = useStResponsiveValue(768, false, 3);
  const recipeCardsQuantity = useStResponsiveValue(1440, 3, 4);
  const authUserId = useSelector(st_selectId);

  const st_btnText = () => {
    if (tab === "followers") {
      return data.isFollowing ? "unfollow" : "follow";
    }

    if (tab === "following") {
      return "unfollow";
    }
  };

  return (
    <li className={styles.cardWrapper}>
      <div className={styles.followerData}>
        <img
          src={
            data.avatarURL ||
            "https://gravatar.com/avatar/000000000000000000000000000000000000000000000000000000?d=mp"
          }
          className={styles.smallProfilePhoto}
          alt="StUser avatar"
        />

        <div>
          <h5 className={styles.name}> {data.name.split(" ")[0]}</h5>
          <p className={styles.descr}>Own recipes: {data.totalRecipes}</p>
          <StButton
            disabled={data._id === authUserId}
            text={st_btnText()}
            variant="follow_user"
            onClick={() =>
              st_btnText() === "follow" ? st_handleFollowUser(data._id) : st_handleUnfollowUser(data._id)
            }
          />
        </div>
      </div>
      {recipeCardsVisability && (
        <ul className={styles.recipesList}>
          {data?.recipes?.map((recipe, idx) => {
            if (idx < recipeCardsQuantity) {
              return (
                <li key={recipe._id}>
                  <StSmallRecipePhoto imgUrl={recipe.thumb} title={recipe.title} />
                </li>
              );
            }
          })}
        </ul>
      )}
      <NavLink to={`/user/${data._id}`} className={styles.link_wrapper}>
        <StIconButton
          iconId="icon-arrow-up-right"
          style={styles.iconBtn}
          styleSVG={styles.icon}
        ></StIconButton>
      </NavLink>
    </li>
  );
};

export default StFollowerCard;
