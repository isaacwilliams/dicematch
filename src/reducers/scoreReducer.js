import { ACTIONS } from '../constants';

const initialState = 0;

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_SCORE:
            return state + action.score;
        case ACTIONS.UPDATE_DIE:
            return state - 1;
        default:
            return state;
    }
}
