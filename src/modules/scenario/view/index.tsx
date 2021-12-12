import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {getScenario, resetAll} from 'store/features/scenario/view';
import {useParams} from 'react-router-dom';
import {RootState} from 'store';
import ScenarioViewHeader from './components/header';
import ScenarioLeftSidebar from './components/left-sidebar';
import ScenarioEditor from './components/editor';

const ScenarioView = () => {
    const {statuses} = useSelector((state: RootState) => state.scenarioView);
    // console.log(elements);
    const dispatch = useDispatch();
    const {scenarioId} = useParams<{ scenarioId: string }>();

    useEffect(() => {
        dispatch(getScenario(scenarioId));
        return () => {
            dispatch(resetAll());
        };
        // eslint-disable-next-line
    }, []);

    if (statuses.isLoading) {
        return <h1>Загрузка...</h1>;
    }

    if (statuses.isError) {
        return <h1 className={styles.error}>Ошибка | {statuses.error}</h1>;
    }

    return (
        <div className={styles.wrapper}>
            <ScenarioViewHeader/>
            <ScenarioLeftSidebar/>
            <ScenarioEditor/>
        </div>
    );
};

export default ScenarioView;
