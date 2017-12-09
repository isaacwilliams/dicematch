import React from 'react';
import ReactDOM from 'react-dom';

import App from './web/App';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
