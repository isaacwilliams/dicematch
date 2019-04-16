import { put, select, takeEvery, all } from 'redux-saga/effects'

import first from 'lodash/fp/first';
import includes from 'lodash/fp/includes';

import findBoardMatches from '../util/findBoardMatches';
import getDieFromBoard from '../util/getDieFromBoard';

import { ACTIONS, BOARD_HEIGHT, DIE_TYPES } from '../constants';

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

const getId = (die) => die.id;

const getMatchScore = (matchLength) => {
    switch (matchLength) {
        case 3:
            return 0;
        case 4:
            return 100;
        case 5:
            return 300;
        case 6:
            return 500;
        default:
            return Math.max((matchLength - 6) * 300, 0) + 500;
    }
};

const getScoreValueBonus = (matchLength, matchValue) => {
    const valueMulitplier = matchLength <= 3 ? 10 : 20;

    return matchValue * valueMulitplier;
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

function *handleMatchGroup(matchGroup, scoreMultipler) {
    const state = yield select();

    const gameBoardIds = state.gameBoard.map(getId);
    const diceToRemove = matchGroup.filter(die => includes(getId(die), gameBoardIds));

    yield all(diceToRemove.map((die) => put({ type: ACTIONS.REMOVE_DIE, id: die.id })));

    yield delay(250);

    yield put({ type: ACTIONS.CASCADE_DICE });

    const score = (getMatchScore(diceToRemove.length) + getScoreValueBonus(diceToRemove.length, first(diceToRemove).value));

    yield put({
        type: ACTIONS.ADD_SCORE,
        score: score,
        multiplier: scoreMultipler
    });

    yield delay(250);

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

const BOMB_MATRIX = [
    [0, 0], // bomb itself is first so that the score value bonus == 0
    [-1, -1], [0, -1], [1, -1],
    [-1, 0],        [1, 0],
    [-1, 1], [0, 1], [1, 1]
];

const findDiceToExplode = (gameBoard) => {
    const getDieAt = getDieFromBoard(gameBoard);

    const diceToExplode = gameBoard
        .filter((die) => die.dieType === DIE_TYPES.BOMB && die.value <= 0)
        .map(die => (
            BOMB_MATRIX
                .map(([offsetX, offsetY]) => getDieAt(die.x + offsetX, die.y + offsetY))
                .filter(die => !!die)
        ));

    return diceToExplode;
}

function *onUpdateDie() {
    yield put({ type: ACTIONS.INPUT_DISABLE });

    const state = yield select();
    const matches = findBoardMatches(state.gameBoard);

    if (matches.length) {
        yield delay(250);
        yield removeMatches(matches, 1);
    }

    const postMatchState = yield select();
    const diceToExplode = findDiceToExplode(postMatchState.gameBoard);
    if (diceToExplode.length) {
        yield delay(250);
        yield removeMatches(diceToExplode, 1);
    }

    yield put({ type: ACTIONS.INPUT_ENABLE });

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
