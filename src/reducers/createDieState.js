import uniqueId from 'lodash/fp/uniqueId';

import random from '../util/random';
const createDieState = (x, y, dieType) => ({
    id: uniqueId(),
    dieType: dieType,
    value: random.randomInt(1, 6),
    x,
    y,
});

export default createDieState;
