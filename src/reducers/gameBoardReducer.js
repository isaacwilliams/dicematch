import keyBy from 'lodash/fp/keyBy';
import omit from 'lodash/fp/omit';
import values from 'lodash/fp/values';
import times from 'lodash/fp/times';
import shuffle from 'lodash/fp/shuffle';

import dieReducer from './dieReducer';
import createDieState from './createDieState';
import findBoardMatches from '../util/findBoardMatches';
import getDieFromBoard from '../util/getDieFromBoard';

import { ACTIONS, DIE_TYPES, BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

const keyById = keyBy('id');

const createGameBoard = () => {
    const gameBoard = [];

    const initalDieState = shuffle([
        ...times(() => createDieState(DIE_TYPES.UP), BOARD_WIDTH * BOARD_HEIGHT - 2),
        ...times(() => createDieState(DIE_TYPES.UP, 5), 2),
    ]);

    for (var x = 0; x < BOARD_WIDTH; x++) {
        for (var y = 0; y < BOARD_HEIGHT; y++) {
            const die = initalDieState.pop();
            gameBoard.push({ ...die, x, y });
        }
    }

    return keyById(gameBoard);
}

const getInitalState = () => {
    let gameBoard;

    while (!gameBoard || findBoardMatches(gameBoard).length) {
        gameBoard = createGameBoard();
    }

    return gameBoard;
};

const deferToDie = (state, action) => ({
    ...state,
    [action.id]: dieReducer(state[action.id], action),
});

const removeDie = (state, action) => omit(action.id, state);

const addDie = (state, { die }) => ({ ...state, [die.id]: die });

const getDieToShift = (state) => {
    const getDie = getDieFromBoard(state);

    return values(state).find(({ x, y, id }) => y < BOARD_HEIGHT - 1 && !getDie(x, y + 1));
}

const shiftDice = (state, action) => {
    let updatedState = state;
    let dieToShift = getDieToShift(updatedState);

    while (dieToShift) {
        updatedState = deferToDie(updatedState, {
            type: 'MOVE_DIE',
            id: dieToShift.id,
            x: dieToShift.x,
            y: dieToShift.y + 1,
        });

        dieToShift = getDieToShift(updatedState)
    }

    return updatedState;
};

export default (state = getInitalState(), action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_DIE:
            return deferToDie(state, action);
        case ACTIONS.REMOVE_DIE:
            return removeDie(state, action);
        case ACTIONS.ADD_DIE:
            return addDie(state, action);
        case ACTIONS.SHIFT_DICE:
            return shiftDice(state, action);
        case ACTIONS.GAME_RESET:
            return getInitalState();
        default:
            return state;
    }
};
