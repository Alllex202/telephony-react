import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {getScenario, resetAll} from 'store/features/scenario/view'
import {useParams} from 'react-router-dom'
import {RootState} from 'store'
import ScenarioViewHeader from './components/header'
import ScenarioLeftSidebar from './components/left-sidebar'
import ScenarioEditor from './components/editor'
import ScenarioRightSidebar from 'modules/scenario/view/components/right-sidebar'
import {ReactFlowProvider} from 'react-flow-renderer'

const ScenarioView = () => {
    const {isLoaded} = useSelector((state: RootState) => state.scenarioView)
    const dispatch = useDispatch()
    const {scenarioId} = useParams<{ scenarioId: string }>()

    useEffect(() => {
        dispatch(getScenario(scenarioId))

        // document.body.setAttribute('overflow', 'hidden');
        return () => {
            // document.body.removeAttribute('overflow');
            dispatch(resetAll())
        }
        // eslint-disable-next-line
    }, [])

    return (
        <ReactFlowProvider>
            <div className={styles.wrapper}>
                <ScenarioViewHeader/>
                {
                    isLoaded &&
                    <>
                        <ScenarioLeftSidebar/>
                        <ScenarioRightSidebar/>
                    </>
                }
                <ScenarioEditor/>
            </div>
        </ReactFlowProvider>
    )
}

export default ScenarioView
