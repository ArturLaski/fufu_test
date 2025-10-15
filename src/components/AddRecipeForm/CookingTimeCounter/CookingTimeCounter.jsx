import StIconButton from "../../shared/StIconButton/StIconButton";
import styles from "./StCookingTimeCounter.module.css";

const StCookingTimeCounter = ({ cookingTime, setCookingTime }) => {
  const st_incrementCookingTime = () => {
    setCookingTime((prevTime) => prevTime + 10);
  };

  const st_decrementCookingTime = () => {
    setCookingTime((prevTime) => (prevTime > 10 ? prevTime - 10 : 10));
  };

  return (
    <div>
      <label>Cooking Time</label>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <StIconButton
          iconId="icon-minus"
          width="16"
          height="16"
          type="button"
          style={styles.iconBtn}
          styleSVG={styles.icon}
          onClick={st_decrementCookingTime}
        />

        <div>
          <span style={{ margin: "0 12px" }}>{cookingTime} min</span>
        </div>

        <StIconButton
          iconId="icon-plus"
          type="button"
          width="16"
          height="16"
          style={styles.iconBtn}
          styleSVG={styles.icon}
          onClick={st_incrementCookingTime}
        />
      </div>
    </div>
  );
};

export default StCookingTimeCounter;
