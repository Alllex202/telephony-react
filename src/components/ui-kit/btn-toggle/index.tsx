import React, {MouseEventHandler} from 'react';
import styles from './styles.module.scss';
import BtnCircleDefault from '../btn-circle-default';
import {classNames} from 'shared/utils';

type Props = {
    iconName: string,
    className?: string,
    onClick?: MouseEventHandler,
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    isActive?: boolean,
    activeStyle?: string,
}

function BtnToggle({iconName, className, onClick, iconType, isActive, activeStyle}: Props) {
    return (
        <BtnCircleDefault iconName={iconName} iconType={iconType}
                          className={classNames(className, styles.btn)}
                          isActive={isActive} onClick={onClick} activeStyle={activeStyle || styles.active}/>
    );
}

export default BtnToggle;
