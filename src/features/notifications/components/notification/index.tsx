import React from 'react'
import styles from './styles.module.scss'
import {SnackbarKey, SnackbarMessage} from 'notistack'
import {Action, NotificationType} from 'features/notifications/store/notification.slice'
import {classNames} from 'shared/utils'
import {CheckCircleRounded, ErrorRounded, InfoRounded} from '@mui/icons-material'

type Props = {
    key: SnackbarKey
    message: SnackbarMessage
    type: NotificationType
    action?: Action
}

const Notification = ({key, message, type = 'INFO', action}: Props) => {
    const getClassByType = (): string => {
        switch (type) {
            case 'INFO':
                return styles.info
            case 'ERROR':
                return styles.error
            case 'SUCCESS':
                return styles.success
            default:
                return ''
        }
    }

    const getIconByType = (): React.ReactElement => {
        switch (type) {
            case 'INFO':
                return <InfoRounded className={styles.icon} />
            case 'ERROR':
                return <ErrorRounded className={styles.icon} />
            case 'SUCCESS':
                return <CheckCircleRounded className={styles.icon} />
            default:
                return <></>
        }
    }

    return (
        <div key={key} className={classNames(styles.notification, getClassByType())}>
            {getIconByType()}
            <span className={styles.text}>{message}</span>
            {action && (
                <button className={styles.action} onClick={action.callback}>
                    {action.text}
                </button>
            )}
        </div>
    )
}

export default Notification
