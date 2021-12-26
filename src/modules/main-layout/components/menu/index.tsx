import React from 'react';
import styles from './styles.module.scss';
import MenuItem from './components/menu-item';
import {menuItems} from 'shared/data/menu-items';

const Menu = () => {
    return (
        <>
            <div className={styles.menu}>
                {
                    menuItems.map((item, ind) =>
                        <MenuItem key={ind} to={item.link} label={item.label}/>)
                }
            </div>
        </>
    );
};

export default Menu;
