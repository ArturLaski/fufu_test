import { useState } from "react";
import cx from "classnames";
import styles from "./StAuthToggle.module.css";

import { StButton, StCustomModal } from "../index.js";
import { StSignInForm, StSignUpForm } from "src/components";

const StAuthToggle = () => {
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

  return (
    <>
      <div
        className={`${styles.toggleContainer} ${
          styles[active === "signIn" ? "signInActive" : "signUpActive"]
        }`}
      >
        <div className={styles.slider}></div>
        <StButton
          text="SIGN IN"
          classname={cx(styles.toggleButton, styles.signIn)}
          onClick={st_handleClickSignIn}
        />

        <StButton
          text="SIGN UP"
          classname={cx(styles.toggleButton, styles.signUp)}
          onClick={st_handleClickSignUp}
        />
      </div>
      {active === "signIn" ? (
        <StCustomModal isOpen={modalSignInOpen} onClose={st_handleCloseSignIn}>
          <StSignInForm st_handleClickSignUp={st_handleClickSignUp} st_handleCloseSignIn={st_handleCloseSignIn}/>
        </StCustomModal>
      ) : (
        <StCustomModal isOpen={modalSignUpOpen} onClose={st_handleCloseSignUp}>
          <StSignUpForm st_handleClickSignIn={st_handleClickSignIn} st_handleCloseSignUp={st_handleCloseSignUp} />
        </StCustomModal>
      )}
    </>
  );
};

export default StAuthToggle;
