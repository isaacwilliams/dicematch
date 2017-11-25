import { combineReducers } from 'redux';

import gameBoard from './gameBoardReducer';
import score from './scoreReducer';
import inputEnabled from './inputEnabledReducer';

export default combineReducers({
    gameBoard,
    score,
    inputEnabled,
});
