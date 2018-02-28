import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers } from 'redux';
import {createStore} from './store';
import redusers from './scenes/reducers';
import CalendarScene from './scenes'; 

const startApp = () => {
    const combinedReducers = combineReducers({
        ...redusers
    });

    const store = createStore(combinedReducers);

    ReactDOM.render(
        <Provider store={store}>
            <CalendarScene />
        </Provider>,
        document.getElementById('calendar_root')
    );
}

window.onload = () => {
    startApp();
}
