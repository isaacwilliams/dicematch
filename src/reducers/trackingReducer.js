import { ACTIONS } from '../constants';

const initialState = {
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
                gameStart: new Date(),
                gameEnd: null,
            };
        default:
            return state;
    }
}
