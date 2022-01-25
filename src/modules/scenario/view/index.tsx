import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import {useDispatch} from 'react-redux'
import {getScenario, resetAll} from 'store/scenario/view'
import {useParams} from 'react-router-dom'
import ScenarioViewHeader from './components/header'
import ScenarioLeftSidebar from './components/left-sidebar'
import ScenarioEditor from './components/editor'
import ScenarioRightSidebar from 'modules/scenario/view/components/right-sidebar'
import {ReactFlowProvider} from 'react-flow-renderer'
import {useSelectorApp} from 'shared/hoocks'

const ScenarioView = () => {
    const {
        scenarioView: {isLoaded}
    } = useSelectorApp()
    const dispatch = useDispatch()
    const {scenarioId} = useParams<{scenarioId: string}>()

    useEffect(() => {
        dispatch(getScenario(scenarioId))

        // document.body.setAttribute('overflow', 'hidden');
        return () => {
            // document.body.removeAttribute('overflow');
            dispatch(resetAll())
        }
    }, [])

    return (
        <ReactFlowProvider>
            <div className={styles.wrapper}>
                <ScenarioViewHeader />
                {isLoaded && (
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
