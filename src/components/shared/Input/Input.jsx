import styles from "./StInput.module.css";
import StIcon from "../StIcon/StIcon.jsx";
import cx from "classnames";

export const StInput = ({
  placeholder,
  iconId,
  type,
  st_togglePasswordVisibility,
  register,
  name,
  hasText,
  width,
  classname,
}) => {
  const st_handleClickEye = () => {
    st_togglePasswordVisibility();
  };

  if (!iconId)
    return (
      <input
        className={cx(styles.input, classname, `${hasText ? styles.hasText : ""}`)}
        placeholder={placeholder}
        type={type}
        {...register(name, { required: true })}
      />
    );

  return (
    <div className={styles.container}>
      <input
        className={cx(styles.input, classname, `${hasText ? styles.hasText : ""}`)}
        placeholder={placeholder}
        type={type}
        {...register(name)}
      />
      {iconId && (
        <button className={styles.btn} onClick={st_handleClickEye} type="button">
          <StIcon iconId={iconId} width={width} height={width} />
        </button>
      )}
    </div>
  );
};
