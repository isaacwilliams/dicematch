import { AppRegistry } from 'react-native';
import React from 'react';

import App from './native/App';
import configureStore from './store/configureStore';

const store = configureStore();

const AppContainer = () => <App store={store} />;

AppRegistry.registerComponent('dicematch', () => AppContainer);
