import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Handle, NodeProps, Position} from 'react-flow-renderer';
import {classNames} from 'shared/utils';
import {useDispatch} from 'react-redux';
import {changePosition} from 'store/features/scenario/view';
import {NodeDataModel} from 'core/api';

const FinishElement = ({id, data, selected, dragHandle, xPos, yPos, isDragging}: NodeProps<NodeDataModel>) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (isDragging === false && xPos && yPos) {
            dispatch(changePosition({id, x: xPos, y: yPos}));
        }
    }, [isDragging]);
    return (
        <div className={classNames(styles.finish, 'draggable-handle')}>
            Финиш
            <Handle type={'target'} position={Position.Top} className={styles.handle}/>
        </div>
    );
};

export default FinishElement;
