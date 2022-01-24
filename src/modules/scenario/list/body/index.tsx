import React, {useEffect} from 'react'
import bodyStyles from 'shared/styles/body-list/styles.module.scss'
import {useDispatch} from 'react-redux'
import {getScenariosByPage, resetScenariosStates as clearData} from 'store/scenario/list'
import BtnSecond from 'components/ui-kit/btn-second'
import ScenarioCard from 'modules/scenario/list/body/components/card'
import {useSelectorApp} from 'shared/hoocks'

const ScenarioListBody = () => {
    const {
        filter,
        scenarioList: {scenarioList, statuses, error, page, size, isLastPage}
    } = useSelectorApp()

    const dispatch = useDispatch()

    const loadNextPage = () => {
        if (isLastPage || statuses.isLoading) return

        getData(page + 1)
    }

    const getData = (page: number) => {
        dispatch(
            getScenariosByPage({
                page,
                size,
                direction: filter.direction,
                name: filter.name,
                sortBy: filter.sortBy
            })
        )
    }

    useEffect(() => {
        return () => {
            dispatch(clearData())
        }
    }, [])

    useEffect(() => {
        getData(page)
    }, [filter])

    if (scenarioList.length < 1 && statuses.isLoading) {
        return <h1>Загрузка...</h1>
    }

    if (scenarioList.length < 1 && statuses.isError) {
        return <h1>Ошибка при загрузке | {error}</h1>
    }

    return (
        <>
            {scenarioList.length < 1 ? (
                <h1>Здесь пусто :(</h1>
            ) : (
                <>
                    <div className={bodyStyles.list}>
                        {scenarioList.map((el) => (
                            <ScenarioCard key={el.id} data={el} className={bodyStyles.card} />
                        ))}
                    </div>
                </>
            )}

            <div className={bodyStyles.footer}>
                {statuses.isLoading && <h1>Загрузка...</h1>}
                {!isLastPage && !statuses.isLoading && (
                    <BtnSecond
                        className={bodyStyles.more}
                        onClick={loadNextPage}
                        text={'Показать больше'}
                    />
                )}
            </div>
        </>
    )
}

export default ScenarioListBody
