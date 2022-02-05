import times from 'lodash/fp/times';
import shuffle from 'lodash/fp/shuffle';
import clamp from 'lodash/fp/clamp';

import createDieState from './createDieState';

import { ACTIONS, DIE_TYPES } from '../constants';

const clampVal = clamp(0, Infinity);
const floor = value => Math.floor(value);
const round = value => Math.round(value);
const log = (value) => Math.log10(value);

const getCountUp = (level) => 10;
const getCountDown = (level) => clampVal(round(log(level) * 5));
const getCountFlip = (level) => clampVal(round(log(level) * 4) - 2);
const getCountRandom = (level) => floor(clampVal(round(log(level) * 4) - 2.5));
const getCountBlocker = (level) => clampVal(round(log(level) * 2.5) - 2);
const getCountBomb = (level) => {
    if (level >= 15) return level % 5 === 0 ? 1 : 0;
    return 0;
};

const checkForRuns = (levelDice = []) => {
    for (var i = 0; i < levelDice.length; i++) {
        const value = levelDice[i].value;

        if (
            levelDice[i + 1] && levelDice[i + 1].value === value &&
            levelDice[i + 2] && levelDice[i + 2].value === value
        ) {
            return true;
        }
    }

    return false;
}

const getLevelDice = (level) => {
    let levelDice;
    let attempts = 0;

    do {
        levelDice = shuffle([
            ...times(() => createDieState(DIE_TYPES.UP), getCountUp(level)),
            ...times(() => createDieState(DIE_TYPES.DOWN), getCountDown(level)),
            ...times(() => createDieState(DIE_TYPES.RANDOM), getCountRandom(level)),
            ...times(() => createDieState(DIE_TYPES.BLOCKER), getCountBlocker(level)),
            ...times(() => createDieState(DIE_TYPES.FLIP), getCountFlip(level)),
            ...times(() => createDieState(DIE_TYPES.BOMB), getCountBomb(level)),
        ]);

        attempts++;
    } while (attempts < 5 && checkForRuns(levelDice));

    return levelDice;
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
        case ACTIONS.SET_LEVEL:
            return { ...state, level: action.level, upcomingDice: getLevelDice(action.level) };
        case ACTIONS.GAME_RESET:
            return getInitalState();
        default:
            return state;
    }
}
