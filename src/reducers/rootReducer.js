import { combineReducers } from 'redux';

import gameBoard from './gameBoardReducer';
import score from './scoreReducer';

export default combineReducers({
    gameBoard,
    score,
});
