import React from 'react'
import useNotifier from 'features/notifications/hoocks/use-notifier'
import {SnackbarProvider} from 'notistack'
import {useSelectorApp} from 'shared/hoocks'

type Props = {
    children: React.ReactNode
}

const Snackbars = ({children}: Props) => {
    const {
        notifications: {max}
    } = useSelectorApp()

    return (
        <SnackbarProvider maxSnack={max}>
            <SnackbarsRedux>{children}</SnackbarsRedux>
        </SnackbarProvider>
    )
}

const SnackbarsRedux = ({children}: Props) => {
    useNotifier()

    return <>{children}</>
}

export default Snackbars
