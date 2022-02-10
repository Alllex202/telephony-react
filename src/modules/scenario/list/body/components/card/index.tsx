import React, {useState} from 'react'
import cardStyles from 'shared/styles/card/styles.module.scss'
import styles from './styles.module.scss'
import {DefaultAxiosError, FetchStatuses} from 'shared/types'
import {useDispatch} from 'react-redux'
import {deleteScenario, ScenarioInfoModel} from 'core/api'
import {deleteScenarioById} from 'store/scenario/list'
import {Link} from 'react-router-dom'
import {routes} from 'routing/routes'
import Card from 'components/ui-kit/card'
import {classNames, formatDate} from 'shared/utils'
import {enqueueSnackbar} from 'features/notifications/store'
import {handlerError} from 'shared/middleware'
import {
    CalendarTodayRounded,
    DeleteForeverRounded,
    MoreHorizRounded,
    TableRowsRounded
} from '@mui/icons-material'
import {IconButton, Menu, MenuItem} from '@mui/material'

type Props = {
    data: ScenarioInfoModel
    className?: string
}

const ScenarioCard = ({data, className}: Props) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)
    const [statuses, setStatuses] = useState<FetchStatuses>({})
    const dispatch = useDispatch()

    const openOptions = (e: any) => {
        setAnchorEl(e.currentTarget)
    }

    const closeOptions = () => {
        setAnchorEl(null)
    }

    const handlerDelete = () => {
        closeOptions()
        setStatuses({isLoading: true, isSuccess: false, isError: false})
        deleteScenario(data.id)
            .then((res) => {
                dispatch(deleteScenarioById(data.id))
                dispatch(enqueueSnackbar({message: 'Сценарий удален', type: 'SUCCESS'}))
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    setStatuses({isLoading: false, isSuccess: false, isError: true})
                })
            )
    }

    const preventDefault = (e: React.MouseEvent) => {
        e.preventDefault()
    }

    return (
        <Link to={routes.scenario.view(data.id)} className={statuses.isLoading ? 'd-none' : ''}>
            <Card
                className={classNames(className, cardStyles.card, styles.card)}
                isActive={!!anchorEl}
            >
                <div className={cardStyles.wrapper}>
                    <div onClick={preventDefault} className={cardStyles.options_wrapper}>
                        <IconButton onClick={openOptions} color={'black'}>
                            <MoreHorizRounded fontSize={'large'} className={cardStyles.icon} />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeOptions}>
                            <MenuItem onClick={handlerDelete} color={'red'}>
                                <DeleteForeverRounded className={cardStyles.icon} />
                                Удалить
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className={cardStyles.header}>
                        <h2 className={cardStyles.title}>{data.name}</h2>
                        <div className={cardStyles.description}>
                            <div className={cardStyles.info}>
                                <CalendarTodayRounded className={cardStyles.icon} />
                                {formatDate(data.created)}
                            </div>
                            <div className={cardStyles.info}>
                                <TableRowsRounded className={cardStyles.icon} />
                                {data.countSteps} ш
                            </div>
                        </div>
                    </div>
                    <div className={cardStyles.tags} />
                </div>
            </Card>
        </Link>
    )
}

export default ScenarioCard
