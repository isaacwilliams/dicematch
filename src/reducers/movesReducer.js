import { ACTIONS } from '../constants';

const initialState = { used: 0, limit: 10 };

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_DIE:
            return { ...state, used: state.used + 1 };
        case ACTIONS.ADD_MOVES:
            return { ...state, limit: action.moves };
        case ACTIONS.GAME_RESET:
            return initialState;
        default:
            return state;
    }
}
