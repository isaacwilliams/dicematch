import { ACTIONS } from '../constants';

const initialState = 0;

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_SCORE:
            return state + action.score * action.multiplier;
        case ACTIONS.GAME_RESET:
            return initialState;
        default:
            return state;
    }
}
