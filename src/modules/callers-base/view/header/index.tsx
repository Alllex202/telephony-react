import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import BtnSecond from 'components/ui-kit/btn-second'
import Btn from 'components/ui-kit/btn'
import {useHistory} from 'react-router-dom'
import routes from 'routing/routes'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import {useQuery} from 'shared/hoocks/use-query'
import {deleteCallersBase} from 'core/api/requests'
import {enqueueSnackbar} from 'store/features/notifications'
import {handlerError} from 'shared/middleware'

function CallersBaseViewHeader() {
    const dispatch = useDispatch()
    const {header, statusesHeader} = useSelector((state: RootState) => state.callersBaseView)
    const history = useHistory()
    const [created, setCreated] = useState<boolean>(!!useQuery('created').values.created[0])

    useEffect(() => {
        if (created && header?.id) {
            history.replace(routes.callersBaseView(header.id))
        }
    }, [header?.id])

    function handlerBack() {
        if (created && header?.id) {
            deleteCallersBase(header.id)
                .then(() => {
                    dispatch(enqueueSnackbar({type: 'INFO', message: 'База клиентов удалена'}))
                    history.push(routes.callersBaseList())
                })
                .catch(handlerError(dispatch))
        } else {
            history.push(routes.callersBaseList())
        }
    }

    function handlerCalling() {
        // TODO Создать обзвон с текущей базой
        history.push(routes.callingCreate())
    }

    function handlerSave() {
        if (created && header?.id) {
            setCreated(false)
            history.replace(routes.callersBaseView(header.id))
        }
    }

    return (
        <div className={styles.header}>
            <BtnSecond className={styles.back}
                       text={created ? 'Отмена' : 'Назад'}
                       iconType={'round'}
                       iconName={'arrow_back'}
                       onClick={handlerBack}/>
            {header &&
            <BtnSecond className={styles.calling}
                       text={'Обзванивание'}
                       iconType={'round'}
                       iconName={'add_ic_call'}
                       iconPosition={'end'}
                       onClick={handlerCalling}
                       disabled={statusesHeader.isLoading}/>}
            {
                created &&
                <Btn className={styles.save}
                     text={'Сохранить'}
                     onClick={handlerSave}
                     disabled={statusesHeader.isLoading}/>
            }
        </div>
    )
}

export default CallersBaseViewHeader
