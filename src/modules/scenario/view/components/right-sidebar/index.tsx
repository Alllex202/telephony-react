import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import BtnCircle from 'components/ui-kit/btn-circle'
import {Controls, useStoreState, useZoomPanHelper} from 'react-flow-renderer'
import BtnSecond from 'components/ui-kit/btn-second'
import {Link, useParams} from 'react-router-dom'
import {routes} from 'routing/routes'
import {useDispatch} from 'react-redux'
import Menu from 'components/ui-kit/menu'
import MenuItem from 'components/ui-kit/menu-item'
import {
    getCallersBases,
    getCallersBaseSelected,
    resetScenarioView,
    setCallersBaseSelected
} from 'store/scenario/view'
import Tag from 'components/ui-kit/tag'
import cardStyles from 'shared/styles/card/styles.module.scss'
import {useSelectorApp} from 'shared/hoocks'
import {CallersBaseHeaderModel} from 'core/api'

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
                        <BtnCircle
                            iconName={'remove'}
                            iconType={'round'}
                            className={styles.btn}
                            onClick={onZoomOut}
                        />
                        <BtnCircle
                            iconName={'add'}
                            iconType={'round'}
                            className={styles.btn}
                            onClick={onZoomIn}
                        />
                        <BtnCircle
                            iconName={'crop_free'}
                            iconType={'round'}
                            className={styles.btn}
                            onClick={onFitView}
                        />
                    </div>
                </Controls>
            </div>
            <BtnSecond
                text={'Запустить'}
                className={styles.btnRun}
                iconName={'play_arrow'}
                iconType={'round'}
                iconPosition={'end'}
            />

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
                                    <Tag text={`#${el.currentName}`} key={el.id} />
                                ))}
                            {callersBaseSelected.data.columns.length - maxShowVariables > 0 && (
                                <Tag
                                    text={`+${
                                        callersBaseSelected.data.columns.length - maxShowVariables
                                    }`}
                                    className={cardStyles.tag}
                                />
                            )}
                        </div>
                    </div>
                )}
                {callersBaseSelected.data !== null ? (
                    <BtnSecond
                        className={styles.btnDisconnect}
                        text={'Разорвать'}
                        iconName={'link_off'}
                        iconType={'round'}
                        iconPosition={'end'}
                        onClick={onDisconnect}
                    />
                ) : (
                    <BtnSecond
                        className={styles.btnConnect}
                        text={'Прикрепить'}
                        iconName={'link'}
                        iconType={'round'}
                        iconPosition={'end'}
                        onClick={onOpenMenu}
                        disabled={
                            !callersBases.status.isSuccess ||
                            callersBaseSelected.status.isLoading ||
                            callersBases.data.length === 0
                        }
                    />
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
