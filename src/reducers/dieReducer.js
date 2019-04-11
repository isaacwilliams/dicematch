import circularClamp from '../util/circularClamp';
import rollDie from '../util/rollDie';

import { ACTIONS, DIE_TYPES } from '../constants';

const updateDieUp = ({ value, ...state }, action) => ({
    ...state,
    value: circularClamp(1, state.dieSize)(value + 1),
});

const updateDieDown = ({ value, ...state }, action) => ({
    ...state,
    value: circularClamp(1, state.dieSize)(value - 1),
});

const updateDieRandom = ({ value, ...state }, action) => {
    let roll = rollDie(state.dieSize);

    while (roll === value) {
        roll = rollDie(state.dieSize);
    }

    return ({ ...state, value: roll });
};

const valueForFlip = (value) => {
    switch (value) {
        case 1:
            return 6;
        case 2:
            return 5;
        case 3:
            return 4;
        case 4:
            return 3;
        case 5:
            return 2;
        case 6:
        default:
            return 1;
    }
};

const updateDieFlip = ({ value, ...state }, action) => ({
    ...state,
    value: valueForFlip(value),
});

const updateDie = (state, action) => {
    switch (state.dieType) {
        case DIE_TYPES.UP:
            return updateDieUp(state, action);
        case DIE_TYPES.DOWN:
            return updateDieDown(state, action);
        case DIE_TYPES.RANDOM:
            return updateDieRandom(state, action);
        case DIE_TYPES.FLIP:
            return updateDieFlip(state, action);
        default:
            return state;
    }
}

const moveDie = (state, { x, y }) => ({ ...state, x, y });

export default (state , action) => {
    if (state.id !== action.id) return state;

    switch (action.type) {
        case ACTIONS.UPDATE_DIE:
            return updateDie(state, action);
        case ACTIONS.MOVE_DIE:
            return moveDie(state, action);
        default:
            return state;
    }
};
