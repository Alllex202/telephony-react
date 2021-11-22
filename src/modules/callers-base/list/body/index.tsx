import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {resetCallersBasesStates as clearData} from "../../../../store/features/callers-bases/list";
import CallersBaseCard from "./components/card";
import {getCallersBasesByPage} from "../../../../core/api/requests";
import BtnSecond from "../../../../components/ui-kit/btn-second";


function CallersBaseList() {
    const {
        callersBaseHeaders,
        statuses,
        error,
        page,
        size,
        isLastPage
    } = useSelector((state: RootState) => state.callersBaseHeaders);
    const filter = useSelector((state: RootState) => state.callersBasesFilter);

    const dispatch = useDispatch();

    const loadNextPage = () => {
        if (isLastPage || statuses.isLoading) return;

        // document.removeEventListener('scroll', loadNextPage)
        getData(page + 1);
    }

    useEffect(() => {
        getData(page);
        // eslint-disable-next-line
    }, [filter]);

    function getData(page: number) {
        dispatch(getCallersBasesByPage({
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

    // useEffect(() => {
    //     document.addEventListener('scroll', loadNextPage)
    //     return () => {
    //         document.removeEventListener('scroll', loadNextPage)
    //     }
    //     // eslint-disable-next-line
    // }, [isLastPage, statuses.isLoading]);

    if (callersBaseHeaders.length < 1 && statuses.isLoading) {
        return <h1>Загрузка...</h1>;
    }

    if (callersBaseHeaders.length < 1 && statuses.isError) {
        return <h1>Ошибка при загрузке | {error}</h1>
    }

    return (
        <>
            {callersBaseHeaders.length < 1
                ? <h1>Здесь пусто :(</h1>
                : <>
                    <div className={styles.list}>
                        {callersBaseHeaders.map(el =>
                            <CallersBaseCard key={el.id} data={el} className={styles.card}/>
                        )}
                    </div>
                </>
            }

            <div className={styles.footer}>
                {statuses.isLoading && <h1>Загрузка...</h1>}
                {!isLastPage && !statuses.isLoading &&
                <BtnSecond className={styles.more} onClick={loadNextPage} text={'Показать больше'}/>}
            </div>
        </>
    );
}

export default CallersBaseList;

