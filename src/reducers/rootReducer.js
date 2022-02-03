import { combineReducers } from 'redux';

import gameBoard from './gameBoardReducer';
import score from './scoreReducer';
import inputEnabled from './inputEnabledReducer';
import moves from './movesReducer';
import level from './levelReducer';
import gameState from './gameStateReducer';
import tracking from './trackingReducer';
import modal from './modalReducer';

export default combineReducers({
    gameBoard,
    score,
    inputEnabled,
    moves,
    level,
    gameState,
    tracking,
    modal,
});
