import React from 'react';
import styles from "./styles.module.scss";
import Icon from "../icon";

type Props = {
    iconName: string,
    className?: string,
    onClick?: React.MouseEventHandler,
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    isActive?: boolean,
}

function BtnCircleDefault({className,iconName,iconType, onClick, isActive}: Props) {
    return (
        <button className={[styles.btn, className, isActive ? styles.active : ''].join(' ')} onClick={onClick}>
            <Icon name={iconName} type={iconType}/>
        </button>
    );
}

export default BtnCircleDefault;

