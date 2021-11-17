import React, {ReactNode} from 'react';
import styles from './styles.module.scss';
import {classNames} from "../../../shared/utils/class-names";

type Props = {
    className?: string,
    children?: ReactNode,
};

function Card({children, className}: Props) {
    return (
        <div className={classNames(styles.card, className, 'card')}>
            <div className={classNames(styles.border, 'card-border')}/>
            <div className={classNames(styles.border_active, 'card-border-active')}/>
            <div className={classNames(styles.content, 'card-content')}>
                {children}
            </div>
        </div>
    );
}

export default Card;
