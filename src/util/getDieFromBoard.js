
const getDieFromBoard = (board) => (x, y) => board.find((die) => (
    die &&
    die.x === x &&
    die.y === y
))

export default getDieFromBoard;
