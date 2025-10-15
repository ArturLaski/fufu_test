import { useState } from "react";
import StIconButton from "../../shared/StIconButton/StIconButton";
import styles from "./StHeaderProfile.module.css";
import styleModal from "../StHeaderModal/StHeaderModal.module.css";
import cx from "classnames";
import StHeaderProfileMenu from "./StHeaderProfileMenu";
import { useSelector } from "react-redux";
import { st_selectAvatarURL, st_selectName } from "../../../store/features/authSlice";
import { StCustomModal } from "../../shared";
import StHeaderModal from "../StHeaderModal/StHeaderModal";

const StHeaderProfile = ({ isHome, onClick }) => {
  const [toogleOpen, setToogleOpen] = useState(false);
  const [toogleModal, setToogleModal] = useState(false);
  const avatarURL = useSelector(st_selectAvatarURL);
  const name = useSelector(st_selectName);

  const st_handlerOpenProfile = () => {
    setToogleOpen(!toogleOpen);
  };

  const st_handlerToogleModal = () => {
    setToogleModal(!toogleModal);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.wrap_profile} onClick={st_handlerOpenProfile}>
        <img className={styles.img_profile} src={avatarURL} alt={name} />
        <p className={styles.name_profile}>{name}</p>
        <StIconButton
          style={cx(styles.btn_arrow, toogleOpen && styles.btn_arrow_open)}
          iconId="icon-chevron-down"
          width="18"
          height="18"
          stroke="#fff"
        />
      </div>
      {toogleOpen && (
        <StHeaderProfileMenu onClick={onClick} onClose={st_handlerOpenProfile} isHome={isHome} />
      )}

      <StIconButton
        style={styles.btn_menu}
        styleSVG={styles.icon_arrow}
        iconId="icon-mobile-menu"
        width="28"
        height="28"
        stroke={isHome ? "#fff" : "#000"}
        onClick={st_handlerToogleModal}
      />
      {toogleModal && (
        <StCustomModal
          isOpen={toogleModal}
          onClose={st_handlerToogleModal}
          customeStyles={styleModal.wrap_modal}
          btnStyle={styleModal.btn_close}
          width="28"
          height="28"
          stroke="#fff"
        >
          <StHeaderModal st_handlerToogleModal={st_handlerToogleModal} />
        </StCustomModal>
      )}
    </div>
  );
};

export default StHeaderProfile;
