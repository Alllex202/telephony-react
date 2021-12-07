import React, {useEffect} from 'react';
import bodyStyles from 'shared/styles/body-list/styles.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {getScenariosByPage, resetScenariosStates as clearData} from 'store/features/scenario/list/list';
import BtnSecond from 'components/ui-kit/btn-second';
import ScenarioCard from 'modules/scenario/list/body/components/card';

const ScenarioListBody = () => {
    const {
        scenarioList,
        statuses,
        error,
        page,
        size,
        isLastPage
    } = useSelector((state: RootState) => state.scenarioList);
    const filter = useSelector((state: RootState) => state.scenarioFilter);

    const dispatch = useDispatch();

    const loadNextPage = () => {
        if (isLastPage || statuses.isLoading) return;

        getData(page + 1);
    }

    function getData(page: number) {
        dispatch(getScenariosByPage({
                page,
                size,
                direction: filter.direction,
                name: filter.name,
                sortBy: filter.sortBy
            },
        ));
    }

    useEffect(() => {
        return () => {
            dispatch(clearData());
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getData(page);
        // eslint-disable-next-line
    }, [filter]);

    if (scenarioList.length < 1 && statuses.isLoading) {
        return <h1>Загрузка...</h1>;
    }

    if (scenarioList.length < 1 && statuses.isError) {
        return <h1>Ошибка при загрузке | {error}</h1>
    }

    return (
        <>
            {scenarioList.length < 1
                ? <h1>Здесь пусто :(</h1>
                : <>
                    <div className={bodyStyles.list}>
                        {scenarioList.map(el =>
                            <ScenarioCard key={el.id} data={el} className={bodyStyles.card}/>
                        )}
                    </div>
                </>
            }

            <div className={bodyStyles.footer}>
                {statuses.isLoading && <h1>Загрузка...</h1>}
                {!isLastPage && !statuses.isLoading &&
                <BtnSecond className={bodyStyles.more} onClick={loadNextPage} text={'Показать больше'}/>}
            </div>
        </>
    );
};

export default ScenarioListBody;