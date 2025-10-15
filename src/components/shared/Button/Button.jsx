import styles from "./StButton.module.css";
import cx from "classnames";
import { useEffect } from "react";
import StIcon from "../StIcon/StIcon";

const StButton = ({
  disabled = false,
  text = "StButton",
  onClick = () => {},
  variant = "button",
  type = "button",
  classname,
  id,
  iconId,
  iconWidth = "20",
  iconHeight = "20",
  stroke = "var(--black)",
  iconStyle,
}) => {
  useEffect(() => {
    if (id) {
      const btn = document.querySelector(`#${id}`);
      if (btn) {
        const st_updateCoordinates = (x, y) => {
          const rect = btn.getBoundingClientRect();
          const relativeX = x - rect.left;
          const relativeY = y - rect.top;
          btn.style.setProperty("--x", `${relativeX}px`);
          btn.style.setProperty("--y", `${relativeY}px`);
        };

        const onMouseMove = (e) => {
          st_updateCoordinates(e.clientX, e.clientY);
        };

        const onTouchMove = (e) => {
          if (e.touches.length > 0) {
            const touch = e.touches[0];
            st_updateCoordinates(touch.clientX, touch.clientY);
          }
        };

        btn.addEventListener("mousemove", onMouseMove);
        btn.addEventListener("touchmove", onTouchMove);

        return () => {
          btn.removeEventListener("mousemove", onMouseMove);
          btn.removeEventListener("touchmove", onTouchMove);
        };
      }
    }
  }, [id]);

  return (
    <button
      type={type}
      className={cx(styles.button, styles[variant], classname)}
      onClick={onClick}
      id={id}
      disabled={disabled}
    >
      {text}
      {iconId && (
        <StIcon
          iconId={iconId}
          width={iconWidth}
          height={iconHeight}
          stroke={stroke}
          customStyle={iconStyle}
        />
      )}
    </button>
  );
};

export default StButton;
