import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import styles from "./StSignInForm.module.css";

import { sinInSchema } from "./SignInSchema.js";
import { useLoginMutation } from "../../store/services/authService.js";
import { useStResponsiveValue } from "../../utilities/index.js";
import { StButton, StInput, StModalTitle } from "../shared";
import { getUser } from "../../store/features/authSlice.js";
import { StLoader } from "../shared/StLoader/StLoader.jsx";

const customId = "toastId";

export const StSignInForm = ({ st_handleClickSignUp }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(sinInSchema),
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [data, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const st_togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    const subscription = watch((value) => setValueInput(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const widthIconEye = useStResponsiveValue(768, "20", "18");

  const onSubmit = async (user) => {
    try {
      const result = await data(user);
      if (result.error) {
        toast.error(result.error.data.message, {
          toastId: customId,
        });
      } else {
        dispatch(getUser(result.data));
        toast.success("Sign in successful", {
          toastId: customId,
        });
        reset();
      }
    } catch (error) {
      toast.error(error.message, {
        toastId: customId,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <StLoader />
      ) : (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <StModalTitle text={"SIGN IN"} />
          <ul className={styles.list}>
            <li className={styles.item}>
              <StInput
                placeholder={"Email*"}
                type={"email"}
                register={register}
                name="email"
                hasText={valueInput.email?.length > 0}
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </li>
            <li className={styles.item}>
              <StInput
                placeholder={"Password"}
                type={showPassword ? "text" : "password"}
                iconId={showPassword ? "icon-eye" : "icon-eye-off"}
                st_togglePasswordVisibility={st_togglePasswordVisibility}
                register={register}
                name="password"
                hasText={valueInput.password?.length > 0}
                width={widthIconEye}
              />
              {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </li>
          </ul>
          <StButton type="submit" text="SIGN IN" variant={"ripple"} id={"signIn"} />
          <p className={styles.text}>
            {"Don't have an account? "}
            <button type="button" className={styles.link} onClick={st_handleClickSignUp}>
              Create an account
            </button>
          </p>
        </form>
      )}
    </>
  );
};
