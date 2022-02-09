import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import {useHistory, useParams} from 'react-router-dom'
import {routes} from 'routing/routes'
import {useDispatch} from 'react-redux'
import {useQuery, useSelectorApp} from 'shared/hoocks'
import {deleteCallersBase} from 'core/api'
import {enqueueSnackbar} from 'features/notifications/store'
import {handlerError} from 'shared/middleware'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import {AddIcCallRounded, ArrowBackRounded} from '@mui/icons-material'
import BtnPrimary from 'components/ui-kit-v2/btn-primary'

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
            <BtnSecondary
                className={created ? styles.cancel : styles.back}
                startIcon={<ArrowBackRounded />}
                onClick={handlerBack}
            >
                {created ? 'Отменить' : 'Назад'}
            </BtnSecondary>
            {data && (
                <BtnSecondary
                    className={styles.calling}
                    endIcon={<AddIcCallRounded />}
                    onClick={handlerCalling}
                    disabled={statuses.isLoading}
                >
                    Обзванивание
                </BtnSecondary>
            )}
            {created && (
                <BtnPrimary
                    className={styles.save}
                    onClick={handlerSave}
                    disabled={statuses.isLoading}
                >
                    Сохранить
                </BtnPrimary>
            )}
        </div>
    )
}

export default CallersBaseViewHeader
