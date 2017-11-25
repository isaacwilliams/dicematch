import getDieFromBoard from './getDieFromBoard';

import { BOARD_WIDTH, BOARD_HEIGHT, MIN_MATCH_LENGTH } from '../constants';

const checkDiceMatch = (die, nextDie) => (
    die &&
    nextDie &&
    die.value === nextDie.value
);

const findMatchesHorizontal = (board) => {
    const getDie = getDieFromBoard(board);
    const matchGroups = [];

    for (let y = 0; y < BOARD_HEIGHT; y++) {
        let currGroup = [];

        for (let x = 0; x < BOARD_WIDTH; x++) {
            const die = getDie(x, y);
            const nextDie = getDie(x + 1, y);

            currGroup.push(die);

            const hasMatch = checkDiceMatch(die, nextDie);

            if (!hasMatch && currGroup.length >= MIN_MATCH_LENGTH) {
                matchGroups.push(currGroup);
            }

            if (!hasMatch) currGroup = [];
        }
    }

    return matchGroups;
};

const findMatchesVertical = (board) => {
    const getDie = getDieFromBoard(board);
    const matchGroups = [];

    for (let x = 0; x < BOARD_WIDTH; x++) {
        let currGroup = [];

        for (let y = 0; y < BOARD_HEIGHT; y++) {
            const die = getDie(x, y);
            const nextDie = getDie(x, y + 1);

            currGroup.push(die);

            const hasMatch = checkDiceMatch(die, nextDie);

            if (!hasMatch && currGroup.length >= MIN_MATCH_LENGTH) {
                matchGroups.push(currGroup);
            }

            if (!hasMatch) currGroup = [];
        }
    }

    return matchGroups;
};

const findMatches = (state) => ([
    ...findMatchesVertical(state),
    ...findMatchesHorizontal(state),
])

export default findMatches;
