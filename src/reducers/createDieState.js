import { nanoid } from 'nanoid';
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
    id: nanoid(8),
    dieType,
    dieSize,
    value: initialValueFor(dieType, dieSize),
});

export default createDieState;
