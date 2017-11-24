import { combineReducers } from 'redux';

import gameBoardReducer from './gameBoardReducer';

export default combineReducers({
    gameBoard: gameBoardReducer,
});
