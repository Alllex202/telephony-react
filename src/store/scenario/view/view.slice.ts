import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {
    AnswerModel,
    CallersBaseHeaderModel,
    EdgeModel,
    getCallersBaseHeaderById,
    getCallersBasesHeader,
    getScenarioById,
    NodeDataModel,
    NodeModel,
    NodeTypes,
    putScenarioById,
    ScenarioModel
} from 'core/api'
import {DefaultAxiosError, FetchStatuses, IdKey} from 'shared/types'
import {RootState} from 'store/index'
import {
    addEdge as _addEdge,
    ArrowHeadType,
    Connection,
    Edge,
    Elements,
    isEdge,
    isNode,
    Node,
    removeElements as _removeElements,
    XYPosition
} from 'react-flow-renderer'
import {copy, getUniqueId} from 'shared/utils'
import {handlerError} from 'shared/middleware'
import {enqueueSnackbar} from 'features/notifications/store'

type ElementType = Node<NodeDataModel> | Edge

type ExtraScenarioModel = Pick<ScenarioModel, 'id' | 'name' | 'created'> & {
    startId: string | null
    finishId: string | null
    elements: ElementType[]
}

interface ScenarioState {
    callersBases: {
        data: CallersBaseHeaderModel[]
        status: FetchStatuses
    }
    callersBaseSelected: {
        data: CallersBaseHeaderModel | null
        status: FetchStatuses
    }
    scenario: {
        data: {
            remote: ScenarioModel | null
            actual: ExtraScenarioModel | null
        }
        status: FetchStatuses
    }
}

const initialState: ScenarioState = {
    callersBases: {
        data: [],
        status: {}
    },
    callersBaseSelected: {
        data: null,
        status: {}
    },
    scenario: {
        data: {
            remote: null,
            actual: null
        },
        status: {}
    }
}

type ScenarioResultTypes = keyof ScenarioState

const arrowHeadType = ArrowHeadType.Arrow

const edgeType = 'smoothstep'

const dragHandle = '.draggable-handle'

export const scenarioSlice = createSlice({
    name: 'scenarioView',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{type: ScenarioResultTypes}>) => {
            state[action.payload.type].status = {isLoading: true}
        },
        setSuccess: (state, action: PayloadAction<{type: ScenarioResultTypes}>) => {
            state[action.payload.type].status = {isSuccess: true}
        },
        setError: (state, action: PayloadAction<{type: ScenarioResultTypes; error: string}>) => {
            state[action.payload.type].status = {isError: true, error: action.payload.error}
        },
        setScenario: (state, action: PayloadAction<ScenarioModel>) => {
            const elements: ElementType[] = []
            let startId: string | null = null
            let finishId: string | null = null

            action.payload.nodes.forEach((_node) => {
                if (_node.type === 'START') {
                    startId = _node.id
                }
                if (_node.type === 'FINISH') {
                    finishId = _node.id
                }
                const node = {
                    ..._node,
                    selectable: true,
                    dragHandle: dragHandle
                }
                elements.push(node)
            })
            action.payload.edges.forEach((_edge) => {
                const edge: Edge = {
                    ..._edge,
                    arrowHeadType: arrowHeadType,
                    type: edgeType
                }
                elements.push(edge)
            })

            state.scenario.data.remote = action.payload
            state.scenario.data.actual = {
                id: action.payload.id,
                name: action.payload.name,
                created: action.payload.created,
                elements,
                startId,
                finishId
            }
        },
        setCallersBases: (state, action: PayloadAction<CallersBaseHeaderModel[]>) => {
            state.callersBases.data = action.payload
        },
        setCallersBaseSelected: (state, action: PayloadAction<CallersBaseHeaderModel | null>) => {
            state.callersBaseSelected.data = action.payload
        },
        changeName: (state, action: PayloadAction<string>) => {
            if (state.scenario.data.actual) {
                state.scenario.data.actual.name = action.payload
            }
        },
        resetScenarioView: (state, action: PayloadAction<{type: ScenarioResultTypes}>) => {
            state[action.payload.type] = copy(initialState[action.payload.type])
        },
        addNode: (state, action: PayloadAction<{nodeType: NodeTypes; position: XYPosition}>) => {
            if (
                !state.scenario.data.actual ||
                (state.scenario.data.actual.startId && action.payload.nodeType === 'START') ||
                (state.scenario.data.actual.finishId && action.payload.nodeType === 'FINISH')
            ) {
                return
            }

            const newNode: Node<NodeDataModel> = {
                id: getUniqueId(),
                type: action.payload.nodeType,
                position: action.payload.position,
                data: {
                    needAnswer: false,
                    answers: null,
                    waitingTime: 0,
                    replica: ''
                },
                selectable: true,
                dragHandle: dragHandle
            }
            if (action.payload.nodeType === 'START') {
                state.scenario.data.actual.startId = newNode.id
            }
            if (action.payload.nodeType === 'FINISH') {
                state.scenario.data.actual.finishId = newNode.id
            }
            state.scenario.data.actual.elements = [...state.scenario.data.actual.elements, newNode]
        },
        addEdge: (state, action: PayloadAction<Edge | Connection>) => {
            if (
                !state.scenario.data.actual ||
                state.scenario.data.actual.elements.some(
                    (el) =>
                        ((el as Edge).source === action.payload.target &&
                            (el as Edge).target === action.payload.source) ||
                        ((el as Edge).source === action.payload.source &&
                            (el as Edge).source === state.scenario.data.actual?.startId) ||
                        ((el as Edge).source === action.payload.source &&
                            (el as Edge).sourceHandle === action.payload.sourceHandle)
                )
            ) {
                return
            }

            state.scenario.data.actual.elements = _addEdge(
                {
                    ...action.payload,
                    id: getUniqueId(),
                    arrowHeadType: arrowHeadType,
                    type: edgeType
                },
                state.scenario.data.actual.elements
            )
        },
        removeElements: (state, action: PayloadAction<Elements>) => {
            if (!state.scenario.data.actual) return

            if (action.payload.some((el) => (el as NodeModel).type === 'START')) {
                state.scenario.data.actual.startId = null
            }
            if (action.payload.some((el) => (el as NodeModel).type === 'FINISH')) {
                state.scenario.data.actual.finishId = null
            }
            state.scenario.data.actual.elements = _removeElements(
                action.payload,
                state.scenario.data.actual.elements
            )
        },
        changePositionElement: (
            state,
            action: PayloadAction<{elementId: string; x: number; y: number}>
        ) => {
            if (!state.scenario.data.actual) return

            state.scenario.data.actual.elements = state.scenario.data.actual.elements.map((el) =>
                el.id === action.payload.elementId
                    ? {
                          ...el,
                          position: {x: action.payload.x, y: action.payload.y}
                      }
                    : el
            )
        },
        setReplica: (state, action: PayloadAction<{elementId: string; replica: string}>) => {
            if (!state.scenario.data.actual) return

            state.scenario.data.actual.elements = state.scenario.data.actual.elements.map((el) =>
                el.id === action.payload.elementId
                    ? {
                          ...el,
                          data: {...el.data, replica: action.payload.replica}
                      }
                    : el
            )
        },
        setNeedAnswer: (state, action: PayloadAction<{elementId: string; isNeed: boolean}>) => {
            if (!state.scenario.data.actual) return

            const target = (
                state.scenario.data.actual.elements.find(
                    (el) => (el as Edge).source === action.payload.elementId
                ) as Edge
            )?.target
            const answerId = getUniqueId()

            state.scenario.data.actual.elements = state.scenario.data.actual.elements
                .filter((el) => (el as Edge).source !== action.payload.elementId)
                .map((el) =>
                    (el as Node).id === action.payload.elementId
                        ? {
                              ...el,
                              data: {
                                  ...el.data,
                                  answers: action.payload.isNeed
                                      ? [{id: answerId, button: '1'}]
                                      : null,
                                  waitingTime: 30 * 1000,
                                  needAnswer: action.payload.isNeed
                              }
                          }
                        : el
                )

            if (target) {
                state.scenario.data.actual.elements = _addEdge(
                    {
                        source: action.payload.elementId,
                        sourceHandle: action.payload.isNeed ? answerId : null,
                        target,
                        targetHandle: null,
                        id: getUniqueId(),
                        arrowHeadType: arrowHeadType,
                        type: edgeType
                    },
                    state.scenario.data.actual.elements
                )
            }
        },
        setWaitingTime: (state, action: PayloadAction<{elementId: string; time: number}>) => {
            if (!state.scenario.data.actual) return

            state.scenario.data.actual.elements = state.scenario.data.actual.elements.map((el) =>
                el.id === action.payload.elementId
                    ? {
                          ...el,
                          data: {...el.data, waitingTime: action.payload.time}
                      }
                    : el
            )
        },
        addAnswer: (state, action: PayloadAction<{elementId: string; button: string}>) => {
            if (!state.scenario.data.actual) return

            state.scenario.data.actual.elements = state.scenario.data.actual.elements.map((el) =>
                el.id === action.payload.elementId
                    ? {
                          ...el,
                          data: {
                              ...el.data,
                              answers: [
                                  ...(el.data.answers || []),
                                  {id: getUniqueId(), button: action.payload.button}
                              ]
                          }
                      }
                    : el
            )
        },
        removeAnswer: (state, action: PayloadAction<{elementId: string; answerId: string}>) => {
            if (!state.scenario.data.actual) return

            state.scenario.data.actual.elements = state.scenario.data.actual.elements
                .filter(
                    (el) =>
                        !(
                            (el as Edge).source === action.payload.elementId &&
                            (el as Edge).sourceHandle === action.payload.answerId
                        )
                )
                .map((el) =>
                    el.id === action.payload.elementId
                        ? {
                              ...el,
                              data: {
                                  ...el.data,
                                  answers: el.data.answers.filter(
                                      (ans: AnswerModel) => ans.id !== action.payload.answerId
                                  )
                              }
                          }
                        : el
                )
        },
        changeAnswer: (
            state,
            action: PayloadAction<{elementId: string; newButton: string; oldButton: string}>
        ) => {
            if (!state.scenario.data.actual) return

            state.scenario.data.actual.elements = state.scenario.data.actual.elements.map((el) =>
                el.id === action.payload.elementId
                    ? {
                          ...el,
                          data: {
                              ...el.data,
                              answers: el.data.answers.map(
                                  (ans: AnswerModel): AnswerModel =>
                                      ans.button === action.payload.oldButton
                                          ? {...ans, button: action.payload.newButton}
                                          : ans
                              )
                          }
                      }
                    : el
            )
        }
    }
})

export const getScenario = (id: IdKey) => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'scenario'}))
    getScenarioById(id)
        .then((res) => {
            dispatch(setScenario(res.data))
            dispatch(setSuccess({type: 'scenario'}))
        })
        .catch(
            handlerError(dispatch, (err: DefaultAxiosError) => {
                dispatch(
                    setError({type: 'scenario', error: err.response?.data.message || 'getScenario'})
                )
            })
        )
}

export const getCallersBases = () => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'callersBases'}))
    getCallersBasesHeader({page: 0, size: 100})
        .then((res) => {
            dispatch(setCallersBases(res.data.content))
            dispatch(setSuccess({type: 'callersBases'}))
        })
        .catch(
            handlerError(dispatch, (err: DefaultAxiosError) => {
                dispatch(
                    setError({
                        type: 'callersBases',
                        error: err.response?.data.message || 'getCallersBases'
                    })
                )
            })
        )
}

export const getCallersBaseSelected = () => (dispatch: Dispatch, getState: () => RootState) => {
    const {
        scenarioView: {
            scenario: {
                data: {remote}
            }
        }
    } = getState()
    const selectedId = remote?.connectedCallerBaseId
    if (selectedId) {
        dispatch(setLoading({type: 'callersBaseSelected'}))
        getCallersBaseHeaderById(selectedId)
            .then((res) => {
                dispatch(setCallersBaseSelected(res.data))
                dispatch(setSuccess({type: 'callersBaseSelected'}))
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    dispatch(
                        setError({
                            type: 'callersBaseSelected',
                            error: err.response?.data.message || 'getCallersBaseSelected'
                        })
                    )
                })
            )
    } else {
        dispatch(setCallersBaseSelected(null))
        dispatch(setSuccess({type: 'callersBaseSelected'}))
    }
}

export const saveScenario = () => (dispatch: Dispatch, getState: () => RootState) => {
    const {
        scenarioView: {
            scenario: {
                data: {actual}
            },
            callersBaseSelected
        }
    } = getState()
    let nodes: NodeModel[] = []
    let edges: EdgeModel[] = []
    if (!actual?.startId) return

    dispatch(setLoading({type: 'scenario'}))

    for (let el of actual.elements) {
        if (isNode(el)) {
            nodes.push(el as NodeModel)
        }
        if (isEdge(el)) {
            edges.push(el as EdgeModel)
        }
    }

    putScenarioById({
        id: actual.id,
        name: actual.name,
        created: actual.created,
        connectedCallerBaseId: callersBaseSelected.data?.id ?? null,
        rootId: actual.startId,
        edges,
        nodes
    })
        .then((res) => {
            dispatch(setScenario(res.data))
            dispatch(setSuccess({type: 'scenario'}))
            dispatch(enqueueSnackbar({message: 'Сценарий сохранен', type: 'SUCCESS'}))
        })
        .catch(
            handlerError(dispatch, (err: DefaultAxiosError) => {
                dispatch(
                    setError({
                        type: 'scenario',
                        error: err.response?.data.message || 'saveScenario'
                    })
                )
            })
        )
}

export const {
    setLoading,
    setSuccess,
    setError,
    removeAnswer,
    addAnswer,
    changeAnswer,
    addEdge,
    changeName,
    addNode,
    removeElements,
    changePositionElement,
    resetScenarioView,
    setNeedAnswer,
    setReplica,
    setWaitingTime,
    setCallersBaseSelected,
    setScenario,
    setCallersBases
} = scenarioSlice.actions

export const scenarioReducers = scenarioSlice.reducer
