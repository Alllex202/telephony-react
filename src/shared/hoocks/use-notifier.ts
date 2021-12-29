import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {SnackbarKey, useSnackbar} from 'notistack'
import {RootState} from 'store'
import {removeSnackbar} from 'store/features/notifications'
import {getUniqueId} from 'shared/utils'

let displayed: SnackbarKey[] = []

const useNotifier = () => {
    const dispatch = useDispatch()
    const {notifications} = useSelector((store: RootState) => store.notifications)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    const storeDisplayed = (id: SnackbarKey) => {
        displayed = [...displayed, id]
    }

    const removeDisplayed = (id: SnackbarKey) => {
        displayed = [...displayed.filter(key => id !== key)]
    }

    useEffect(() => {
        notifications.forEach(({key = getUniqueId(), message, options = {}, dismissed = false}) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key)
                return
            }

            // do nothing if snackbar is already displayed
            if (displayed.includes(key)) return

            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, myKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey)
                    }
                },
                onExited: (event, myKey) => {
                    // remove this snackbar from redux store
                    dispatch(removeSnackbar(myKey))
                    removeDisplayed(myKey)
                }
            })

            // keep track of snackbars that we've displayed
            storeDisplayed(key)
        })
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])
}

export default useNotifier
