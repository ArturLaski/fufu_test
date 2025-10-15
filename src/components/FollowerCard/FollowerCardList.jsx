import StFollowerCard from "./StFollowerCard.jsx";
import styles from "./StFollowerCard.module.css";

const StFollowerCardList = ({ data, tab, st_handleFollowUser, st_handleUnfollowUser }) => {
  return (
    <ul className={styles.followerCardList}>
      {data.map((el) => (
        <StFollowerCard
          key={el._id}
          data={el}
          tab={tab}
          st_handleFollowUser={st_handleFollowUser}
          st_handleUnfollowUser={st_handleUnfollowUser}
        />
      ))}
    </ul>
  );
};

export default StFollowerCardList;
