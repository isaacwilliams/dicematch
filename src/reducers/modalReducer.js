import { ACTIONS } from '../constants';

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.OPEN_MODAL:
            return action.modal;
        case ACTIONS.CLOSE_MODAL:
            return null;
        default:
            return state;
    }
}
