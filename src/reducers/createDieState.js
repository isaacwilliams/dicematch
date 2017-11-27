import uniqueId from 'lodash/fp/uniqueId';
import rollDie from '../util/rollDie';

const createDieState = (dieType, dieSize = 6) => ({
    id: uniqueId(),
    dieType,
    dieSize,
    value: rollDie(dieSize),
});

export default createDieState;
