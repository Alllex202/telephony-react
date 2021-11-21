import React, {ReactNode} from 'react';
import Bar from "./components/bar";
import Menu from "./components/menu";
import styles from './styles.module.scss';


type Props = {
    childrenBody: ReactNode,
    childrenHeader: ReactNode,
    childrenFooter?: ReactNode,
    childrenRightSidebar?: ReactNode,
}

const MainLayout = ({childrenBody, childrenHeader, childrenFooter, childrenRightSidebar}: Props) => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.main}>
                    <Bar>{childrenHeader}</Bar>
                    <div className={styles.left}>
                        <Menu/>
                    </div>
                    <div className={styles.center}>
                        {childrenBody}
                    </div>
                    <div className={styles.right}>
                        {childrenRightSidebar}
                    </div>
                </div>
                <div className={styles.footer}>
                    {childrenFooter}
                </div>
            </div>

        </>
    );
};

export default MainLayout;
