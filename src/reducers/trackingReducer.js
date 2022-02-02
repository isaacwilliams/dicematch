import { v4 as uuidv4 } from 'uuid';
import { ACTIONS } from '../constants';

const initialState = {
    gameId: uuidv4(),
    gameStart: new Date(),
    gameEnd: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GAME_END:
            return {
                ...state,
                gameEnd: new Date(),
            };
        case ACTIONS.GAME_RESET:
            return {
                gameId: uuidv4(),
                gameStart: new Date(),
                gameEnd: null,
            };
        default:
            return state;
    }
}
