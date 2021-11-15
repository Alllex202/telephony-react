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
}

function BtnTransparent({text, iconName, iconType, iconPosition, className, onClick}: Props) {
    return (
        <BtnDefault className={[styles.btn, className ?? ''].join(' ')} text={text} iconName={iconName}
                    onClick={onClick} iconType={iconType} iconPosition={iconPosition}/>
    );
}

export default BtnTransparent;
