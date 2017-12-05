import uniqueId from 'lodash/fp/uniqueId';
import rollDie from './rollDie';

const createDieState = (dieType, dieSize = 6, value) => ({
    id: uniqueId(),
    dieType,
    dieSize,
    value: value || rollDie(dieSize),
});

export default createDieState;
