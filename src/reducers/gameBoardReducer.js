import dieReducer from './dieReducer';
import getDieFromBoard from '../util/getDieFromBoard';

import { ACTIONS, BOARD_HEIGHT } from '../constants';

const initialState = [];

const deferToDice = (state, action) => state.map((dieState) => dieReducer(dieState, action));

const removeDie = (state, action) => state.filter((dieState) => dieState.id !== action.id);

const addDie = (state, { die }) => ([ ...state, die ]);

const getDieToShift = (state) => {
    const getDie = getDieFromBoard(state);

    return state.find(({ x, y, id }) => y < BOARD_HEIGHT - 1 && !getDie(x, y + 1));
}

const cascadeDice = (state, action) => {
    let updatedState = state;
    let dieToShift = getDieToShift(updatedState);

    while (dieToShift) {
        updatedState = deferToDice(updatedState, {
            type: ACTIONS.MOVE_DIE,
            id: dieToShift.id,
            x: dieToShift.x,
            y: dieToShift.y + 1,
        });

        dieToShift = getDieToShift(updatedState)
    }

    return updatedState;
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_DIE:
            return deferToDice(state, action);
        case ACTIONS.REMOVE_DIE:
            return removeDie(state, action);
        case ACTIONS.ADD_DIE:
            return addDie(state, action);
        case ACTIONS.CASCADE_DICE:
            return cascadeDice(state, action);
        case ACTIONS.GAME_RESET:
            return initialState;
        default:
            return state;
    }
};
