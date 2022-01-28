import {IdKey} from 'shared/types/id-key'

export interface ScenarioModel {
    connectedCallerBaseId: IdKey | null
    created: number
    edges: EdgeModel[]
    id: string
    name: string
    nodes: NodeModel[]
    rootId: IdKey
}

export interface EdgeModel {
    id: string
    source: string
    target: string
    sourceHandle?: string
}

export type NodeTypes = 'START' | 'FINISH' | 'REPLICA'

export interface NodeModel {
    type: NodeTypes
    data: NodeDataModel
    position: {
        x: number
        y: number
    }
    id: string
}

export interface NodeDataModel {
    replica: string
    waitingTime: number
    answers: AnswerModel[] | null
    needAnswer: boolean
}

export interface AnswerModel {
    id: string
    button: string
}
