import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetchUserProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useFetchCurrentUserProfileQuery,
} from "../../store/services/profileService";
import { getUserProfile, setCurrentAuthUser } from "../../store/features/profileSlice";
import StTabContent from "../../components/StTabContent/StTabContent";
import styles from "./StUser.module.css";
import { toast } from "react-toastify";
import { StUserInfo } from "../../components/StUserInfo/StUserInfo";
import { StButton, StCustomModal, StSectionTitle } from "../../components/shared";
import StBreadCrumbs from "../../components/StBreadCrumbs/StBreadCrumbs";
import { StLogOut } from "../../components";
import { st_selectIsAuthorizedUser } from "../../store/selectors/profileSelectors";
import { st_selectId } from "../../store/features/authSlice";

const customId = "toastId";

const StUser = () => {
  const myId = useSelector(st_selectId);
  const [modalLogOutOpen, setModalLogOutOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const isAuthorizedUser = useSelector(st_selectIsAuthorizedUser);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: profileData, error: profileError } = useFetchUserProfileQuery(id);
  const { data: currentUser } = useFetchCurrentUserProfileQuery();

  const [followUser, { error: followError }] = useFollowUserMutation();
  const [unfollowUser, { error: unfollowError }] = useUnfollowUserMutation();

  const st_handleFollowUser = (userId) => {
    followUser(userId);
    if (followError) {
      toast.error("Something went wrong", {
        toastId: customId,
      });
      return;
    }

    dispatch(
      setCurrentAuthUser({
        ...currentUser,
        following: [...currentUser.following, userId],
      })
    );

    toast.success("Follow successful", {
      toastId: customId,
    });
  };

  const st_handleUnfollowUser = (userId) => {
    unfollowUser(userId);
    if (unfollowError) {
      toast.error("Something went wrong", {
        toastId: customId,
      });
      return;
    }

    dispatch(
      setCurrentAuthUser({
        ...currentUser,
        following: currentUser.following.filter((followingUserId) => followingUserId !== userId),
      })
    );

    toast.success("Unfollow successful", {
      toastId: customId,
    });
  };

  useEffect(() => {
    if (id !== myId && currentUser && currentUser.following) {
      const isUserFollowing = currentUser.following.some(
        (followingUserId) => followingUserId === id
      );
      setIsFollowing(isUserFollowing);
    }
  }, [currentUser, id, myId]);

  useEffect(() => {
    if (currentUser) {
      dispatch(setCurrentAuthUser(currentUser));
    }
    if (profileData) {
      dispatch(getUserProfile(profileData));
    }
  }, [profileData, currentUser, dispatch]);

  if (profileError) {
    toast.error(profileError.data.message, {
      toastId: customId,
    });
    return;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.breadscrumbs}>
          <StBreadCrumbs currentPage={"Profile"} />
        </div>
        <div className={styles.title}>
          <StSectionTitle text={"Profile"} />
        </div>
        <p className={styles.subtitle}>
          Reveal your culinary art, share your favorite recipe and create <br />
          gastronomic masterpieces with us.
        </p>
        <div className={styles.userInfoAndTabContentWerapper}>
          <div className={styles.userInfoAndBtnWrapper}>
            <StUserInfo />
            {isAuthorizedUser ? (
              <StButton
                type={"button"}
                variant={"logoutOrFollowBtn"}
                text={"Log Out"}
                onClick={() => setModalLogOutOpen(true)}
              />
            ) : (
              <StButton
                type={"button"}
                variant={"logoutOrFollowBtn"}
                text={isFollowing ? "Unfollow" : "Follow"}
                onClick={isFollowing ? () => st_handleUnfollowUser(id) : () => st_handleFollowUser(id)}
              />
            )}
          </div>

          <StTabContent st_handleFollowUser={st_handleFollowUser} st_handleUnfollowUser={st_handleUnfollowUser} />
        </div>
      </div>

      <StCustomModal isOpen={modalLogOutOpen} onClose={() => setModalLogOutOpen(false)}>
        <StLogOut setModalLogOutOpen={setModalLogOutOpen} />
      </StCustomModal>
    </>
  );
};

export default StUser;
