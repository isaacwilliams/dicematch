import { ACTIONS } from '../constants';

import createLevel from '../util/createLevel';

const getInitalState = () => ({
    level: -2,
    clearedDice: 0,
    upcomingDice: createLevel(0),
});

const addDie = (state, action) => {
    if (action.noPull) return state;

    let level = state.level;
    let upcomingDice = state.upcomingDice.slice(1);

    if (upcomingDice.length === 0) {
        level = level + 1;
        upcomingDice = createLevel(level);
    }

    return {
        ...state,
        level,
        upcomingDice,
    }
}

export default (state = getInitalState(), action) => {
    switch (action.type) {
        case ACTIONS.ADD_DIE:
            return addDie(state, action);
        case ACTIONS.REMOVE_DIE:
            return { ...state, clearedDice: state.clearedDice + 1 };
        case ACTIONS.SET_LEVEL:
            return { ...state, level: action.level, upcomingDice: createLevel(action.level) };
        case ACTIONS.GAME_RESET:
            return { ...state, level: action.level, upcomingDice: createLevel(action.level) };
        default:
            return state;
    }
}
