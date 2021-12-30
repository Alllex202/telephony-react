import React from 'react'
import useNotifier from 'shared/hoocks/use-notifier'
import {SnackbarProvider} from 'notistack'
import {useSelector} from 'react-redux'
import {RootState} from 'store/index'

type Props = {
    children: React.ReactNode
}

const Snackbars = ({children}: Props) => {
    const {max} = useSelector((state: RootState) => state.notifications)

    return (
        <SnackbarProvider maxSnack={max}>
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
