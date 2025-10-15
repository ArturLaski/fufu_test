import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import styles from './StTestimonialCard.module.css'

import {st_useResponsiveValue} from "../../utilities/index.js";
import {StIcon } from "../shared";

export const StTestimonialCard = ({text, name}) => {

    const widthIcon = st_useResponsiveValue('768', '40', '60');
    const heightIcon = st_useResponsiveValue('768', '32', '48');

    return (
        <div className={styles.container}>
            <div className={styles.container_svg} >
                <StIcon iconId={'icon-quote'} width={widthIcon} height={heightIcon}/>
            </div>
            <SimpleBar style={{ maxHeight: 121, paddingRight: '10px'}}>
                <p className={styles.tastimonial}>{text}</p>
            </SimpleBar>
            <p className={styles.name}>{name}</p>
        </div>
    )
}