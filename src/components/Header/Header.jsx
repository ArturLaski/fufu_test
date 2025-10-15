import { useSelector } from "react-redux";
import cx from "classnames";
import { useState } from "react";
import styles from "./StHeader.module.css";
import stylesFromFooter from "../StFooter/StFooter.module.css";
import StAuthToggle from "../shared/StAuthToggle/StAuthToggle";
import { st_selectToken } from "../../store/features/authSlice.js";
import { StCustomModal } from "../shared";
import { StLogOut } from "src/components";
import StHeaderProfile from "./StHeaderProfile";
import { NavLink, useLocation } from "react-router-dom";
import StHeaderNav from "./StHeaderNav";

const StHeader = () => {
  const [modalLogOutOpen, setModalLogOutOpen] = useState(false);
  const token = useSelector(st_selectToken);
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname.split("/")[1] === "category";
  const styleWhite = isHome && styles.color_white;
  return (
    <header className={cx(styles.header_wrap, !isHome && styles.header_wrap_bgc)}>
      <NavLink className={cx(stylesFromFooter.logo, styleWhite)} to="/" aria-label="Logo SavorTrail">
        <p>SavorTrail</p>
      </NavLink>
      {token && <StHeaderNav isHome={isHome} />}
      {token ? (
        <StHeaderProfile onClick={() => setModalLogOutOpen(true)} isHome={isHome} />
      ) : (
        <StAuthToggle />
      )}
      <StCustomModal isOpen={modalLogOutOpen} onClose={() => setModalLogOutOpen(false)}>
        <StLogOut setModalLogOutOpen={setModalLogOutOpen} />
      </StCustomModal>
    </header>
  );
};

export default StHeader;
