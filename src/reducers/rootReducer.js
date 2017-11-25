import { combineReducers } from 'redux';

import gameBoard from './gameBoardReducer';
import score from './scoreReducer';
import inputEnabled from './inputEnabledReducer';
import moves from './movesReducer';

export default combineReducers({
    gameBoard,
    score,
    inputEnabled,
    moves,
});
