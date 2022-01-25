import React, {useEffect} from 'react'
import bodyStyles from 'shared/styles/body-list/styles.module.scss'
import {useDispatch} from 'react-redux'
import {getScenariosPage, resetScenariosStates as clearData} from 'store/scenario/list'
import BtnSecond from 'components/ui-kit/btn-second'
import ScenarioCard from 'modules/scenario/list/body/components/card'
import {useSelectorApp} from 'shared/hoocks'
import {RequestPageTypes} from 'shared/types'

const ScenarioListBody = () => {
    const dispatch = useDispatch()
    const {
        scenarioList: {
            scenarioList,
            statuses,
            pageSettings: {page, size, isLastPage}
        }
    } = useSelectorApp()

    const loadNextPage = () => {
        if (isLastPage || statuses.isLoading) return

        dispatch(getScenariosPage(RequestPageTypes.Next))
    }

    useEffect(() => {
        dispatch(getScenariosPage(RequestPageTypes.First))

        return () => {
            dispatch(clearData())
        }
    }, [])

    return (
        <>
            <div className={bodyStyles.list}>
                {scenarioList.map((el) => (
                    <ScenarioCard key={el.id} data={el} className={bodyStyles.card} />
                ))}
            </div>

            <div className={bodyStyles.footer}>
                {!isLastPage && (statuses.isSuccess || statuses.isError) && (
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
