import React from 'react'
import useNotifier from 'shared/hoocks/use-notifier'
import {SnackbarProvider} from 'notistack'

type Props = {
    children: React.ReactNode
}

const Snackbars = ({children}: Props) => {
    return (
        <SnackbarProvider maxSnack={5}>
            <SnackbarsRedux>
                {children}
            </SnackbarsRedux>
        </SnackbarProvider>
    )
}

const SnackbarsRedux = ({children}: Props) => {
    useNotifier()

    return (
        <>
            {children}
        </>
    )

}

export default Snackbars
