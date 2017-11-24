import { uniqueId } from 'lodash/fp';

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

const createDieState = () => ({
    id: uniqueId(),
    type: random.choose(TYPES),
    value: random.randomInt(1, 6),
});

export default createDieState;
