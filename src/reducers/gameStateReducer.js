import { GAME_STATES, ACTIONS } from '../constants';

const initialState = GAME_STATES.ACTIVE;

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GAME_END:
            return GAME_STATES.FINISHED;
        case ACTIONS.GAME_RESET:
            return initialState;
        default:
            return state;
    }
}
