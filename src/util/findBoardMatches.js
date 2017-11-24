const BOARD_WIDTH = 5;
const BOARD_HEIGHT = 5;
const MIN_MATCH_LENGTH = 3;

const getIndex = (x, y) => y * BOARD_HEIGHT + x;
const getDieFromBoard = (board) => (x, y) => board[getIndex(x, y)];

const findMatchesHorizontal = (board) => {
    const getDie = getDieFromBoard(board);
    const matchGroups = [];
    let die;
    let currGroup;
    let currValue;

    for (let y = 0; y < BOARD_HEIGHT; y++) {
        die = getDie(0, y);

        currGroup = [{ x: 0, y, ...die }];
        currValue = die.value;

        for (let x = 1; x < BOARD_WIDTH; x++) {
            die = getDie(x, y);

            const hasMatch = die.value === currValue;

            if (hasMatch) currGroup.push({ x, y, ...die });

            const closeGroup = !hasMatch || x === (BOARD_WIDTH - 1);

            if (closeGroup && currGroup.length >= MIN_MATCH_LENGTH) {
                matchGroups.push(currGroup);
            }

            if (closeGroup) {
                currGroup = [{ x, y, ...die }];
            }

            currValue = die.value;
        }
    }

    return matchGroups;
};

const findMatchesVertical = (board) => {
    const getDie = getDieFromBoard(board);
    const matchGroups = [];
    let die;
    let currGroup;
    let currValue;

    for (let x = 0; x < BOARD_WIDTH; x++) {
        die = getDie(x, 0);

        currGroup = [{ x, y: 0, ...die }];
        currValue = die.value;

        for (let y = 1; y < BOARD_HEIGHT; y++) {
            die = getDie(x, y);

            const hasMatch = die.value === currValue;

            if (hasMatch) currGroup.push({ x, y, ...die });

            const closeGroup = !hasMatch || y === (BOARD_HEIGHT - 1);

            if (closeGroup && currGroup.length >= MIN_MATCH_LENGTH) {
                matchGroups.push(currGroup);
            }

            if (closeGroup) {
                currGroup = [{ x, y, ...die }];
            }

            currValue = die.value;
        }
    }

    return matchGroups;
};

const findMatches = (state) => ([
    ...findMatchesVertical(state),
    ...findMatchesHorizontal(state),
])

export default findMatches;
