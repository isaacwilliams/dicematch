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
            predicate: () => process.env.NODE_ENV === 'development',
        }),
        save({
            namespace: 'dicematch.state',
            ignoreStates: [
                'inputEnabled',
            ],
        }),
        sagaMiddleware,
    )(createStore);

    const store = createStoreWithMiddleware(rootReducer, load({
        namespace: 'dicematch.state',
    }));

    sagaMiddleware.run(sagas);

    window._store = store;

    return store;
};
