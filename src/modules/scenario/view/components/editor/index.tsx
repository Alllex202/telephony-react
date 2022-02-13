import React, {useCallback, useEffect, useRef, useState} from 'react'
import styles from './styles.module.scss'
import ReactFlow, {
    Background,
    BackgroundVariant,
    Connection,
    Edge,
    Elements,
    NodeTypesType,
    OnLoadParams,
    useZoomPanHelper
} from 'react-flow-renderer'
import {useDispatch} from 'react-redux'
import {addEdge, addNode, removeElements} from 'store/scenario/view'
import {NodeTypes} from 'core/api'
import StartElement from '../elements/start-element'
import FinishElement from '../elements/finish-element'
import ReplicaElement from '../elements/replica-element'
import {useSelectorApp} from 'shared/hoocks'

const typesElements: NodeTypesType = {
    START: StartElement,
    FINISH: FinishElement,
    REPLICA: ReplicaElement
}

const ScenarioEditor = React.memo(() => {
    const dispatch = useDispatch()
    const {
        scenarioView: {
            scenario: {
                status,
                data: {actual}
            }
        }
    } = useSelectorApp()
    const {fitView} = useZoomPanHelper()
    const reactFlowWrapper = useRef<HTMLDivElement | null>(null)
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams | null>(null)

    const onLoad = (_reactFlowInstance: OnLoadParams) => {
        setReactFlowInstance(_reactFlowInstance)
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        if (!(reactFlowWrapper && reactFlowWrapper.current && reactFlowInstance)) return

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const nodeType = e.dataTransfer.getData('application/reactflow')

        if (!nodeType) return

        const position = reactFlowInstance.project({
            x: e.clientX - reactFlowBounds.left,
            y: e.clientY - reactFlowBounds.top
        })

        dispatch(addNode({nodeType: nodeType as NodeTypes, position}))
    }

    const onElementsRemove = (elements: Elements) => {
        dispatch(removeElements(elements))
    }

    const onConnect = useCallback((params: Edge | Connection) => {
        dispatch(addEdge(params))
    }, [])

    useEffect(() => {
        if (!!actual) {
            fitView({duration: 500, padding: 0.35}, 500)
        }
    }, [!!actual])

    return (
        <div className={styles.wrapper} ref={reactFlowWrapper}>
            <ReactFlow
                elements={actual?.elements ?? []}
                nodeTypes={typesElements}
                onConnect={onConnect}
                maxZoom={10}
                minZoom={0.2}
                onLoad={onLoad}
                onDragOver={onDragOver}
                onDrop={onDrop}
                deleteKeyCode={46}
                onElementsRemove={onElementsRemove}
                // snapToGrid={true}
                // snapGrid={[20, 20]}
            >
                <Background variant={BackgroundVariant.Lines} className={styles.grid} gap={112} />
            </ReactFlow>
        </div>
    )
})

export default ScenarioEditor
