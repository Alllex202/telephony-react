import React from 'react'
import './styles.module.scss'
import Routing from 'routing'
import {Provider} from 'react-redux'
import {store} from 'store'
import Snackbars from 'features/notifications/components'
import {theme} from 'app/theme'
import {ThemeProvider} from '@mui/material'

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Snackbars>
                    <Routing />
                </Snackbars>
            </ThemeProvider>
        </Provider>
    )
}

export default App
