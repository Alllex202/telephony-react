import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {AnswerModel, EdgeModel, NodeDataModel, NodeModel, NodeType, ScenarioModel} from 'core/api';
import {FetchStatuses} from 'shared/types/fetch-statuses';
import {getScenarioById, putScenarioById} from 'core/api/requests';
import {DefaultAxiosError} from 'shared/types/base-response-error';
import {RootState} from 'store';
import {
    Node,
    Edge,
    addEdge as _addEdge,
    Connection,
    removeElements,
    Elements,
    getConnectedEdges,
    updateEdge, XYPosition
} from 'react-flow-renderer';
import {copy, getUniqueId} from 'shared/utils';

export type ElementType = Node<NodeDataModel> | Edge;

export interface ScenarioState {
    data: ScenarioModel | null,
    elements: ElementType[],
    statuses: FetchStatuses,
}

const initialState: ScenarioState = {
    data: null,
    elements: [],
    statuses: {},
};

export const scenarioSlice = createSlice({
    name: 'scenarioView',
    initialState,
    reducers: {
        setLoading: (state: ScenarioState) => {
            state.statuses = {isLoading: true};
        },
        setSuccess: (state: ScenarioState) => {
            state.statuses = {isSuccess: true};
        },
        setError: (state: ScenarioState, action: PayloadAction<string>) => {
            state.statuses = {isError: true, error: action.payload};
        },
        setData: (state: ScenarioState, action: PayloadAction<ScenarioModel>) => {
            state.data = action.payload;
        },
        resetData: (state: ScenarioState) => {
            state.data = null;
        },
        setElements: (state: ScenarioState, action: PayloadAction<ElementType[]>) => {
            state.elements = action.payload;
        },
        resetElements: (state: ScenarioState) => {
            state.elements = [];
        },
        resetAll: (state: ScenarioState) => {
            state.data = null;
            state.statuses = {};
            state.elements = [];
        },
        changeReplica: (state: ScenarioState, action: PayloadAction<{ elementId: string, replica: string }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.elementId ? {
                ...el,
                data: {...el.data, replica: action.payload.replica}
            } : el);
        },
        changeNeedAnswer: (state: ScenarioState, action: PayloadAction<{ elementId: string, isNeed: boolean }>) => {
            const target = (state.elements.find(el => (el as Edge).source === action.payload.elementId) as Edge)?.target;
            const answerId = getUniqueId();

            state.elements = state.elements
                .filter(el => (el as Edge).source !== action.payload.elementId)
                .map(el => (el as Node).id === action.payload.elementId ? {
                    ...el,
                    data: {
                        ...el.data,
                        answers: action.payload.isNeed ? [{id: answerId, button: '1'}] : null,
                        waitingTime: 30 * 1000,
                        needAnswer: action.payload.isNeed
                    },
                } : el);

            if (target) {
                state.elements = _addEdge({
                    source: action.payload.elementId,
                    sourceHandle: action.payload.isNeed ? answerId : null,
                    target,
                    targetHandle: null,
                    id: String(getUniqueId())
                }, state.elements);
            }
        },
        changeWaitingTime: (state: ScenarioState, action: PayloadAction<{ elementId: string, time: number }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.elementId ? {
                ...el,
                data: {...el.data, waitingTime: action.payload.time}
            } : el);
        },
        addAnswer: (state: ScenarioState, action: PayloadAction<{ elementId: string, button: string }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.elementId ? {
                ...el,
                data: {
                    ...el.data,
                    answers: [...(el.data.answers || []), {id: getUniqueId(), button: action.payload.button}]
                }
            } : el);
        },
        changeAnswer: (state: ScenarioState, action: PayloadAction<{ elementId: string, newButton: string, oldButton: string }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.elementId ? {
                ...el,
                data: {
                    ...el.data,
                    answers: el.data.answers.map((ans: AnswerModel): AnswerModel =>
                        ans.button === action.payload.oldButton ?
                            {...ans, button: action.payload.newButton} :
                            ans),
                },
            } : el);
        },
        removeAnswer: (state: ScenarioState, action: PayloadAction<{ elementId: string, answerId: string }>) => {
            state.elements = state.elements
                .filter(el => !((el as Edge).source === action.payload.elementId &&
                    (el as Edge).sourceHandle === action.payload.answerId))
                .map(el => el.id === action.payload.elementId ? {
                    ...el,
                    data: {
                        ...el.data,
                        answers: el.data.answers.filter((ans: AnswerModel) => ans.id !== action.payload.answerId)
                    }
                } : el);
        },
        removeAllAnswers: (state: ScenarioState, action: PayloadAction<{ elementId: string }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.elementId ? {
                ...el,
                data: {...el.data, answers: null}
            } : el);
        },
        addEdge: (state: ScenarioState, action: PayloadAction<Edge | Connection>) => {
            state.elements = _addEdge({...action.payload, id: String(getUniqueId())}, state.elements);
        },
        removeAllOutputsEdge: (state: ScenarioState, action: PayloadAction<string>) => {
            state.elements = state.elements.filter(el => (el as Edge).source !== action.payload);
        },
        changeName: (state: ScenarioState, action: PayloadAction<string>) => {
            if (state.data) {
                state.data.name = action.payload;
            }
        },
        changePosition: (state: ScenarioState, action: PayloadAction<{ elementId: string, x: number, y: number }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.elementId ? {
                ...el,
                position: {x: action.payload.x, y: action.payload.y},
            } : el);
        },
        addNode: (state: ScenarioState, action: PayloadAction<{ nodeType: NodeType, position: XYPosition }>) => {
            const newNode: Node<NodeDataModel> = {
                id: getUniqueId(),
                type: action.payload.nodeType,
                position: action.payload.position,
                data: {
                    // id: getUniqueId(),
                    needAnswer: false,
                    waitingTime: 0,
                    replica: '',
                },
                selectable: true,
                dragHandle: '.draggable-handle',
            };
            state.elements = [...state.elements, newNode];
        },
        // removeEdges: (state: ScenarioState, action: PayloadAction<Edge[]>) => {
        //     state.elements = removeElements(action.payload, state.elements);
        // }
    },
});

export const getScenario = (id: string | number) => (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    if (state.scenarioView.statuses.isLoading) return;

    dispatch(setLoading());
    getScenarioById(id)
        .then(res => {
            const elements: ElementType[] = [];
            res.data.nodes.forEach((value) => {
                elements.push({
                    id: value.id,
                    position: value.position,
                    data: value.data,
                    type: value.type,
                    selectable: true,
                    dragHandle: '.draggable-handle',
                });
            });
            res.data.edges.forEach((value) => {
                elements.push({
                    id: value.id,
                    source: value.source,
                    target: value.target,
                    sourceHandle: value.sourceHandle,
                });
            });
            dispatch(setData(res.data));
            dispatch(setElements(elements));
            dispatch(setSuccess());
        })
        .catch((err: DefaultAxiosError) => {
            dispatch(setError(err.response?.data.message || 'Ошибка при получении сценария'));
        });
};

export const saveScenario = () => (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    if (state.scenarioView.statuses.isLoading || !state.scenarioView.data) return;

    let nodes: NodeModel[] = [];
    let edges: EdgeModel[] = [];
    let rootId: string | number | null = null;
    // TODO **Проверка интерфейсов
    for (let el of state.scenarioView.elements) {
        if (!!(el as Node).data) {
            nodes.push((el as NodeModel));
            if ((el as Node).type === 'START') {
                rootId = (el as Node).id;
            }
        }
        if (!(el as Edge).data) {
            edges.push((el as EdgeModel));
        }
    }
    if (!rootId || nodes.length < 1 || edges.length < 1) return;

    dispatch(setLoading());
    putScenarioById({...state.scenarioView.data, edges, nodes, rootId})
        .then(res => {
            dispatch(setSuccess());
        })
        .catch((err: DefaultAxiosError) => {
            dispatch(setError(err.response?.data.message || 'Ошибка при сохранении сценария'));
        });
};

export const {
    setLoading,
    setSuccess,
    setError,
    setData,
    resetData,
    resetAll,
    resetElements,
    setElements,
    changeReplica,
    changeWaitingTime,
    changeNeedAnswer,
    removeAnswer,
    removeAllAnswers,
    addAnswer,
    changeAnswer,
    addEdge,
    removeAllOutputsEdge,
    changeName,
    changePosition,
    addNode,
} = scenarioSlice.actions;

export const scenarioReducers = scenarioSlice.reducer;
