import React, {MouseEventHandler} from 'react';
import styles from './styles.module.scss';
import Icon from '../icon';

type Props = {
    iconName: string,
    className?: string,
    onClick?: MouseEventHandler,
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    isActive?: boolean
}

function BtnToggle({iconName, className, onClick, iconType, isActive}: Props) {
    return (
        <>
            <button className={[styles.btn, isActive ? styles.active : '', className].join(' ')} onClick={onClick}>
                <Icon name={iconName} type={iconType}/>
            </button>
        </>
    );
}

export default BtnToggle;
