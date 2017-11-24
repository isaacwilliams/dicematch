import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

import findMatchMiddleware from './findMatchMiddleware';

export default (initialState) => {
    const middleware = [
        createLogger(),
        findMatchMiddleware,
    ];

    const store = createStore(rootReducer, initialState, applyMiddleware.apply(null, middleware));
    window._store = store;

    return store;
};
