import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar} from 'notistack'
import {removeSnackbar} from 'features/notifications/store'
import {getUniqueId} from 'shared/utils'
import Notification from 'features/notifications/components/notification'
import {useSelectorApp} from 'shared/hoocks'

let displayed: SnackbarKey[] = []

const useNotifier = () => {
    const dispatch = useDispatch()
    const {
        notifications: {notifications}
    } = useSelectorApp()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    const pushDisplayed = (id: SnackbarKey) => {
        displayed = [...displayed, id]
    }

    const removeDisplayed = (id: SnackbarKey) => {
        displayed = displayed.filter((key) => id !== key)
    }

    useEffect(() => {
        notifications.forEach(({key = getUniqueId(), message, dismissed = false, type, action}) => {
            if (dismissed) {
                closeSnackbar(key)
                return
            }

            if (displayed.includes(key)) return

            const options: OptionsObject = {
                autoHideDuration: 3000,
                content: (key: SnackbarKey, message: SnackbarMessage) =>
                    Notification({key, message, type, action})
            }

            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, myKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey)
                    }
                },
                onExited: (event, myKey) => {
                    dispatch(removeSnackbar(myKey))
                    removeDisplayed(myKey)
                }
            })

            // keep track of snackbars that we've displayed
            pushDisplayed(key)
        })
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])
}

export default useNotifier
