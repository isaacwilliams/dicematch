import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers/rootReducer';

import sagas from './matchSagas';

export default (initialState) => {
    const sagaMiddleware = createSagaMiddleware();

    const middleware = [
        createLogger({
            collapsed: true,
            duration: true,
        }),
        sagaMiddleware,
    ];

    const store = createStore(rootReducer, initialState, applyMiddleware.apply(null, middleware));

    sagaMiddleware.run(sagas);

    window._store = store;

    return store;
};
