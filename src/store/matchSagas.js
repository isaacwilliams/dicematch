import { put, select, takeEvery, all } from 'redux-saga/effects'

import findBoardMatches from '../util/findBoardMatches';

import { ACTIONS, BOARD_HEIGHT } from '../constants';

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

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

    yield delay(50);

    yield put({ type: ACTIONS.CASCADE_DICE });
};

function *handleMatchGroup(matchGroup, scoreMultipler) {
    yield all(matchGroup.map((die) => put({ type: ACTIONS.REMOVE_DIE, id: die.id })));

    yield delay(250);

    yield put({ type: ACTIONS.CASCADE_DICE });

    yield put({
        type: ACTIONS.ADD_SCORE,
        score: getMatchScore(matchGroup.length),
        multiplier: scoreMultipler
    });

    yield delay(250);

    for (let die of matchGroup) {
        yield addDie(die);
    }

    yield delay(100);
};

function *removeMatches(matches, scoreMultipler = 1) {
    yield put({ type: ACTIONS.INPUT_DISABLE });

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

    yield put({ type: ACTIONS.INPUT_ENABLE });
}

function *onUpdateDie() {
    const state = yield select();
    const matches = findBoardMatches(state.gameBoard);

    if (matches.length) {
        yield delay(250);
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
