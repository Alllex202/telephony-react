import React from 'react';
import styles from './styles.module.scss';
import MenuItem from "./components/menu-item";
import routes from "../../../../routing/routes";


const Menu = () => {
    const menuItems: {link: string, label: string}[] = [
        {link: routes.callingList(), label: 'Обзванивание'},
        {link: routes.scenarioList(), label: 'Сценарии'},
        {link: routes.databaseList(), label: 'Базы данных'},
        {link: routes.statisticsView(), label: 'Статистика'},
    ];

    return (
        <div className={styles.menu}>
            {menuItems.map(item => <MenuItem to={item.link} label={item.label}/>)}
        </div>
    );
};

export default Menu;