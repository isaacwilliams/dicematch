import circularClamp from '../util/circularClamp';
import random from '../util/random';

import { ACTIONS } from '../constants';

const dieClamp = circularClamp(1, 6);

const updateDieUp = ({ value, ...state }, action) => ({ ...state, value: dieClamp(value + 1) });
const updateDieDown = ({ value, ...state }, action) => ({ ...state, value: dieClamp(value - 1) });
const updateDieRandom = ({ value, ...state }, action) => ({ ...state, value: random.randomInt(1, 6) });

const updateDie = (state, action) => {
    switch (state.dieType) {
        case 'up':
            return updateDieUp(state, action);
        case 'down':
            return updateDieDown(state, action);
        case 'random':
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
