import React, {useState} from 'react'
import cardStyles from 'shared/styles/card/styles.module.scss'
import styles from './styles.module.scss'
import {DefaultAxiosError, FetchStatuses} from 'shared/types'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {routes} from 'routing/routes'
import Card from 'components/ui-kit/card'
import {classNames, formatDate} from 'shared/utils'
import {CallingModel, CallingStatusTypes, deleteCalling, startScheduledCalling} from 'core/api'
import {callingByIdMoveFromScheduledToRun, deleteCallingById} from 'store/calling/list'
import {IconButton, LinearProgress, Menu, MenuItem} from '@mui/material'
import {enqueueSnackbar} from 'features/notifications/store'
import {handlerError} from 'shared/middleware'
import {
    CalendarTodayRounded,
    DeleteForeverRounded,
    ForumRounded,
    MoreHorizRounded,
    PeopleAltRounded,
    PlayArrowRounded
} from '@mui/icons-material'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'

type Props = {
    data: CallingModel
    className?: string
    callingStatus: CallingStatusTypes
}

const CallingCard = ({data, callingStatus, className}: Props) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)
    const [statuses, setStatuses] = useState<FetchStatuses>({})
    const dispatch = useDispatch()

    const openOptions = (e: React.MouseEvent) => {
        setAnchorEl(e.currentTarget)
    }

    const closeOptions = () => {
        setAnchorEl(null)
    }

    const handlerDelete = () => {
        closeOptions()

        setStatuses({isLoading: true})
        deleteCalling(data.id)
            .then((res) => {
                if (data.id) {
                    dispatch(deleteCallingById({id: data.id, callingStatus}))
                }
                dispatch(enqueueSnackbar({message: 'Сценарий удален', type: 'SUCCESS'}))
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    setStatuses({isError: true})
                })
            )
    }

    const handlerCancel = () => {
        closeOptions()
        // todo Удаление обзвона
    }

    const handlerStop = () => {
        closeOptions()
        // todo Остановка обзвона
    }

    const handlerRun = (e: React.MouseEvent) => {
        e.preventDefault()
        closeOptions()

        setStatuses({isLoading: true})
        startScheduledCalling(data.id)
            .then(() => {
                data.id && dispatch(callingByIdMoveFromScheduledToRun(data.id))
                dispatch(enqueueSnackbar({message: 'Сценарий запущен', type: 'SUCCESS'}))
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    setStatuses({isError: true})
                })
            )
    }

    const preventDefault = (e: React.MouseEvent) => {
        e.preventDefault()
    }

    return (
        <Link
            to={
                callingStatus === 'SCHEDULED'
                    ? routes.calling.create(data.id)
                    : routes.calling.view(data.id)
            }
            className={statuses.isLoading ? 'd-none' : ''}
        >
            <Card
                className={classNames(className, cardStyles.card, styles.card)}
                isActive={!!anchorEl}
            >
                <div className={classNames(cardStyles.wrapper, styles.wrapper)}>
                    <div onClick={preventDefault} className={cardStyles.options_wrapper}>
                        <IconButton onClick={openOptions} color={'black'}>
                            <MoreHorizRounded fontSize={'large'} className={cardStyles.icon} />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeOptions}>
                            {callingStatus === 'SCHEDULED' && (
                                <MenuItem onClick={handlerCancel} color={'red'}>
                                    <DeleteForeverRounded />
                                    Отменить
                                </MenuItem>
                            )}
                            {callingStatus === 'RUN' && (
                                <MenuItem onClick={handlerStop} color={'red'}>
                                    <DeleteForeverRounded />
                                    Остановить
                                </MenuItem>
                            )}
                            {callingStatus === 'DONE' && (
                                <MenuItem onClick={handlerDelete} color={'red'}>
                                    <DeleteForeverRounded />
                                    Удалить
                                </MenuItem>
                            )}
                        </Menu>
                    </div>
                    <div className={cardStyles.header}>
                        <h2 className={cardStyles.title}>{data.name}</h2>
                        <div className={classNames(cardStyles.description, styles.description)}>
                            <div className={cardStyles.info}>
                                <CalendarTodayRounded className={cardStyles.icon} />
                                {formatDate(data.startDate)}
                            </div>
                            <div className={cardStyles.info}>
                                <ForumRounded className={cardStyles.icon} />
                                {data.scenario.name}
                            </div>
                            <div className={cardStyles.info}>
                                <PeopleAltRounded className={cardStyles.icon} />
                                {data.callersBase.name}
                            </div>
                        </div>
                    </div>
                    <div className={styles.body}>
                        {callingStatus === 'SCHEDULED' ? (
                            <BtnSecondary
                                className={styles.btnRun}
                                onClick={handlerRun}
                                endIcon={<PlayArrowRounded />}
                            >
                                Запустить сейчас
                            </BtnSecondary>
                        ) : (
                            <>
                                <LinearProgress
                                    value={data.percentEnd}
                                    variant={'determinate'}
                                    className={classNames(
                                        styles.progressBar,
                                        callingStatus === 'RUN' ? styles.running : ''
                                    )}
                                />
                                <span className={styles.label}>{data.percentEnd}% успешных</span>
                            </>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default CallingCard
