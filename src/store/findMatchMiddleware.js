import findBoardMatches from '../util/findBoardMatches';

export default store => next => action => {
    if (action.type !== 'UPDATE_DIE') return next(action);

    const nextMiddleware = next(action);

    const { gameBoard } = store.getState();

    const matches = findBoardMatches(gameBoard);

    console.log(matches);

    return nextMiddleware;
};
