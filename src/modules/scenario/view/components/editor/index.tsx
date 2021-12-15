import React, {useCallback, useRef, useState} from 'react';
import styles from './styles.module.scss';
import ReactFlow, {
    Background,
    BackgroundVariant,
    Connection, ControlButton,
    Controls,
    Edge, Elements,
    NodeTypesType,
    OnLoadParams, useZoomPanHelper,
} from 'react-flow-renderer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {addEdge, addNode, removeElements} from 'store/features/scenario/view';
import {NodeType} from 'core/api';
import StartElement from '../elements/start-element';
import FinishElement from '../elements/finish-element';
import ReplicaElement from '../elements/replica-element';
import {copy} from 'shared/utils';
import BtnCircle from 'components/ui-kit/btn-circle';

const typesElements: NodeTypesType = {
    START: StartElement,
    FINISH: FinishElement,
    REPLICA: ReplicaElement,
};

const ScenarioEditor = React.memo(() => {
    const {elements} = useSelector((state: RootState) => state.scenarioView);
    const dispatch = useDispatch();
    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams | null>(null);

    const onConnect = useCallback((params: Edge | Connection) => {
        dispatch(addEdge(params));
        // eslint-disable-next-line
    }, []);

    const onLoad = (_reactFlowInstance: OnLoadParams) => {
        setReactFlowInstance(_reactFlowInstance);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (!(reactFlowWrapper && reactFlowWrapper.current && reactFlowInstance)) return;

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const nodeType = e.dataTransfer.getData('application/reactflow') as NodeType;
        const position = reactFlowInstance.project({
            x: e.clientX - reactFlowBounds.left,
            y: e.clientY - reactFlowBounds.top,
        });

        dispatch(addNode({nodeType, position}));
    };

    const onElementsRemove = (elements: Elements) => {
        dispatch(removeElements(elements));
    };

    return (
        <div className={styles.wrapper} ref={reactFlowWrapper}>
            <ReactFlow
                elements={elements}
                nodeTypes={typesElements}
                onConnect={onConnect}
                maxZoom={10}
                minZoom={0.2}
                onLoad={onLoad}
                onDragOver={onDragOver}
                onDrop={onDrop}
                deleteKeyCode={46}
                onElementsRemove={onElementsRemove}
                // snapToGrid={true}
                // snapGrid={[20, 20]}
            >
                <Background variant={BackgroundVariant.Lines} className={styles.grid} gap={112}/>
            </ReactFlow>
        </div>
    );
});

export default ScenarioEditor;
