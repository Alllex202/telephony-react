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

function Btn({text, iconName, iconType, iconPosition, className, onClick}: Props) {
    return (
        <BtnDefault text={text} className={[styles.btn, className ?? ''].join(' ')} onClick={onClick}
                    iconName={iconName} iconPosition={iconPosition} iconType={iconType}/>
    );
}

export default Btn;
