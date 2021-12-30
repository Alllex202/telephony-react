import React from 'react'
import styles from './styles.module.scss'
import {SnackbarKey, SnackbarMessage} from 'notistack'
import {NotificationType} from 'store/features/notifications/notification.slice'
import {classNames} from 'shared/utils'

type Props = {
    key: SnackbarKey
    message: SnackbarMessage
    type: NotificationType
}

const Notification = ({key, message, type = 'DEFAULT'}: Props) => {
    const getClassByType = (): string => {
        switch (type) {
            case 'DEFAULT':
                return ''
            case 'ALERT':
                return styles.alert
            case 'ERROR':
                return styles.error
            case 'SUCCESS':
                return styles.success
            default:
                return ''
        }
    }

    return (
        <div key={key}
             className={classNames(styles.notification, getClassByType())}>
            {message}
        </div>
    )
}

export default Notification
