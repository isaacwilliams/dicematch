import { put, select, takeEvery, all } from 'redux-saga/effects'
import reverse from 'lodash/fp/reverse';
import flatten from 'lodash/fp/flatten';
import uniqBy from  'lodash/fp/uniqBy';

import findBoardMatches from '../util/findBoardMatches';

import { ACTIONS, BOARD_HEIGHT } from '../constants';

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

const uniqById = uniqBy((die) => die.id);

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
    const y = removedDie.y - BOARD_HEIGHT;

    yield put({ type: ACTIONS.ADD_DIE, die: { ...nextDie, x, y } });
};

function *removeMatches(matches, multiplier = 1) {
    yield put({ type: ACTIONS.INPUT_DISABLE });

    yield delay(100);

    if (!matches.length) return;

    const state = yield select();

    const diceToRemove = uniqById(reverse(flatten(matches)));

    yield all(diceToRemove.map((die) => put({ type: ACTIONS.REMOVE_DIE, id: die.id })));

    yield delay(100);

    yield all(diceToRemove.map(addDie));

    yield delay(100);

    yield put({ type: ACTIONS.SHIFT_DICE });

    const updatedState = yield select();
    const nextMatches = findBoardMatches(updatedState.gameBoard);

    const score = getMatchScore(diceToRemove.length);

    yield put({ type: ACTIONS.ADD_SCORE, score, multiplier });

    if (state.level.level !== updatedState.level.level) {
        yield put({ type: ACTIONS.ADD_MOVES, moves: 10 });
    }

    yield delay(600);

    if (nextMatches.length) {
        return yield removeMatches(nextMatches, multiplier + 1);
    }

    yield put({ type: ACTIONS.INPUT_ENABLE });
}

function *onUpdateDie() {
    const state = yield select();
    const matches = findBoardMatches(state.gameBoard);

    if (matches.length) {
        yield removeMatches(matches, 1);
    }

    const finalState = yield select();
    if (finalState.moves.limit - finalState.moves.used <= 0) {
        yield delay(800);
        return yield put({ type: ACTIONS.GAME_END });
    }
}

function* matchSaga() {
    yield takeEvery(ACTIONS.UPDATE_DIE, onUpdateDie);
}

export default matchSaga;
