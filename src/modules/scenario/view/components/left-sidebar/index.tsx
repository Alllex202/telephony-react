import React from 'react';
import styles from './styles.module.scss';
import Icon from 'components/ui-kit/icon';
import {NodeType} from 'core/api';

const ScenarioLeftSidebar = () => {
    const onDragStart = (e: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
        e.dataTransfer.setData('application/reactflow', nodeType);
        e.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className={styles.leftSidebar}>
            <div className={styles.infoBlock}>
                <Icon name={'info'} type={'round'} className={styles.infoIcon}/>
                <div className={styles.infoText}>
                    Перетаскивайте компоненты на поле и соединяйте их, чтобы построить сценарий.
                </div>
            </div>
            <div className={styles.elements}>
                <div className={styles.element} draggable
                     onDragStart={(e) => onDragStart(e, 'START')}>
                    Старт
                </div>
                <div className={styles.element} draggable
                     onDragStart={(e) => onDragStart(e, 'REPLICA')}>
                    Реплика
                </div>
                <div className={styles.element} draggable
                     onDragStart={(e) => onDragStart(e, 'FINISH')}>
                    Финиш
                </div>
            </div>
        </div>
    );
};

export default ScenarioLeftSidebar;
