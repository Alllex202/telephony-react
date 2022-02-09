import React, {useState} from 'react'
import cardStyles from 'shared/styles/card/styles.module.scss'
import {CallersBaseHeaderModel, deleteCallersBase} from 'core/api'
import Card from 'components/ui-kit/card'
import {classNames, formatDate} from 'shared/utils'
import {FetchStatuses} from 'shared/types'
import {routes} from 'routing/routes'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteCallersBaseById} from 'store/callers-bases/list'
import {enqueueSnackbar} from 'features/notifications/store'
import {handlerError} from 'shared/middleware'
import {Chip, IconButton, Menu, MenuItem} from '@mui/material'
import {
    CalendarTodayRounded,
    DeleteForeverRounded,
    MoreHorizRounded,
    TableRowsRounded
} from '@mui/icons-material'

type Props = {
    data: CallersBaseHeaderModel
    className?: string
}

const CallersBaseCard = ({data, className}: Props) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)
    const [statuses, setStatuses] = useState<FetchStatuses>({
        isLoading: false,
        isSuccess: false,
        isError: false
    })
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
        deleteCallersBase(data.id)
            .then((res) => {
                dispatch(deleteCallersBaseById(data.id))
                dispatch(enqueueSnackbar({message: 'База клиентов удалена', type: 'SUCCESS'}))
            })
            .catch(
                handlerError(dispatch, () => {
                    setStatuses({isLoading: false, isSuccess: false, isError: true})
                })
            )
    }

    const preventDefault = (e: React.MouseEvent) => {
        e.preventDefault()
    }

    return (
        <Link to={routes.callersBase.view(data.id)} className={statuses.isLoading ? 'd-none' : ''}>
            <Card className={classNames(className, cardStyles.card)} isActive={!!anchorEl}>
                <div className={cardStyles.wrapper}>
                    <div onClick={preventDefault} className={cardStyles.options_wrapper}>
                        <IconButton onClick={openOptions} color={'black'}>
                            <MoreHorizRounded fontSize={'large'} className={cardStyles.icon} />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeOptions}>
                            <MenuItem color={'red'} onClick={handlerDelete}>
                                <DeleteForeverRounded />
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
                                {data.countCallers} эл
                            </div>
                        </div>
                    </div>
                    <div className={cardStyles.tags}>
                        {data.columns.slice(0, 5).map((el) => (
                            <Chip variant={'square'} key={el.id} label={`#${el.nameInTable}`} />
                        ))}
                        {data.columns.length - 5 > 0 && (
                            <Chip variant={'square'} label={`+${data.columns.length - 5}`} />
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default CallersBaseCard
