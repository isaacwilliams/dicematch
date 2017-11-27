import times from 'lodash/fp/times';
import shuffle from 'lodash/fp/shuffle';
import clamp from 'lodash/fp/clamp';

import multiplyInt from '../util/mutiplyInt';

import { ACTIONS, DIE_TYPES } from '../constants';

const clampVal = clamp(0, 7);

const modThreeQuart = multiplyInt(0.75);
const modHalf = multiplyInt(0.75);

const getLevelDice = (level) => shuffle([
    ...times(() => DIE_TYPES.UP, clampVal(modThreeQuart(level) + 6)),
    ...times(() => DIE_TYPES.DOWN, clampVal(modThreeQuart(level) + 2)),
    ...times(() => DIE_TYPES.RANDOM, clampVal(modHalf(level) - 2)),
    ...times(() => DIE_TYPES.BLOCKER, clampVal(modHalf(level) - 5)),
]);

const getInitalState = () => ({
    level: 1,
    clearedDice: 0,
    upcomingDice: getLevelDice(1),
});

const addDie = (state, action) => {
    let level = state.level;
    let upcomingDice = state.upcomingDice.slice(1);

    if (upcomingDice.length === 0) {
        level = level + 1;
        upcomingDice = getLevelDice(level);
    }

    return {
        ...state,
        level,
        upcomingDice,
    }
}

export default (state = getInitalState(), action) => {
    switch (action.type) {
        case ACTIONS.ADD_DIE:
            return addDie(state, action);
        case ACTIONS.REMOVE_DIE:
            return { ...state, clearedDice: state.clearedDice + 1 };
        case ACTIONS.GAME_RESET:
            return getInitalState();
        default:
            return state;
    }
}
