import React, {MouseEventHandler} from 'react';
import styles from './styles.module.scss';
import BtnDefault from "../btn-default";

type Props = {
    text: string,
    iconName?: string,
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    iconPosition?: 'start' | 'end',
    className?: string,
    onClick?: MouseEventHandler,
    isActive?: boolean,
}

function BtnSecond({text, iconName, iconType, iconPosition, className, onClick, isActive}: Props) {
    return (
        <BtnDefault className={[styles.btn, isActive ? styles.active : '', className ?? ''].join(' ')} text={text} iconName={iconName}
                    onClick={onClick} iconType={iconType} iconPosition={iconPosition}/>
    );
}

export default BtnSecond;
