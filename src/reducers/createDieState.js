import uniqueId from 'lodash/fp/uniqueId';
import rollDie from '../util/rollDie';

const createDieState = (x, y, dieType) => ({
    id: uniqueId(),
    dieType: dieType,
    value: rollDie(),
    x,
    y,
});

export default createDieState;
