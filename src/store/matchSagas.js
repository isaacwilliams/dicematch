import { put, select, takeEvery, all } from 'redux-saga/effects'
import reverse from 'lodash/fp/reverse';
import flatten from 'lodash/fp/flatten';

import findBoardMatches from '../util/findBoardMatches';
import createDieState from '../reducers/createDieState';

import { ACTIONS, BOARD_HEIGHT } from '../constants';

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

function *addDie(die) {
    const state = yield select();
    const dieType = state.level.upcomingDice[0];
    yield put({ type: ACTIONS.ADD_DIE, die: createDieState(die.x, die.y - BOARD_HEIGHT, dieType) });
};

function *removeMatches(matches, multipler = 1) {
    yield put({ type: ACTIONS.INPUT_DISABLE });

    yield delay(100);

    if (!matches.length) return;

    const state = yield select();

    const diceToRemove = reverse(flatten(matches));

    yield all(diceToRemove.map((die) => put({ type: ACTIONS.REMOVE_DIE, id: die.id })));

    yield delay(100);

    yield all(diceToRemove.map(addDie));

    yield delay(100);

    yield put({ type: ACTIONS.SHIFT_DICE });

    const updatedState = yield select();
    const nextMatches = findBoardMatches(updatedState.gameBoard);

    const score = (diceToRemove.length * diceToRemove.length) * multipler;

    yield put({ type: ACTIONS.ADD_SCORE, score });

    if (state.level.level !== updatedState.level.level) {
        yield put({ type: ACTIONS.ADD_MOVES, moves: 10 });
    }

    yield delay(600);

    if (nextMatches.length) {
        return yield removeMatches(nextMatches, multipler + 1);
    }

    yield put({ type: ACTIONS.INPUT_ENABLE });
}

function *onUpdateDie() {
    const state = yield select();
    const matches = findBoardMatches(state.gameBoard);

    if (matches.length) {
        yield removeMatches(matches, 1);
    }
}

function* matchSaga() {
    yield takeEvery('UPDATE_DIE', onUpdateDie);
}

export default matchSaga;
