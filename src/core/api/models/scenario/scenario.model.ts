export interface ScenarioModel {
    connectedCallerBaseId: number | string | null,
    created: number,
    edges: EdgeModel[],
    id: string,
    name: string,
    nodes: NodeModel[],
    rootId: string | number,
}

export interface EdgeModel {
    id: string,
    source: string,
    target: string,
    sourceHandle?: string,
}

export type NodeType = 'START' | 'FINISH' | 'REPLICA';

export interface NodeModel {
    type: NodeType,
    data: NodeDataModel,
    position: {
        x: number,
        y: number,
    }
    id: string,
}

export interface NodeDataModel {
    id?: string,
    created?: number,
    replica: string,
    waitingTime: number,
    answers?: AnswerModel[],
    needAnswer: boolean,
}

export interface AnswerModel {
    id: string,
    button: string,
}
