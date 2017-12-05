import times from 'lodash/fp/times';
import shuffle from 'lodash/fp/shuffle';
import clamp from 'lodash/fp/clamp';

import createDieState from './createDieState';

import { DIE_TYPES } from '../constants';

const clampVal = clamp(0, Infinity);
const floor = value => Math.floor(value);
const round = value => Math.round(value);
const log = (value) => Math.log10(value);

const getCountUp = (level) => 10 + floor(level * 0.2);
const getCountDown = (level) => clampVal(round(log(level) * 7));
const getCountRandom = (level) => clampVal(round(log(level) * 5) - 2);
const getCountBlocker = (level) => clampVal(round(log(level) * 5) - 3);

const checkForRuns = (levelDice = []) => {
    for (var i = 0; i < levelDice.length; i++) {
        const value = levelDice[i].value;

        if (
            levelDice[i + 1] && levelDice[i + 1].value === value &&
            levelDice[i + 2] && levelDice[i + 2].value === value
        ) {
            console.log('found run', levelDice, i, i+1, i+2);
            return true;
        }
    }

    return false;
}

const getLevelDice = (level) => {
    if (level === 0) return [];

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

    let levelDice;
    let attempts = 0;

    do {
        levelDice = shuffle([
            ...times(() => createDieState(DIE_TYPES.UP), getCountUp(level)),
            ...times(() => createDieState(DIE_TYPES.DOWN), getCountDown(level)),
            ...times(() => createDieState(DIE_TYPES.RANDOM), getCountRandom(level)),
            ...times(() => createDieState(DIE_TYPES.BLOCKER), getCountBlocker(level)),
        ]);

        attempts++;
    } while (attempts < 5 && checkForRuns(levelDice));

    return levelDice;
};

export default getLevelDice;
