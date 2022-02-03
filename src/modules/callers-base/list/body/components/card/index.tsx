import React, {useState} from 'react'
import cardStyles from 'shared/styles/card/styles.module.scss'
// import styles from './styles.module.scss';
import {CallersBaseHeaderModel} from 'core/api'
import Card from 'components/ui-kit/card'
import Tag from 'components/ui-kit/tag'
import Icon from 'components/ui-kit/icon'
import {formatDate} from 'shared/utils/format-date'
import {classNames} from 'shared/utils'
import BtnCircle from 'components/ui-kit/btn-circle'
import Menu from 'components/ui-kit/menu'
import MenuItem from 'components/ui-kit/menu-item'
import {deleteCallersBase} from 'core/api/requests'
import {FetchStatuses} from 'shared/types/fetch-statuses'
import {routes} from 'routing/routes'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteCallersBaseById} from 'store/callers-bases/list'
import {enqueueSnackbar} from 'features/notifications/store'
import {handlerError} from 'shared/middleware'

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

    return (
        <Link to={routes.callersBase.view(data.id)} className={statuses.isLoading ? 'd-none' : ''}>
            <Card className={classNames(className, cardStyles.card)} isActive={!!anchorEl}>
                <div className={cardStyles.wrapper}>
                    <div onClick={(e) => e.preventDefault()} className={cardStyles.options_wrapper}>
                        <BtnCircle
                            iconName={'more_horiz'}
                            iconType={'round'}
                            className={cardStyles.options_btn}
                            onClick={openOptions}
                            isActive={!!anchorEl}
                        />
                        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeOptions}>
                            <MenuItem
                                onClick={handlerDelete}
                                isDanger
                                iconName={'delete_forever'}
                                iconType={'round'}
                            >
                                Удалить
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className={cardStyles.header}>
                        <h2 className={cardStyles.title}>{data.name}</h2>
                        <div className={cardStyles.description}>
                            <div className={cardStyles.info}>
                                <Icon
                                    iconName={'calendar_today'}
                                    iconType={'round'}
                                    className={cardStyles.icon}
                                />
                                {formatDate(data.created)}
                            </div>
                            <div className={cardStyles.info}>
                                <Icon
                                    iconName={'table_rows'}
                                    iconType={'round'}
                                    className={cardStyles.icon}
                                />
                                {data.countCallers} эл
                            </div>
                        </div>
                    </div>
                    <div className={cardStyles.tags}>
                        {data.columns.slice(0, 5).map((el) => (
                            <Tag
                                text={`#${el.nameInTable}`}
                                key={el.id}
                                className={cardStyles.tag}
                            />
                        ))}
                        {data.columns.length - 5 > 0 && (
                            <Tag text={`+${data.columns.length - 5}`} className={cardStyles.tag} />
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default CallersBaseCard
