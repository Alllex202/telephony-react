import React from 'react'
import styles from 'features/notifications/components/notification/styles.module.scss'
import {SnackbarKey, SnackbarMessage} from 'notistack'
import {Action, NotificationType} from 'features/notifications/store/notification.slice'
import {classNames} from 'shared/utils'
import Icon from 'components/ui-kit/icon'

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

    const getIconNameByType = (): string => {
        switch (type) {
            case 'INFO':
                return 'info'
            case 'ERROR':
                return 'error'
            case 'SUCCESS':
                return 'check_circle'
            default:
                return ''
        }
    }

    return (
        <div key={key} className={classNames(styles.notification, getClassByType())}>
            <Icon iconName={getIconNameByType()} iconType={'round'} className={styles.icon} />
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
