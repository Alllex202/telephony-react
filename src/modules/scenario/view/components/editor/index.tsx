import React, {useCallback, useRef, useState} from 'react';
import styles from './styles.module.scss';
import ReactFlow, {
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    NodeTypesType,
    OnLoadParams
} from 'react-flow-renderer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {addEdge, addNode} from 'store/features/scenario/view';
import {NodeType} from 'core/api';
import StartElement from '../elements/start-element';
import FinishElement from '../elements/finish-element';
import ReplicaElement from '../elements/replica-element';

const typesElements: NodeTypesType = {
    START: StartElement,
    FINISH: FinishElement,
    REPLICA: ReplicaElement,
};

const ScenarioEditor = () => {
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
            >
                <Background variant={BackgroundVariant.Lines} className={styles.grid} gap={112}/>
                <Controls className={styles.controls}/>
            </ReactFlow>
        </div>
    );
};

export default ScenarioEditor;
