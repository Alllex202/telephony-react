import React, {ReactNode} from 'react';
import styles from './styles.module.scss';
import {classNames} from "shared/utils";

type Props = {
    className?: string,
    children?: ReactNode,
    isActive?: boolean,
};

function Card({children, className, isActive}: Props) {
    return (
        <div className={classNames(styles.card, className, isActive ? styles.active : '', 'card')}>
            <div className={classNames(styles.border, 'card-border')}/>
            <div
                className={classNames(styles.border_active, 'card-border-active')}/>
            <div className={classNames(styles.content, 'card-content')}>
                {children}
            </div>
        </div>
    );
}

export default Card;
