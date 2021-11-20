import React, {ReactNode} from 'react';
import Bar from "./components/bar";
import Menu from "./components/menu";
import styles from './styles.module.scss';


type Props = {
    childrenBody: ReactNode,
    childrenHeader: ReactNode,
}

const MainLayout = ({childrenBody, childrenHeader}: Props) => {
    return (
        <>
            <div className={styles.main}>
                <Menu/>
                <Bar>{childrenHeader}</Bar>
                <div className={styles.wrapper} id={'scrolling-wrapper'}>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            {childrenBody}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainLayout;
