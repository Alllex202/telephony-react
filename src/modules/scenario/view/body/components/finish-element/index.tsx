import React from 'react';
import styles from './styles.module.scss';
import {Handle, Position} from 'react-flow-renderer';

const FinishElement = () => {
    return (
        <div className={styles.finish}>
            Финиш
            <Handle type={'target'} position={Position.Top} className={styles.handle}/>
        </div>
    );
};

export default FinishElement;
