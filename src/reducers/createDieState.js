import uniqueId from 'lodash/fp/uniqueId';
import rollDie from '../util/rollDie';

const createDieState = (dieType) => ({
    id: uniqueId(),
    dieType: dieType,
    value: rollDie(),
});

export default createDieState;
