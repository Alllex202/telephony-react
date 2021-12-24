import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import bodyStyles from 'shared/styles/body-list/styles.module.scss';
import BtnSecond from 'components/ui-kit/btn-second';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {getCallingsByPage, resetCallingStates} from 'store/features/calling/list/list';
import CallingCard from 'modules/calling/list/body/components/card';

const CallingListBody = () => {
    const {statuses, callingList, isLastPage, page, size} = useSelector((state: RootState) => state.callingList);
    const filter = useSelector((state: RootState) => state.callingFilter);
    const dispatch = useDispatch();

    const loadNextPage = () => {
        if (isLastPage || statuses.isLoading) return;

        getData(page + 1);
    }

    function getData(page: number) {
        dispatch(getCallingsByPage({
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
            dispatch(resetCallingStates());
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getData(page);
        // eslint-disable-next-line
    }, [filter]);

    if (callingList.length < 1 && statuses.isLoading) {
        return <h1>Загрузка...</h1>;
    }

    if (callingList.length < 1 && statuses.isError) {
        return <h1>Ошибка при загрузке | {statuses.error}</h1>
    }

    return (
        <>
            {callingList.length < 1
                ? <h1>Здесь пусто :(</h1>
                : <>
                    <div className={bodyStyles.list}>
                        {callingList.map(el =>
                            <CallingCard key={el.id} data={el} className={bodyStyles.card}/>
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

export default CallingListBody;
