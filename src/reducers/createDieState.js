import uniqueId from 'lodash/fp/uniqueId';
import rollDie from '../util/rollDie';

import { DIE_TYPES } from '../constants';

const initialValueFor = (dieType, dieSize = 6) => {
    switch (dieType) {
        case DIE_TYPES.BOMB:
            return dieSize;
        default:
            return rollDie(dieSize);
    }
}

const createDieState = (dieType, dieSize = 6) => ({
    id: uniqueId(),
    dieType,
    dieSize,
    value: initialValueFor(dieType, dieSize),
});

export default createDieState;
