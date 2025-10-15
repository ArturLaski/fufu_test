import { st_toCapitalize } from "../../utilities/st_toCapitalize";
import styles from "./StUserInfo.module.css";

export const StUserInfoItem = ({ name, value }) => {
  const CONSTANTS_NAME = {
    email: "email",
    createdRecipesCount: "added recipes",
    favoriteRecipesCount: "favorites",
    followersCount: "followers",
    followingCount: "following",
  };

  return (
    <li className={styles.profile_info_item}>
      {st_toCapitalize(CONSTANTS_NAME[name])}:
      <span className={styles.profile_info_content}>{value}</span>
    </li>
  );
};
