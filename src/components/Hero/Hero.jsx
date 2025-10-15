import styles from "./StHero.module.css";
import cx from "classnames";
import { st_selectToken } from "../../store/features/authSlice.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StButton, StCustomModal } from "../shared/index.js";
import { useState } from "react";
import { StSignInForm, StSignUpForm } from "src/components";

const StHero = () => {
  const token = useSelector(st_selectToken);
  const navigate = useNavigate();
  const [active, setActive] = useState("signIn");
  const [modalSignUpOpen, setModalSignUpOpen] = useState(false);
  const [modalSignInOpen, setModalSignInOpen] = useState(false);

  const st_handleClickSignUp = () => {
    setActive("signUp");
    setModalSignUpOpen(true);
  };

  const st_handleClickSignIn = () => {
    setActive("signIn");
    setModalSignInOpen(true);
  };

  const st_handleCloseSignUp = () => setModalSignUpOpen(false);
  const st_handleCloseSignIn = () => setModalSignInOpen(false);

  const st_handlerClick = () => {
    if (!token) {
      st_handleClickSignIn();
    } else {
      navigate("/recipe/add");
    }
  };

  return (
    <section className={styles.wrap_hero}>
      <h1 className={styles.title}>Improve Your Culinary Talents</h1>
      <p className={styles.subtitle}>
        Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
        tastes of various cuisines.
      </p>
      <StButton
        text="Add recipe"
        type="button"
        onClick={st_handlerClick}
        classname={styles.link_btn_hero}
      />
      {active === "signIn" ? (
        <StCustomModal isOpen={modalSignInOpen} onClose={st_handleCloseSignIn}>
          <StSignInForm st_handleClickSignUp={st_handleClickSignUp} st_handleCloseSignIn={st_handleCloseSignIn} />
        </StCustomModal>
      ) : (
        <StCustomModal isOpen={modalSignUpOpen} onClose={st_handleCloseSignUp}>
          <StSignUpForm st_handleClickSignIn={st_handleClickSignIn} st_handleCloseSignUp={st_handleCloseSignUp}  />
        </StCustomModal>
      )}

      <div className={styles.wrap_img_hero}>
        <div className={cx(styles.smole_img, styles.img_general)}></div>
        <div className={cx(styles.big_img, styles.img_general)}></div>
      </div>
    </section>
  );
};

export default StHero;
