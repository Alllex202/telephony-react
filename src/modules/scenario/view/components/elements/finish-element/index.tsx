import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Handle, NodeProps, Position} from 'react-flow-renderer';
import {classNames} from 'shared/utils';
import {useDispatch} from 'react-redux';
import {changePosition} from 'store/features/scenario/view';
import {NodeDataModel} from 'core/api';
import Card from 'components/ui-kit/card';

const FinishElement = React.memo((
    {id, data, selected, dragHandle, xPos, yPos, isDragging}: NodeProps<NodeDataModel>
) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (isDragging === false && xPos && yPos) {
            dispatch(changePosition({elementId: id, x: xPos, y: yPos}));
        }
        // eslint-disable-next-line
    }, [isDragging]);

    return (
        <Card isActive={selected}
              className={classNames(styles.finish, 'draggable-handle', 'element-wrapper', 'finish-wrapper')}
              disableHover={true}>
            Финиш
            <Handle type={'target'} position={Position.Top} className={styles.handle}/>
        </Card>
    );
});

export default FinishElement;
