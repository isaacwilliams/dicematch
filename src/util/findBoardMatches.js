import getDieFromBoard from './getDieFromBoard';
import intersectionBy from 'lodash/fp/intersectionBy';
import uniqBy from  'lodash/fp/uniqBy';
import reverse from  'lodash/fp/reverse';

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
                matchGroups.push(reverse(currGroup));
            }

            if (!hasMatch) currGroup = [];
        }
    }

    return matchGroups;
};

const getId = (die) => die.id;
const intersectionById = intersectionBy(getId);
const uniqById = uniqBy(getId);

const findMatches = (state) => {
    let horzontalMatches = findMatchesHorizontal(state);
    let verticalMatches = findMatchesVertical(state);

    // find matches that are both in the horizontal & vertical axis & combine into single group for more points
    horzontalMatches = horzontalMatches.map((hGroup) => {
        const intersectingGroup = verticalMatches.find((vGroup) => intersectionById([
            vGroup,
            hGroup,
        ]));

        if (!intersectingGroup) return hGroup;

        verticalMatches = verticalMatches.filter((vGroup) => vGroup !== intersectingGroup);
        return uniqById([...hGroup, ...intersectingGroup]);
    });

    return [
        ...horzontalMatches,
        ...verticalMatches,
    ];
}

export default findMatches;
