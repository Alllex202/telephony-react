import React from 'react';
import ReactDOM from "react-dom";
import App from "./app/app";
import {Provider} from "react-redux";
import {store} from "./store";

async function run() {
    const {worker} = await import('./core/api/mocks');
    await worker.start();

    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    );
}

run();
