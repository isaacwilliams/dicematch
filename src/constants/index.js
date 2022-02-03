export const ACTIONS = {
    ADD_SCORE: 'ADD_SCORE',

    UPDATE_DIE: 'UPDATE_DIE',
    REMOVE_DIE: 'REMOVE_DIE',
    ADD_DIE: 'ADD_DIE',
    MOVE_DIE: 'MOVE_DIE',

    CASCADE_DICE: 'CASCADE_DICE',

    INPUT_DISABLE: 'INPUT_DISABLE',
    INPUT_ENABLE: 'INPUT_ENABLE',

    ADD_MOVES: 'ADD_MOVES',

    SET_LEVEL: 'SET_LEVEL',

    GAME_END: 'GAME_END',
    GAME_RESET: 'GAME_RESET',

    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
};

export const DIE_TYPES = {
    UP: 'UP',
    DOWN: 'DOWN',
    RANDOM: 'RANDOM',
    BLOCKER: 'BLOCKER',
    FLIP: 'FLIP',
    BOMB: 'BOMB',
}

export const GAME_STATES = {
    ACTIVE: 'ACTIVE',
    FINISHED: 'FINISHED',
};

export const MODALS = {
    HELP: 'HELP',
    SETTINGS: 'SETTINGS',
    SCORE: 'SCORE',
};

export const BOARD_WIDTH = 5;
export const BOARD_HEIGHT = 6;

export const MIN_MATCH_LENGTH = 3;
