import { put, select, takeEvery, all } from 'redux-saga/effects'

import findBoardMatches from '../util/findBoardMatches';
import createDieState from '../reducers/createDieState';

import { ACTIONS } from '../constants';

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

function *removeMatches(matches, multipler = 1) {
    yield put({ type: ACTIONS.INPUT_DISABLE });

    yield delay(100);

    if (!matches.length) return;

    const diceToRemove = matches[0];

    yield all(diceToRemove.map((die) => put({ type: ACTIONS.REMOVE_DIE, id: die.id })));

    yield delay(100);

    yield all(diceToRemove.map((die) => put({ type: ACTIONS.ADD_DIE, die: createDieState(die.x, die.y - 5) })));

    yield delay(100);

    yield put({ type: ACTIONS.SHIFT_DICE });

    const score = (diceToRemove.length * diceToRemove.length) * multipler;

    yield put({ type: ACTIONS.ADD_SCORE, score });

    yield delay(1000);

    const updatedState = yield select();
    const nextMatches = findBoardMatches(updatedState.gameBoard);

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
