const BOARD_WIDTH = 5;
const BOARD_HEIGHT = 5;
const MIN_MATCH_LENGTH = 3;

const getIndex = (x, y) => y * BOARD_HEIGHT + x;

const findMatchesHorizontal = (state) => {
    const matchGroups = [];

    for (var y = 0; y < BOARD_HEIGHT; y++) {
        let currGroup = [];
        let currValue = state[getIndex(0, y)].value;

        currGroup.push({ x: 0, y, value: currValue })

        for (var x = 1; x < BOARD_WIDTH; x++) {
            const die = state[getIndex(x, y)];

            const closeGroup = die.value !== currValue || x === (BOARD_WIDTH - 1);

            if (die.value === currValue) {
                currGroup.push({ x, y, value: currValue });
            }

            if (closeGroup && currGroup.length >= MIN_MATCH_LENGTH) {
                matchGroups.push(currGroup);
                currGroup = [];
            }

            currValue = die.value;
        }
    }

    return matchGroups;
};

const findMatches = (state) => {
    const horizontalMatches = findMatchesHorizontal(state);

    return horizontalMatches;
};

export default findMatches;
