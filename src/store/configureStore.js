import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { save, load } from 'redux-localstorage-simple';

import rootReducer from '../reducers/rootReducer';

import sagas from './matchSagas';

export default () => {
    const sagaMiddleware = createSagaMiddleware();

    const createStoreWithMiddleware = applyMiddleware(
        createLogger({
            collapsed: true,
            duration: true,
        }),
        save(),
        sagaMiddleware,
    )(createStore);

    const store = createStoreWithMiddleware(rootReducer, load());

    sagaMiddleware.run(sagas);

    window._store = store;

    return store;
};
