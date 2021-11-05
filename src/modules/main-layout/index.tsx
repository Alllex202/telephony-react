import React from 'react';
import Bar from "./components/bar";
import Menu from "./components/menu";
import styles from './styles.module.scss';


type Props = {
    children: React.ReactNode;
}

const MainLayout = ({children}: Props) => {
    return (
        <>
            <Bar/>
            <div className={styles.container}>
                <Menu/>
                <div className={styles.content}>{children}</div>
            </div>
        </>
    );
};

export default MainLayout;
