import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Handle, NodeProps, Position} from 'react-flow-renderer';
import {classNames} from 'shared/utils';
import {changePosition} from 'store/features/scenario/view';
import {useDispatch} from 'react-redux';
import {NodeDataModel} from 'core/api';

const StartElement = ({id, data, selected, dragHandle, xPos, yPos, isDragging}: NodeProps<NodeDataModel>) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (isDragging === false && xPos && yPos) {
            dispatch(changePosition({id, x: xPos, y: yPos}));
        }
    }, [isDragging]);
    return (
        <div className={classNames(styles.start, 'draggable-handle')}>
            Старт
            <Handle type={'source'} position={Position.Bottom} className={classNames(styles.handle, styles.round)}/>
        </div>
    );
};

export default StartElement;
