import React, {MouseEventHandler} from 'react';
import Icon from '../icon';
import styles from './styles.module.scss';
import {classNames} from 'shared/utils';

type Props = {
    text: string,
    iconName?: string,
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    iconPosition?: 'start' | 'end',
    className?: string,
    onClick?: MouseEventHandler,
    disabled?: boolean,
}

function BtnDefault({text, iconName, iconType, iconPosition, className, onClick, disabled}: Props) {
    return (
        <button className={classNames(styles.btn, iconPosition === 'end' ? styles.reverse : '', className ?? '')}
                onClick={onClick} disabled={disabled}>
            {iconName &&
            <Icon name={iconName} type={iconType} className={classNames(styles.icon, styles.icon_custom, 'icon')}/>}
            <div className={classNames(styles.text, 'text')}>{text}</div>
        </button>
    );
}

export default BtnDefault;
