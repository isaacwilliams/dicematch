import { ACTIONS } from '../constants';

const initialState = true;

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.INPUT_DISABLE:
            return false;
        case ACTIONS.INPUT_ENABLE:
            return true;
        default:
            return state;
    }
}
