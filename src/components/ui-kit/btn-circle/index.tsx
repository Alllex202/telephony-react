import React, {MouseEventHandler} from 'react';
import styles from "./styles.module.scss";
import BtnCircleDefault from "../btn-circle-default";
import {classNames} from "../../../shared/utils";

type Props = {
    iconName: string,
    className?: string,
    onClick?: MouseEventHandler,
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    isActive?: boolean,
    activeStyle?: string
}

function BtnCircle({className, iconName, iconType, onClick, isActive, activeStyle}: Props) {
    return (
        <BtnCircleDefault iconName={iconName} iconType={iconType}
                          className={classNames(className, styles.btn)}
                          isActive={isActive} onClick={onClick} activeStyle={activeStyle || styles.active}/>
    );
}

export default BtnCircle;
