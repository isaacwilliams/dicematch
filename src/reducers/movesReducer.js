import { ACTIONS } from '../constants';

const initialState = 10;

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_DIE:
            return state - 1;
        case ACTIONS.ADD_MOVES:
            return state + action.moves;
        default:
            return state;
    }
}
