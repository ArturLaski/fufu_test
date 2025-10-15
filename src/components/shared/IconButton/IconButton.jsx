import styles from "./StIconButton.module.css";
import cx from "classnames";

import StIcon from "../StIcon/StIcon";

const StIconButton = ({
  onClick = () => {},
  type = "button",
  style,
  styleSVG,
  iconId,
  width = "16",
  height = "16",
  stroke = "#000",
}) => {
  return (
    <button type={type} className={cx(styles.button, style)} onClick={onClick}>
      <StIcon iconId={iconId} width={width} height={height} customStyle={styleSVG} stroke={stroke} />
    </button>
  );
};

export default StIconButton;
