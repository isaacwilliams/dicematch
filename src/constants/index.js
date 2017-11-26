export const ACTIONS = {
    ADD_SCORE: 'ADD_SCORE',

    UPDATE_DIE: 'UPDATE_DIE',
    REMOVE_DIE: 'REMOVE_DIE',
    ADD_DIE: 'ADD_DIE',
    MOVE_DIE: 'MOVE_DIE',

    SHIFT_DICE: 'SHIFT_DICE',

    INPUT_DISABLE: 'INPUT_DISABLE',
    INPUT_ENABLE: 'INPUT_ENABLE',

    ADD_MOVES: 'ADD_MOVES',

    SET_LEVEL: 'SET_LEVEL',

    GAME_END: 'GAME_END',
    GAME_RESET: 'GAME_RESET',
};

export const DIE_TYPES = {
    UP: 'UP',
    DOWN: 'DOWN',
    RANDOM: 'RANDOM',
    BLOCKER: 'BLOCKER',
}

export const GAME_STATES = {
    ACTIVE: 'ACTIVE',
    FINISHED: 'FINISHED',
};

export const DIE_SIZE = 82;
export const BOARD_WIDTH = 4;
export const BOARD_HEIGHT = 4;

export const MIN_MATCH_LENGTH = 3;
