import times from 'lodash/fp/times';
import shuffle from 'lodash/fp/shuffle';
import { ACTIONS, DIE_TYPES } from '../constants';

const getLevelDice = (level) => shuffle([
    ...times(() => DIE_TYPES.UP, level + 5),
    ...times(() => DIE_TYPES.DOWN, level + 3),
    ...times(() => DIE_TYPES.RANDOM, level - 3),
    ...times(() => DIE_TYPES.BLOCKER, level - 4),
]);

const initialState = {
    level: 1,
    upcomingDice: getLevelDice(1),
};

const addDie = (state, action) => {
    let level = state.level;
    let upcomingDice = state.upcomingDice.slice(1);

    if (upcomingDice.length === 0) {
        level = level + 1;
        upcomingDice = getLevelDice(level);
    }

    return {
        level,
        upcomingDice,
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_DIE:
            return addDie(state, action);
        default:
            return state;
    }
}
