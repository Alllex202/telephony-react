import React from 'react'
import styles from './styles.module.scss'
import Icon from 'components/ui-kit/icon'
import {NodeTypes} from 'core/api'
import {classNames} from 'shared/utils'
import {useSelectorApp} from 'shared/hoocks'

const ScenarioLeftSidebar = () => {
    const {
        scenarioView: {
            scenario: {
                data: {actual}
            }
        }
    } = useSelectorApp()

    const onDragStart = (nodeType: NodeTypes) => (e: React.DragEvent<HTMLDivElement>) => {
        if (
            (nodeType === 'START' && actual?.startId) ||
            (nodeType === 'FINISH' && actual?.finishId)
        ) {
            e.preventDefault()
            return
        }

        e.dataTransfer.setData('application/reactflow', nodeType)
        e.dataTransfer.effectAllowed = 'move'
    }

    return (
        <div className={styles.leftSidebar}>
            <div className={styles.infoBlock}>
                <Icon name={'redo'} type={'round'} className={styles.infoIcon} />
                <div className={styles.infoText}>Перетащите компоненты на поле</div>
            </div>
            <div className={styles.elements}>
                <div
                    className={classNames(
                        styles.element,
                        styles.start,
                        actual?.startId ? styles.disabled : ''
                    )}
                    draggable
                    onDragStart={onDragStart('START')}
                >
                    Старт
                </div>
                <div className={styles.element} draggable onDragStart={onDragStart('REPLICA')}>
                    Реплика
                </div>
                <div
                    className={classNames(
                        styles.element,
                        styles.finish,
                        actual?.finishId ? styles.disabled : ''
                    )}
                    draggable
                    onDragStart={onDragStart('FINISH')}
                >
                    Финиш
                </div>
            </div>
        </div>
    )
}

export default ScenarioLeftSidebar
