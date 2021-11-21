import React, {MouseEventHandler} from 'react';
import Icon from "../icon";
import styles from './styles.module.scss';
import {classNames} from "../../../shared/utils";

type Props = {
    text: string,
    iconName?: string,
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    iconPosition?: 'start' | 'end',
    className?: string,
    onClick?: MouseEventHandler,
}

function BtnDefault({text, iconName, iconType, iconPosition, className, onClick}: Props) {
    return (
        <button className={classNames(styles.btn, iconPosition === 'end' ? styles.reverse : '', className ?? '')}
                onClick={onClick}>
            {iconName &&
            <Icon name={iconName} type={iconType} className={[styles.icon, styles.icon_custom].join(' ')}/>}
            <div className={styles.text}>{text}</div>
        </button>
    );
}

export default BtnDefault;
