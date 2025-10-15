import Modal from "react-modal";
import styles from "./StCustomModal.module.css";
import { StIcon } from "../index.js";
import cx from "classnames";

export const StCustomModal = ({
  isOpen,
  onClose,
  children,
  customeStyles = "",
  btnStyle = "",
  width = "24",
  height = "24",
  stroke = "#000",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      className={cx(styles.content, customeStyles)}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
      closeTimeoutMS={250}
      onRequestClose={() => onClose()}
      bodyOpenClassName={styles.block_scroll}
    >
      <button className={cx(styles.btn, btnStyle)} type="button" onClick={() => onClose()}>
        <StIcon iconId={"icon-close-btn"} width={width} height={height} stroke={stroke} />
      </button>

      {children}
    </Modal>
  );
};
