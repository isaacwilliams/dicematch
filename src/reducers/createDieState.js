import uniqueId from 'lodash/fp/uniqueId';

import random from '../util/random';

const TYPES = [
    'up',
    'up',
    'up',
    'down',
    'down',
    'down',
    'random',
];

const createDieState = (x, y) => ({
    id: uniqueId(),
    dieType: random.choose(TYPES),
    value: random.randomInt(1, 6),
    x,
    y,
});

export default createDieState;
