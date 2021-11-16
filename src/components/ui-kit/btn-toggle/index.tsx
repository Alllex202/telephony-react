import React, {MouseEventHandler} from 'react';
import styles from './styles.module.scss';
import BtnCircleDefault from "../btn-circle-default";

type Props = {
    iconName: string,
    className?: string,
    onClick?: MouseEventHandler,
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    isActive?: boolean
}

function BtnToggle({iconName, className, onClick, iconType, isActive}: Props) {
    return (
        <BtnCircleDefault iconName={iconName} iconType={iconType}
                          className={[className, styles.btn, isActive ? styles.active : ''].join(' ')}
                          isActive={isActive} onClick={onClick}/>
    );
}

export default BtnToggle;
