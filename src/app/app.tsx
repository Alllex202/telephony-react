import React from 'react'
import './styles.module.scss'
import Routing from 'routing'
import {Provider} from 'react-redux'
import {store} from 'store'
import Snackbars from 'features/notifications/components'

const App = () => {
    return (
        <Provider store={store}>
            <Snackbars>
                <Routing />
            </Snackbars>
        </Provider>
    )
}

export default App
