import React, {useEffect} from 'react'
import bodyStyles from 'shared/styles/body-list/styles.module.scss'
import {useDispatch} from 'react-redux'
import {getScenariosPage, resetScenariosStates as clearData} from 'store/scenario/list'
import ScenarioCard from './components/card'
import {useSelectorApp} from 'shared/hoocks'
import {RequestPageTypes} from 'shared/types'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import {classNames} from 'shared/utils'

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
                <BtnSecondary
                    className={classNames(
                        bodyStyles.more,
                        !isLastPage && (statuses.isSuccess || statuses.isError) ? '' : 'v-hidden'
                    )}
                    onClick={loadNextPage}
                >
                    Показать больше
                </BtnSecondary>
            </div>
        </>
    )
}

export default ScenarioListBody
