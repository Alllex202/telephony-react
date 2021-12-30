import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar} from 'notistack'
import {RootState} from 'store'
import {removeSnackbar} from 'store/features/notifications'
import {getUniqueId} from 'shared/utils'
import Notification from 'store/features/notifications/components/notification'

let displayed: SnackbarKey[] = []

const useNotifier = () => {
    const dispatch = useDispatch()
    const {notifications} = useSelector((store: RootState) => store.notifications)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    const pushDisplayed = (id: SnackbarKey) => {
        displayed = [...displayed, id]
    }

    const removeDisplayed = (id: SnackbarKey) => {
        displayed = displayed.filter(key => id !== key)
    }

    useEffect(() => {
        notifications.forEach(({key = getUniqueId(), message, dismissed = false, type}) => {
            if (dismissed) {
                closeSnackbar(key)
                return
            }

            if (displayed.includes(key)) return

            const options: OptionsObject = {
                autoHideDuration: 3000,
                content: (key: SnackbarKey, message: SnackbarMessage) => Notification({key, message, type})
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
