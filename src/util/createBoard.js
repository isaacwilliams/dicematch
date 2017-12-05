import times from 'lodash/fp/times';

import createDieState from './createDieState';
import findBoardMatches from './findBoardMatches';
import addPositionToDie from './addPositionToDie';

import {
    createBoardTutorialA,
    createBoardTutorialB,
    createBoardTutorialC,
} from './createBoardTutorial';

import { DIE_TYPES, BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

const createInitialBoard = () => {
    let gameBoard;

    do {
        gameBoard = times(
            () => createDieState(DIE_TYPES.UP),
            BOARD_WIDTH * BOARD_HEIGHT
        ).map(addPositionToDie);

    } while (findBoardMatches(gameBoard).length);

    return gameBoard;
};

export default (startLevel) => {
    switch (startLevel) {
        case -3:
            return createBoardTutorialA();
        case -2:
            return createBoardTutorialB();
        case -1:
            return createBoardTutorialC();
        default:
            return createInitialBoard();
    }
};
