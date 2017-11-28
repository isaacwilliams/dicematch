import uniqueId from 'lodash/fp/uniqueId';
import rollDie from '../util/rollDie';

const createDieState = (dieType, bonusMoves) => ({
    id: uniqueId(),
    dieType,
    dieSize: 6,
    bonusMoves,
    value: rollDie(6),
});

export default createDieState;
