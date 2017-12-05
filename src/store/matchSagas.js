import { put, select, takeEvery, all } from 'redux-saga/effects'

import includes from 'lodash/fp/includes';
import reverse from 'lodash/fp/reverse';

import findBoardMatches from '../util/findBoardMatches';
import createBoard from '../util/createBoard';
// import createBoardTutorial from '../util/createBoardTutorial';

import { ACTIONS, BOARD_HEIGHT } from '../constants';

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

const getId = (die) => die.id;

const getMatchScore = (matchLength) => {
    switch (matchLength) {
        case 3:
            return 10;
        case 4:
            return 25;
        case 5:
            return 50;
        case 6:
            return 80;
        default:
            return Math.max((matchLength - 5) * 50, 0);
    }
};

function *addDie(removedDie) {
    const state = yield select();

    const nextDie = state.level.upcomingDice[0];
    const x = removedDie.x;
    const y = -BOARD_HEIGHT;

    yield put({ type: ACTIONS.ADD_DIE, die: { ...nextDie, x, y } });

    yield delay(100);

    yield put({ type: ACTIONS.CASCADE_DICE });
};

function *resetBoard() {
    const state = yield select();
    const level = state.level.level;

    for (let die of state.gameBoard) {
        yield put({ type: ACTIONS.REMOVE_DIE, id: die.id });
        yield delay(10);
    }

    const boardDice = reverse(
        createBoard(level)
    );

    yield put({ type: ACTIONS.SET_LEVEL, level: level + 1 });

    for (let die of boardDice) {
        yield put({ type: ACTIONS.ADD_DIE, noPull: true, die: { ...die, y: -BOARD_HEIGHT } });
        yield delay(10);
        yield put({ type: ACTIONS.CASCADE_DICE });
    }

    yield delay(50);
};

function *handleMatchGroup(matchGroup, scoreMultipler) {
    const state = yield select();

    const gameBoardIds = state.gameBoard.map(getId);
    const diceToRemove = matchGroup.filter(die => includes(getId(die), gameBoardIds));

    yield all(diceToRemove.map((die) => put({ type: ACTIONS.REMOVE_DIE, id: die.id })));

    yield delay(250);

    yield put({ type: ACTIONS.CASCADE_DICE });

    yield put({
        type: ACTIONS.ADD_SCORE,
        score: getMatchScore(diceToRemove.length),
        multiplier: scoreMultipler
    });

    yield delay(250);

    if (state.level.level <= 0) {
        return yield resetBoard();
    }

    for (let die of diceToRemove) {
        yield addDie(die);
    }

    yield delay(100);
};

function *removeMatches(matches, scoreMultipler = 1) {
    yield delay(100);

    if (!matches.length) return;

    const state = yield select();

    for (let matchGroup of matches) {
        yield handleMatchGroup(matchGroup, scoreMultipler);
        yield delay(250);
    }

    const updatedState = yield select();
    const nextMatches = findBoardMatches(updatedState.gameBoard);

    if (state.level.level !== updatedState.level.level) {
        yield put({ type: ACTIONS.ADD_MOVES, moves: 10 });
    }

    yield delay(300);

    if (nextMatches.length) {
        return yield removeMatches(nextMatches, scoreMultipler + 1);
    }

}

function *onUpdateDie() {
    yield put({ type: ACTIONS.INPUT_DISABLE });

    const state = yield select();
    const matches = findBoardMatches(state.gameBoard);

    if (matches.length) {
        yield delay(250);
        yield removeMatches(matches, 1);
    }

    yield put({ type: ACTIONS.INPUT_ENABLE });

    const finalState = yield select();
    if (finalState.moves.limit - finalState.moves.used <= 0) {
        yield delay(800);
        return yield put({ type: ACTIONS.GAME_END });
    }
}

function* matchSaga() {
    yield all([
        takeEvery(ACTIONS.UPDATE_DIE, onUpdateDie),
        takeEvery(ACTIONS.GAME_RESET, resetBoard),
    ]);
}

export default matchSaga;
