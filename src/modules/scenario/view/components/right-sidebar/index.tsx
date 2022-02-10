import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import {Controls, useStoreState, useZoomPanHelper} from 'react-flow-renderer'
import {Link, useParams} from 'react-router-dom'
import {routes} from 'routing/routes'
import {useDispatch} from 'react-redux'
import {
    getCallersBases,
    getCallersBaseSelected,
    resetScenarioView,
    setCallersBaseSelected
} from 'store/scenario/view'
import {useSelectorApp} from 'shared/hoocks'
import {CallersBaseHeaderModel} from 'core/api'
import {Chip, IconButton, Menu, MenuItem} from '@mui/material'
import {
    AddRounded,
    CropFreeRounded,
    LinkOffRounded,
    LinkRounded,
    PlayArrowRounded,
    RemoveRounded
} from '@mui/icons-material'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'

const maxShowVariables = 10

const ScenarioRightSidebar = () => {
    const dispatch = useDispatch()
    const {
        scenarioView: {scenario, callersBaseSelected, callersBases}
    } = useSelectorApp()
    const {scenarioId} = useParams<{scenarioId: string}>()
    const {zoomIn, zoomOut, fitView} = useZoomPanHelper()
    const {transform} = useStoreState((state) => state)
    const currentZoom = transform[2]
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)

    const onZoomIn = () => {
        zoomIn(200)
    }

    const onZoomOut = () => {
        zoomOut(200)
    }

    const onFitView = () => {
        fitView({duration: 500, padding: 0.35}, 500)
    }

    const onOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (
            !callersBases.status.isSuccess ||
            callersBaseSelected.status.isLoading ||
            callersBases.data.length === 0
        )
            return

        setAnchorEl(e.currentTarget)
    }

    const onCloseMenu = () => {
        setAnchorEl(null)
    }

    const onConnect = (callersBase: CallersBaseHeaderModel) => () => {
        if (callersBaseSelected.status.isLoading) {
            return
        }

        onCloseMenu()
        dispatch(setCallersBaseSelected(callersBase))
    }

    const onDisconnect = () => {
        if (callersBaseSelected.status.isLoading) {
            return
        }

        dispatch(setCallersBaseSelected(null))
    }

    useEffect(() => {
        dispatch(getCallersBases())

        return () => {
            dispatch(resetScenarioView({type: 'callersBases'}))
            dispatch(resetScenarioView({type: 'callersBaseSelected'}))
        }
    }, [scenarioId])

    useEffect(() => {
        if (
            scenario.status.isSuccess === true &&
            scenario.data.remote?.connectedCallerBaseId !== callersBaseSelected.data?.id
        ) {
            dispatch(getCallersBaseSelected())
        }
    }, [scenario.status.isSuccess])

    return (
        <div className={styles.rightSidebar}>
            <div className={styles.part}>
                <div className={styles.subtitle}>Масштаб</div>
                <Controls
                    className={styles.controls}
                    showFitView={false}
                    showInteractive={false}
                    showZoom={false}
                >
                    <div className={styles.percent}>{(currentZoom * 100).toFixed(0)}%</div>
                    <div className={styles.buttons}>
                        <IconButton
                            className={styles.btn}
                            color={'black'}
                            onClick={onZoomOut}
                            size={'small'}
                        >
                            <RemoveRounded className={styles.icon} fontSize={'small'} />
                        </IconButton>
                        <IconButton
                            className={styles.btn}
                            color={'black'}
                            onClick={onZoomIn}
                            size={'small'}
                        >
                            <AddRounded className={styles.icon} fontSize={'small'} />
                        </IconButton>
                        <IconButton
                            className={styles.btn}
                            color={'black'}
                            onClick={onFitView}
                            size={'small'}
                        >
                            <CropFreeRounded className={styles.icon} fontSize={'small'} />
                        </IconButton>
                    </div>
                </Controls>
            </div>
            <BtnSecondary className={styles.btnRun} endIcon={<PlayArrowRounded />}>
                Запустить
            </BtnSecondary>

            <div className={styles.infoConnection}>
                <div className={styles.part}>
                    <div className={styles.subtitle}>Прикрепленная база</div>
                    {callersBaseSelected.status.isSuccess && callersBaseSelected.data && (
                        <Link
                            className={styles.link}
                            to={routes.callersBase.view(callersBaseSelected.data.id)}
                        >
                            {callersBaseSelected.data.name}
                        </Link>
                    )}
                </div>
                {callersBaseSelected.status.isSuccess && callersBaseSelected.data && (
                    <div className={styles.part}>
                        <div className={styles.subtitle}>Переменные</div>
                        <div className={styles.tags}>
                            {callersBaseSelected.data.columns
                                .slice(0, maxShowVariables)
                                .map((el) => (
                                    <Chip
                                        variant={'square'}
                                        label={`#${el.currentName}`}
                                        key={el.id}
                                    />
                                ))}
                            {callersBaseSelected.data.columns.length - maxShowVariables > 0 && (
                                <Chip
                                    variant={'square'}
                                    label={`+${
                                        callersBaseSelected.data.columns.length - maxShowVariables
                                    }`}
                                />
                            )}
                        </div>
                    </div>
                )}
                {callersBaseSelected.data !== null ? (
                    <BtnSecondary
                        className={styles.btnDisconnect}
                        onClick={onDisconnect}
                        endIcon={<LinkOffRounded />}
                        disabled={scenario.status.isLoading}
                    >
                        Разорвать
                    </BtnSecondary>
                ) : (
                    <BtnSecondary
                        className={styles.btnConnect}
                        onClick={onOpenMenu}
                        endIcon={<LinkRounded />}
                        disabled={
                            !callersBases.status.isSuccess ||
                            callersBaseSelected.status.isLoading ||
                            callersBases.data.length === 0 ||
                            scenario.status.isLoading
                        }
                    >
                        Прикрепить
                    </BtnSecondary>
                )}
                {callersBases.data.length > 0 && (
                    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={onCloseMenu}>
                        {callersBases.data.map((el) => (
                            <MenuItem key={el.id} onClick={onConnect(el)}>
                                {el.name}
                            </MenuItem>
                        ))}
                    </Menu>
                )}
            </div>
        </div>
    )
}

export default ScenarioRightSidebar
