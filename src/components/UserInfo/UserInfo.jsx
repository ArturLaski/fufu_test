import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import StIconButton from "../shared/StIconButton/StIconButton";
import styles from "./StUserInfo.module.css";
import { nanoid } from "@reduxjs/toolkit";
import { StUserInfoItem } from "./StUserInfoItem";
import withoutAvatar from "../../images/user_without_avatar.jpg";
import { st_selectIsAuthorizedUser, st_selectUserProfile } from "../../store/selectors/profileSelectors";
import { useUpdateUserAvatarMutation } from "../../store/services/profileService";
import {getAvatarURL} from "../../store/features/authSlice.js";

export const StUserInfo = () => {
  const isOwnProfile = useSelector(st_selectIsAuthorizedUser);
  const [updateUserAvatar] = useUpdateUserAvatarMutation();
  const data = useSelector(st_selectUserProfile);
  const dispatch = useDispatch();

  const dataKeys = data ? Object.keys(data) : [];

  const [avatar, setAvatar] = useState(data?.avatar || withoutAvatar);

  const st_handleAvatarUpdate = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await updateUserAvatar(formData).unwrap();
      setAvatar(response.avatarURL);
      dispatch(getAvatarURL(response.avatarURL));
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const st_handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        st_handleAvatarUpdate(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const fileInputRef = useRef(null);
  const [iconSize, setIconSize] = useState({ width: 16, height: 16 });
  const st_handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setAvatar(data?.avatar || withoutAvatar);
  }, [data?.avatar]);

  useEffect(() => {
    const st_updateIconSize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setIconSize({ width: 16, height: 16 });
      } else {
        setIconSize({ width: 18, height: 18 });
      }
    };

    st_updateIconSize();
    window.addEventListener("resize", st_updateIconSize);

    return () => {
      window.removeEventListener("resize", st_updateIconSize);
    };
  }, []);

  return (
    <div className={styles.profile_card_wrapper}>
      <div className={styles.profile_card}>
        <img
          className={styles.profile_photo}
          src={avatar}
          alt={`${data?.name || "StUser Name"} avatar`}
        />

        {isOwnProfile && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={st_handleFileChange}
            />
            <StIconButton
              iconId="icon-plus"
              style={styles.profile_big_card_button}
              styleSVG={styles.profile_big_card_icon}
              stroke={"#FFF"}
              width={iconSize.width}
              height={iconSize.height}
              onClick={st_handleButtonClick}
            />
          </>
        )}

        <h3 className={styles.profile_name}>{data?.name}</h3>

        <ul className={styles.profile_info}>
          {dataKeys.map((dataKey) => {
            if (dataKey === "_id" || dataKey === "name" || dataKey === "avatar") {
              return;
            }
            return <StUserInfoItem key={nanoid()} name={dataKey} value={data[dataKey]} />;
          })}
        </ul>
      </div>
    </div>
  );
};
