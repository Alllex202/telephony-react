import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles.module.scss';
import InputName from 'modules/components/input-name';
import Icon from 'components/ui-kit/icon';
import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    Edge,
    Node,
    NodeTypesType,
    isNode, EdgeProps, EdgeTypesType, Connection
} from 'react-flow-renderer';
import {useDispatch, useSelector} from 'react-redux';
import {addEdge, getScenario, resetAll, setElements} from 'store/features/scenario/view';
import {useParams} from 'react-router-dom';
import {RootState} from 'store';
import StartElement from './components/start-element';
import FinishElement from './components/finish-element';
import ReplicaElement from './components/replica-element';

const typesElements: NodeTypesType = {
    START: StartElement,
    FINISH: FinishElement,
    REPLICA: ReplicaElement,
};

const ScenarioViewBody = () => {
    const {data, elements, statuses} = useSelector((state: RootState) => state.scenarioView);
    console.log(elements)
    const dispatch = useDispatch();
    const {scenarioId} = useParams<{ scenarioId: string }>();
    const [name, setName] = useState<string>(data?.name || '');
    const [lastName, setLastName] = useState<string>(name);

    useEffect(() => {
        dispatch(getScenario(scenarioId));
        return () => {
            dispatch(resetAll());
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setName(data?.name || '');
        setLastName(data?.name || '');
    }, [data?.name]);

    const onConnect = useCallback((params: Edge | Connection) => {
        dispatch(addEdge(params));
        // eslint-disable-next-line
    }, []);

    if (statuses.isLoading) {
        return <h1>Загрузка...</h1>;
    }

    if (statuses.isError) {
        return <h1>Ошибка | {statuses.error}</h1>;
    }

    return (
        <div className={styles.wrapper}>
            <InputName text={name} lastText={lastName} setText={setName} setLastText={setLastName}
                       classNameWrapper={styles.name} classNameInput={styles.nameInput}
                       classNameText={styles.nameText}/>

            <div className={styles.editor}>
                <div className={styles.leftSidebar}>
                    <div className={styles.infoBlock}>
                        <Icon name={'info'} type={'round'} className={styles.infoIcon}/>
                        <div className={styles.infoText}>
                            Перетаскивайте компоненты на поле и соединяйте их, чтобы построить сценарий.
                        </div>
                    </div>
                    <div className={styles.elements}>

                    </div>
                </div>

                <div className={styles.editorWrapper}>
                    <ReactFlow
                        elements={elements}
                        nodeTypes={typesElements}
                        onConnect={onConnect}
                        maxZoom={10}
                    >
                        <Background variant={BackgroundVariant.Lines} className={styles.grid} gap={112}/>
                        <Controls className={styles.controls}/>
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
};

export default ScenarioViewBody;
