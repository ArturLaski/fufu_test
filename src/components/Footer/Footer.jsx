import { NavLink } from "react-router-dom";
import StIcon from "../shared/StIcon/StIcon";
import styles from "./StFooter.module.css";

const StFooter = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.wrap_footer}>
        <NavLink className={styles.logo} href="/" aria-label="Logo SavorTrail">
          <p>SavorTrail</p>
        </NavLink>
        <ul className={styles.list_social}>
          <li className={styles.item_social}>
            <a href="https://www.facebook.com/goITclub/" target="_blank">
              <StIcon iconId="icon-facebook" width="20" height="20" customStyle={styles.icon} />
            </a>
          </li>
          <li className={styles.item_social}>
            <a href="https://www.instagram.com/goitclub/" target="_blank">
              <StIcon iconId="icon-instagram" width="20" height="20" customStyle={styles.icon} />
            </a>
          </li>
          <li className={styles.item_social}>
            <a href="https://www.youtube.com/c/GoIT" target="_blank">
              <StIcon iconId="icon-youtube" width="20" height="20" customStyle={styles.icon} />
            </a>
          </li>
        </ul>
      </div>
      <p className={styles.copr}>@2024, SavorTrail. All rights reserved</p>
    </footer>
  );
};

export default StFooter;
