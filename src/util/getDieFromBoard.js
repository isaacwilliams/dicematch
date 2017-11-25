import values from 'lodash/fp/values';

const getDieFromBoard = (board) => {
    const boardArray = values(board);

    return (x, y) => boardArray.find((die) => (
        die &&
        die.x === x &&
        die.y === y
    ));
}

export default getDieFromBoard;
