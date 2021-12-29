import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import BtnCircle from 'components/ui-kit/btn-circle'
import {Controls, useStoreState, useZoomPanHelper} from 'react-flow-renderer'
import BtnSecond from 'components/ui-kit/btn-second'
import {Link} from 'react-router-dom'
import routes from 'routing/routes'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import {CallersBaseHeaderModel} from 'core/api'
import {getCallersBasesHeader} from 'core/api/requests'
import {DefaultAxiosError} from 'shared/types/base-response-error'
import Menu from 'components/ui-kit/menu'
import MenuItem from 'components/ui-kit/menu-item'
import {getCallersBaseHeader, setConnectionId} from 'store/features/scenario/view'
import Tag from 'components/ui-kit/tag'
import cardStyles from 'shared/styles/card/styles.module.scss'

const maxShowVariables = 10

const ScenarioRightSidebar = () => {
    const {zoomIn, zoomOut, fitView} = useZoomPanHelper()
    const {transform} = useStoreState(state => state)
    const {data, statuses, callersBaseHeader} = useSelector((state: RootState) => state.scenarioView)
    const currentZoom = transform[2]
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)
    const dispatch = useDispatch()
    const [callersBasesHeader, setCallersBasesHeader] = useState<CallersBaseHeaderModel[] | null>(null)

    useEffect(() => {
        getCallersBasesHeader({page: 0, size: 100})
            .then(res => {
                setCallersBasesHeader(res.data.content)
            })
            .catch((err: DefaultAxiosError) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        dispatch(getCallersBaseHeader())
        // eslint-disable-next-line
    }, [data?.connectedCallerBaseId])

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
        if (statuses.isLoading) {
            return
        }

        setAnchorEl(e.currentTarget)
    }

    const onCloseMenu = () => {
        setAnchorEl(null)
    }

    const onConnect = (id: number | string) => {
        if (statuses.isLoading) {
            return
        }

        onCloseMenu()
        dispatch(setConnectionId(id))
    }

    const onDisconnect = () => {
        if (statuses.isLoading) {
            return
        }

        dispatch(setConnectionId(null))
    }

    return (
        <div className={styles.rightSidebar}>
            <div className={styles.part}>
                <div className={styles.subtitle}>Масштаб</div>
                <Controls className={styles.controls}
                          showFitView={false}
                          showInteractive={false}
                          showZoom={false}>
                    <div className={styles.percent}>{(currentZoom * 100).toFixed(0)}%</div>
                    <div className={styles.buttons}>
                        <BtnCircle iconName={'remove'}
                                   iconType={'round'}
                                   className={styles.btn}
                                   onClick={onZoomOut}/>
                        <BtnCircle iconName={'add'}
                                   iconType={'round'}
                                   className={styles.btn}
                                   onClick={onZoomIn}/>
                        <BtnCircle iconName={'crop_free'}
                                   iconType={'round'}
                                   className={styles.btn}
                                   onClick={onFitView}/>
                    </div>
                </Controls>
            </div>
            <BtnSecond text={'Запустить'}
                       className={styles.btnRun}
                       iconName={'play_arrow'}
                       iconType={'round'}
                       iconPosition={'end'}/>
            {
                callersBasesHeader !== null &&
                <div className={styles.infoConnection}>
                    <div className={styles.part}>
                        <div className={styles.subtitle}>Прикрепленная база</div>
                        {
                            callersBaseHeader &&
                            <Link className={styles.link}
                                  to={routes.callersBaseView(callersBaseHeader.id)}>{callersBaseHeader.name}</Link>
                        }
                    </div>
                    {
                        callersBaseHeader &&
                        <div className={styles.part}>
                            <div className={styles.subtitle}>Переменные</div>
                            <div className={styles.tags}>
                                {callersBaseHeader.columns.slice(0, maxShowVariables)
                                    .map(el =>
                                        <Tag text={`#${el.currentName}`}
                                             key={el.id}/>)}
                                {callersBaseHeader.columns.length - maxShowVariables > 0 &&
                                <Tag text={`+${callersBaseHeader.columns.length - maxShowVariables}`}
                                     className={cardStyles.tag}/>}
                            </div>
                        </div>
                    }
                    {
                        data?.connectedCallerBaseId
                        ? <BtnSecond className={styles.btnDisconnect}
                                     text={'Разорвать'}
                                     iconName={'link_off'}
                                     iconType={'round'}
                                     iconPosition={'end'}
                                     onClick={onDisconnect}/>
                        : <BtnSecond className={styles.btnConnect}
                                     text={'Прикрепить'}
                                     iconName={'link'}
                                     iconType={'round'}
                                     iconPosition={'end'}
                                     onClick={onOpenMenu}
                                     disabled={callersBasesHeader === null || callersBasesHeader.length === 0}/>
                    }
                    <Menu anchorEl={anchorEl}
                          open={!!anchorEl}
                          onClose={onCloseMenu}>
                        {callersBasesHeader?.map(el => <MenuItem key={el.id}
                                                                 onClick={() => onConnect(el.id)}>{el.name}</MenuItem>)}
                    </Menu>
                </div>
            }
        </div>
    )
}

export default ScenarioRightSidebar
