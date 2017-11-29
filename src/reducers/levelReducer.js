import times from 'lodash/fp/times';
import shuffle from 'lodash/fp/shuffle';
import clamp from 'lodash/fp/clamp';

import createDieState from './createDieState';

import { ACTIONS, DIE_TYPES } from '../constants';

const clampVal = clamp(0, Infinity);
const round = value => Math.round(value);
const log = (value) => Math.log10(value);

const getCountUp = (level) => 10;
const getCountDown = (level) => clampVal(round(log(level) * 7));
const getCountRandom = (level) => clampVal(round(log(level) * 6) - 2);
const getCountBlocker = (level) => clampVal(round(log(level) * 5) - 3);

const getLevelDice = (level) => {

    console.log(
        'NEXT LEVEL', level,
        'UP', getCountUp(level),
        'DOWN', getCountDown(level),
        'RANDOM', getCountRandom(level),
        'BLOCKER', getCountBlocker(level),
        'total', getCountUp(level) +
                getCountDown(level) +
                getCountRandom(level) +
                getCountBlocker(level)
    )

    return shuffle([
        ...times(() => createDieState(DIE_TYPES.UP), getCountUp(level)),
        ...times(() => createDieState(DIE_TYPES.DOWN), getCountDown(level)),
        ...times(() => createDieState(DIE_TYPES.RANDOM), getCountRandom(level)),
        ...times(() => createDieState(DIE_TYPES.BLOCKER), getCountBlocker(level)),
    ]);
};

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
