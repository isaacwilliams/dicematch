import flatten from 'lodash/fp/flatten';
import findBoardMatches from '../util/findBoardMatches';

export default store => next => action => {
    if (action.type !== 'UPDATE_DIE') return next(action);

    const nextMiddleware = next(action);

    let matches = findBoardMatches(store.getState().gameBoard);

    while (matches.length) {
        const diceToRemove = flatten(matches);

        diceToRemove.forEach(die => {
            store.dispatch({ type: 'REMOVE_DIE', id: die.id });
        });

        store.dispatch({ type: 'SHIFT_DICE' });

        matches = findBoardMatches(store.getState().gameBoard);
    }

    return nextMiddleware;
};
