import React from 'react'
import styles from './styles.module.scss'
import Icon from 'components/ui-kit/icon'
import {NodeType} from 'core/api'
import {classNames} from 'shared/utils'

const ScenarioLeftSidebar = () => {
    const onDragStart = (e: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
        e.dataTransfer.setData('application/reactflow', nodeType)
        e.dataTransfer.effectAllowed = 'move'
    }

    return (
        <div className={styles.leftSidebar}>
            <div className={styles.infoBlock}>
                <Icon name={'redo'}
                      type={'round'}
                      className={styles.infoIcon}/>
                <div className={styles.infoText}>
                    Перетащите
                    компоненты
                    на поле
                </div>
            </div>
            <div className={styles.elements}>
                <div className={classNames(styles.element, styles.start)}
                     draggable
                     onDragStart={(e) => onDragStart(e, 'START')}>
                    Старт
                </div>
                <div className={styles.element}
                     draggable
                     onDragStart={(e) => onDragStart(e, 'REPLICA')}>
                    Реплика
                </div>
                <div className={classNames(styles.element, styles.finish)}
                     draggable
                     onDragStart={(e) => onDragStart(e, 'FINISH')}>
                    Финиш
                </div>
            </div>
        </div>
    )
}

export default ScenarioLeftSidebar
