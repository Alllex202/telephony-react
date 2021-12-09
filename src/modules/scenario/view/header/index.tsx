import React from 'react';
import styles from './styles.module.scss';
import BtnSecond from 'components/ui-kit/btn-second';
import {useHistory} from 'react-router-dom';
import routes from 'routing/routes';
import Btn from 'components/ui-kit/btn';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {saveScenario} from 'store/features/scenario/view';

const ScenarioViewHeader = () => {
    const dispatch = useDispatch();
    const {statuses} = useSelector((state: RootState) => state.scenarioView);
    const history = useHistory();

    const handlerBack = () => {
        // TODO clean store
        history.push(routes.scenarioList());
    };

    const handlerSave = () => {
        if (statuses.isLoading) return;

        // TODO save scenario
        dispatch(saveScenario());
    };

    return (
        <div className={styles.header}>
            <BtnSecond text={'Назад'} className={styles.back} onClick={handlerBack} iconType={'round'}
                       iconName={'arrow_back'}/>
            <Btn text={'Сохранить'} className={styles.save} onClick={handlerSave} disabled={statuses.isLoading}/>
        </div>
    );
};

export default ScenarioViewHeader;
