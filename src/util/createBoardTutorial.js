import times from 'lodash/fp/times';

import createDieState from './createDieState';
import addPositionToDie from './addPositionToDie';

import { DIE_TYPES, BOARD_WIDTH } from '../constants';

const createGhost = (value) => createDieState(DIE_TYPES.GHOST, 6, value + 1000);

export const createBoardTutorialA = () => (
    [
        ...times(createGhost, BOARD_WIDTH * 2),
        ...[
            createGhost(0),
            createDieState(DIE_TYPES.UP, 6, 2),
            createDieState(DIE_TYPES.UP, 6, 3),
            createDieState(DIE_TYPES.UP, 6, 5),
            createGhost(1),
        ],
        ...times(createGhost, BOARD_WIDTH * 3),
    ].map(addPositionToDie)
);

export const createBoardTutorialB = () => (
    [
        ...times(createGhost, BOARD_WIDTH * 2),
        ...[
            createGhost(0),
            createDieState(DIE_TYPES.UP, 6, 1),
            createDieState(DIE_TYPES.DOWN, 6, 4),
            createDieState(DIE_TYPES.UP, 6, 2),
            createGhost(1),
        ],
        ...times(createGhost, BOARD_WIDTH * 3),
    ].map(addPositionToDie)
);

export const createBoardTutorialC = () => (
    [
        ...times(createGhost, BOARD_WIDTH * 2),
        ...[
            createGhost(0),
            createDieState(DIE_TYPES.UP, 6, 1),
            createDieState(DIE_TYPES.DOWN, 6, 3),
            createDieState(DIE_TYPES.RANDOM, 6, 6),
            createGhost(1),
        ],
        ...times(createGhost, BOARD_WIDTH * 3),
    ].map(addPositionToDie)
);
