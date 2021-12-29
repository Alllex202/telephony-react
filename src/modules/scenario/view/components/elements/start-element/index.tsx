import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import {Handle, NodeProps, Position} from 'react-flow-renderer'
import {classNames} from 'shared/utils'
import {changePosition} from 'store/features/scenario/view'
import {useDispatch} from 'react-redux'
import {NodeDataModel} from 'core/api'
import Card from 'components/ui-kit/card'

const StartElement = React.memo((
    {id, data, selected, dragHandle, xPos, yPos, isDragging}: NodeProps<NodeDataModel>) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (isDragging === false && xPos && yPos) {
            dispatch(changePosition({elementId: id, x: xPos, y: yPos}))
        }
        // eslint-disable-next-line
    }, [isDragging])
    return (
        <Card className={classNames(styles.start, 'draggable-handle', 'element-wrapper', 'start-wrapper')}
              disableHover={true}
              isActive={selected}>
            Старт
            <Handle type={'source'}
                    position={Position.Bottom}
                    className={classNames(styles.handle, styles.round)}/>
        </Card>
    )
})

export default StartElement

