import React from 'react';
import ReactDOM from "react-dom";
import App from "./app/app";
import './styles.global.scss';

async function run() {
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_FAKE_DATA === 'true') {
        const {worker} = await import('./core/api/mocks');
        await worker.start({onUnhandledRequest: "bypass"});
    }

    ReactDOM.render(<App/>, document.getElementById('root'));
}

run();
