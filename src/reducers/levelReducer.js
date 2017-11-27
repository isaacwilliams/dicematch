import times from 'lodash/fp/times';
import shuffle from 'lodash/fp/shuffle';
import clamp from 'lodash/fp/clamp';

import multiplyInt from '../util/mutiplyInt';

import createDieState from './createDieState';

import { ACTIONS, DIE_TYPES } from '../constants';

const clampVal = clamp(0, 7);

const modLevelHalf = multiplyInt(0.5);
const modLevel = multiplyInt(0.75);

const getLevelDice = (level) => shuffle([
    ...times(() => createDieState(DIE_TYPES.UP), modLevelHalf(level) + 9),
    ...times(() => createDieState(DIE_TYPES.DOWN), clampVal(level - 1)),
    ...times(() => createDieState(DIE_TYPES.RANDOM), clampVal(modLevel(level) - 2)),
    ...times(() => createDieState(DIE_TYPES.BLOCKER), clampVal(modLevel(level) - 4)),
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
