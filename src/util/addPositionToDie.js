import { BOARD_WIDTH } from '../constants';

const addPositionToDie = (die, i) => {
    const x = i % BOARD_WIDTH;
    const y = Math.floor(i / BOARD_WIDTH);

    return { ...die, x, y };
};

export default addPositionToDie;
