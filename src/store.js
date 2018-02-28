import { createStore as _createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

const _store = {};

export const createStore = (combinedReducers) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    _store.store = _createStore(
        combinedReducers,
        undefined,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );

    return _store.store;
};

const getStore = () => {
    return _store.store;
};

export default getStore;