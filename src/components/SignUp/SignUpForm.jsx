import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import styles from "./StSignUpForm.module.css";

import { StButton, StInput, StModalTitle } from "../shared";
import { sinUpSchema } from "./SignUpSchema.js";
import { useStResponsiveValue } from "../../utilities/index.js";
import { getUser } from "../../store/features/authSlice.js";
import { StLoader } from "../shared/StLoader/StLoader.jsx";
import {BASE_URL} from "../../utilities/const.js";

const customId = "toastId";

export const StSignUpForm = ({ st_handleClickSignIn }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sinUpSchema),
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const st_togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    const subscription = watch((value) => {
      setValueInput(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const widthIconEye = useStResponsiveValue(768, "20", "18");

  const onSubmit = async (user) => {
    try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}api/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorData = await response.json();
              toast.error(errorData, {
                toastId: customId,
              });
              return
        }

        const result = await response.json();
        dispatch(getUser(result.user))
          toast.success("Sign Up successful", {
            toastId: customId,
          });

    } catch (error) {
      toast.error(error.message, {
        toastId: customId,
      });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <StLoader />
      ) : (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <StModalTitle text={"Sign Up"} />
          <ul className={styles.list}>
            <li className={styles.item}>
              <StInput
                placeholder={"Name*"}
                type={"text"}
                register={register}
                name="name"
                hasText={valueInput.name?.length > 0}
                watch={watch}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </li>
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
          <StButton type="submit" text="CREATE" variant={"ripple"} id={"signUp"} />
          <p className={styles.text}>
            I already have an account?{" "}
            <button className={styles.link} onClick={st_handleClickSignIn}>
              Sign in
            </button>
          </p>
        </form>
      )}
    </>
  );
};
