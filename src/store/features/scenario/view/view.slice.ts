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
import {json} from 'msw/lib/types/context';

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
        changeReplica: (state: ScenarioState, action: PayloadAction<{ id: string, value: string }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.id ? {
                ...el,
                data: {...el.data, replica: action.payload.value}
            } : el);
        },
        changeNeedAnswer: (state: ScenarioState, action: PayloadAction<{ id: string, value: boolean }>) => {

            const target = (state.elements.find(el => (el as Edge).source === action.payload.id) as Edge)?.target;

            state.elements = state.elements
                .filter(el => (el as Edge).source !== action.payload.id)
                .map(el => el.id === action.payload.id ? {
                    ...el,
                    data: {...el.data, needAnswer: action.payload.value}
                } : el);

            if (target) {
                state.elements = _addEdge({
                    source: action.payload.id,
                    sourceHandle: action.payload.value ? '1' : null,
                    target,
                    targetHandle: null,
                    id: String(getUniqueId())
                }, state.elements);
            }
        },
        changeWaitingTime: (state: ScenarioState, action: PayloadAction<{ id: string, value: number }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.id ? {
                ...el,
                data: {...el.data, waitingTime: action.payload.value}
            } : el);
        },
        addAnswer: (state: ScenarioState, action: PayloadAction<{ id: string, value: number }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.id ? {
                ...el,
                data: {
                    ...el.data,
                    answers: [...(el.data.answers || []), {id: getUniqueId(), button: String(action.payload.value)}]
                }
            } : el);
        },
        changeAnswer: (state: ScenarioState, action: PayloadAction<{ id: string, newAnswer: number, oldAnswer: number }>) => {
            // const oldEdge = state.elements
            //     .find(el =>
            //         (el as Edge).source === action.payload.id &&
            //         (el as Edge).sourceHandle === String(action.payload.oldAnswer)) as Edge;

            // console.log(copy(action.payload));
            // console.log(copy(state.elements));
            // console.log(JSON.stringify(oldEdge));

            // if (oldEdge) {
            //     state.elements = updateEdge(
            //         oldEdge,
            //         {
            //             target: oldEdge.target,
            //             targetHandle: oldEdge.targetHandle || null,
            //             source: oldEdge.source,
            //             sourceHandle: String(action.payload.newAnswer)
            //         },
            //         state.elements.map(el => el.id === action.payload.id ? {
            //             ...el,
            //             data: {
            //                 ...el.data,
            //                 answers: el.data.answers.map((ans: AnswerModel) =>
            //                     ans.button === String(action.payload.oldAnswer) ?
            //                         {button: String(action.payload.newAnswer)} :
            //                         ans),
            //             },
            //         } : el));
            // } else {
            //     state.elements = state.elements.map(el => el.id === action.payload.id ? {
            //         ...el,
            //         data: {
            //             ...el.data,
            //             answers: el.data.answers.map((ans: AnswerModel) =>
            //                 ans.button === String(action.payload.oldAnswer) ?
            //                     {button: String(action.payload.newAnswer)} :
            //                     ans),
            //         },
            //     } : el);
            // }

            // if (oldEdge) {
            //     state.elements = state.elements
            //         .filter(el =>
            //             !((el as Edge).source === action.payload.id &&
            //                 (el as Edge).sourceHandle === String(action.payload.oldAnswer)))
            //         .map(el => el.id === action.payload.id ? {
            //             ...el,
            //             data: {
            //                 ...el.data,
            //                 answers: el.data.answers.map((ans: AnswerModel) =>
            //                     ans.button === String(action.payload.oldAnswer) ?
            //                         {button: String(action.payload.newAnswer)} :
            //                         ans),
            //             },
            //         } : el);
            //
            //     state.elements = _addEdge(
            //         {
            //             id: getUniqueId(),
            //             target: oldEdge.target,
            //             targetHandle: oldEdge.targetHandle,
            //             source: oldEdge.source,
            //             sourceHandle: String(action.payload.newAnswer)
            //         },
            //         state.elements);
            // } else {
            //     state.elements = state.elements.map(el => el.id === action.payload.id ? {
            //         ...el,
            //         data: {
            //             ...el.data,
            //             answers: el.data.answers.map((ans: AnswerModel) =>
            //                 ans.button === String(action.payload.oldAnswer) ?
            //                     {button: String(action.payload.newAnswer)} :
            //                     ans),
            //         },
            //     } : el);
            // }

            state.elements = state.elements.map(el => el.id === action.payload.id ? {
                ...el,
                data: {
                    ...el.data,
                    answers: el.data.answers.map((ans: AnswerModel): AnswerModel =>
                        ans.button === String(action.payload.oldAnswer) ?
                            {...ans, button: String(action.payload.newAnswer)} :
                            ans),
                },
            } : el);
        },
        removeAnswer: (state: ScenarioState, action: PayloadAction<{ id: string, value: number }>) => {
            state.elements = state.elements
                .filter(el => !((el as Edge).source === action.payload.id &&
                    (el as Edge).sourceHandle === String(action.payload.value)))
                .map(el => el.id === action.payload.id ? {
                    ...el,
                    data: {
                        ...el.data,
                        answers: el.data.answers.filter((ans: AnswerModel) => ans.button !== String(action.payload.value))
                    }
                } : el);
        },
        removeAllAnswers: (state: ScenarioState, action: PayloadAction<{ id: string }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.id ? {
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
        changePosition: (state: ScenarioState, action: PayloadAction<{ id: string, x: number, y: number }>) => {
            state.elements = state.elements.map(el => el.id === action.payload.id ? {
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
                }
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
                    // TODO убрать костыль
                    data: {
                        ...value.data,
                        answers: value.data.answers?.map((ans): AnswerModel => {
                            return {id: ans.button, button: ans.button};
                        })
                    },
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
