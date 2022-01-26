import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import BtnSecond from 'components/ui-kit/btn-second'
import Btn from 'components/ui-kit/btn'
import {useHistory, useParams} from 'react-router-dom'
import {routes} from 'routing/routes'
import {useDispatch} from 'react-redux'
import {useQuery, useSelectorApp} from 'shared/hoocks'
import {deleteCallersBase} from 'core/api'
import {enqueueSnackbar} from 'features/notifications/store'
import {handlerError} from 'shared/middleware'

const CallersBaseViewHeader = () => {
    const dispatch = useDispatch()
    const {
        callersBaseView: {
            common: {data, statuses}
        }
    } = useSelectorApp()
    const history = useHistory()
    const {callersBaseId} = useParams<{callersBaseId: string}>()
    const [created, setCreated] = useState<boolean>(!!useQuery('created').values.created[0])

    const handlerBack = () => {
        if (created) {
            deleteCallersBase(callersBaseId)
                .then(() => {
                    dispatch(enqueueSnackbar({type: 'INFO', message: 'База клиентов удалена'}))
                    history.goBack()
                })
                .catch(handlerError(dispatch))
        } else {
            history.goBack()
        }
    }

    const handlerCalling = () => {
        // TODO Создать обзвон с текущей базой
        history.push(routes.calling.create())
    }

    const handlerSave = () => {
        if (!created) return

        setCreated(false)
        history.replace(routes.callersBase.view(callersBaseId))
    }

    useEffect(() => {
        if (created) {
            history.replace(routes.callersBase.view(callersBaseId))
        }
    }, [callersBaseId])

    return (
        <div className={styles.header}>
            <BtnSecond
                className={styles.back}
                text={created ? 'Отмена' : 'Назад'}
                iconType={'round'}
                iconName={'arrow_back'}
                onClick={handlerBack}
            />
            {data && (
                <BtnSecond
                    className={styles.calling}
                    text={'Обзванивание'}
                    iconType={'round'}
                    iconName={'add_ic_call'}
                    iconPosition={'end'}
                    onClick={handlerCalling}
                    disabled={statuses.isLoading}
                />
            )}
            {created && (
                <Btn
                    className={styles.save}
                    text={'Сохранить'}
                    onClick={handlerSave}
                    disabled={statuses.isLoading}
                />
            )}
        </div>
    )
}

export default CallersBaseViewHeader
