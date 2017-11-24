import { times } from 'lodash/fp';

import dieReducer from './dieReducer';
import createDieState from './createDieState';

const BOARD_WIDTH = 5;
const BOARD_HEIGHT = 5;

const initialState = times(createDieState, BOARD_WIDTH * BOARD_HEIGHT);

const getIndex = (x, y) => y * BOARD_HEIGHT + x;

const updateDie = (state, action) => {
    const { x, y } = action;
    const dieIndex = getIndex(x, y);

    return [
        ...state.slice(0, dieIndex),
        dieReducer(state[dieIndex], action),
        ...state.slice(dieIndex + 1),
    ];
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DIE':
            return updateDie(state, action);
        default:
            return state;
    }
};
