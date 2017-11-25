import circularClamp from '../util/circularClamp';
import random from '../util/random';

import { ACTIONS, DIE_TYPES } from '../constants';

const dieClamp = circularClamp(1, 6);

const updateDieUp = ({ value, ...state }, action) => ({ ...state, value: dieClamp(value + 1) });
const updateDieDown = ({ value, ...state }, action) => ({ ...state, value: dieClamp(value - 1) });
const updateDieRandom = ({ value, ...state }, action) => ({ ...state, value: random.randomInt(1, 6) });

const updateDie = (state, action) => {
    switch (state.dieType) {
        case DIE_TYPES.UP:
            return updateDieUp(state, action);
        case DIE_TYPES.DOWN:
            return updateDieDown(state, action);
        case DIE_TYPES.RANDOM:
            return updateDieRandom(state, action);
        default:
            return state;
    }
}

const moveDie = (state, { x, y }) => ({ ...state, x, y });

export default (state , action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_DIE:
            return updateDie(state, action);
        case ACTIONS.MOVE_DIE:
            return moveDie(state, action);
        default:
            return state;
    }
};
