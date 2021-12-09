import React from 'react';
import styles from './styles.module.scss';
import {Handle, Position} from 'react-flow-renderer';
import {classNames} from 'shared/utils';

const StartElement = () => {
    return (
        <div className={styles.start}>
            Старт
            <Handle type={'source'} position={Position.Bottom} className={classNames(styles.handle, styles.round)}/>
        </div>
    );
};

export default StartElement;
