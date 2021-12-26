import React from 'react';
import styles from './styles.module.scss';
import {NavLink} from 'react-router-dom';

type Props = {
    to: string,
    label: string,
    placeholder?: string,
}

const MenuItem = ({to, label}: Props) => {
    return (
        <NavLink className={styles.menuItem}
                 to={to}
                 activeClassName={styles.active}>{label}</NavLink>
    );
};

export default MenuItem;
