import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

import styles from './StLogOut.module.css';
import StModalTitle from "../shared/StModalTitle/StModalTitle.jsx";
import {useLogoutMutation} from "../../store/services/authService.js";
import {clearToken} from "../../store/features/authSlice.js";
import {useStResponsiveValue} from "../../utilities/index.js";
import {StButton} from "../shared";
import {StLoader} from "../shared/StLoader/StLoader.jsx";

export const StLogOut = ({setModalLogOutOpen}) => {
    const {handleSubmit} = useForm();
    const [data, {isLoading}] = useLogoutMutation();
    const dispatch = useDispatch();

    const modalTitleText = useStResponsiveValue(768, 'Log Out', 'Are you logging out?');

    const onSubmit = async () => {
        setModalLogOutOpen(false);
        await data();
        dispatch(clearToken())
       
    };
    return (
        <>
        {isLoading
            ? <StLoader/>
            : <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
                <StModalTitle text={modalTitleText}/>
                <p className={styles.text}>
                    You can always log back in at any time.
                </p>
                <ul className={styles.list}>
                    <StButton
                        type="submit"
                        text="Log out"
                        variant={'log_follow'}/>
                    <StButton
                        type="button"
                        text="Cancel"
                        variant={'log_cancel'}
                        onClick={() => setModalLogOutOpen(false)}/>
                </ul>
            </form>
        }
        </>

)}