import StSmallRecipeCard from "./StSmallRecipeCard";
import styles from "./StSmallRecipeCard.module.css";

const StSmallRecipeCardList = ({ data, tab }) => {
  return (
    <ul className={styles.recipeCardList}>
      {data.map((el) => (
        <StSmallRecipeCard key={el._id} data={el} tab={tab} />
      ))}
    </ul>
  );
};

export default StSmallRecipeCardList;
