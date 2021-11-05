import React from 'react';
import styles from './styles.module.scss';

const Bar = () => {
    return (
        <div className={styles.bar}>
            <div className={styles.container}>
                Шапка - Используются фейковые данные
            </div>
        </div>
    );
};

export default Bar;
