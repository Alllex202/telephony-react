import React from 'react';
import './styles.module.scss';
import Routing from "../routing";
import {Provider} from "react-redux";
import {store} from "../store";

const App = () => {
    return (
        <Provider store={store}>
            <Routing/>
        </Provider>
    );
};

export default App;
