import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import {useDispatch} from 'react-redux'
import {getScenario, resetScenarioView} from 'store/scenario/view'
import {useParams} from 'react-router-dom'
import ScenarioViewHeader from './components/header'
import ScenarioLeftSidebar from './components/left-sidebar'
import ScenarioEditor from './components/editor'
import ScenarioRightSidebar from './components/right-sidebar'
import {ReactFlowProvider} from 'react-flow-renderer'
import {useSelectorApp} from 'shared/hoocks'

const ScenarioView = () => {
    const dispatch = useDispatch()
    const {
        scenarioView: {
            scenario: {
                data: {actual, remote}
            }
        }
    } = useSelectorApp()
    const {scenarioId} = useParams<{scenarioId: string}>()

    useEffect(() => {
        dispatch(getScenario(scenarioId))

        return () => {
            dispatch(resetScenarioView({type: 'scenario'}))
        }
    }, [scenarioId])

    return (
        <ReactFlowProvider>
            <div className={styles.wrapper}>
                <ScenarioViewHeader />
                {actual && remote && (
                    <>
                        <ScenarioLeftSidebar />
                        <ScenarioRightSidebar />
                    </>
                )}
                <ScenarioEditor />
            </div>
        </ReactFlowProvider>
    )
}

export default ScenarioView
