import { ACTIONS } from '../constants';

const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialState = {
    interface: darkMode ? 'dark' : darkMode
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_THEME:
            return { ...state, interface: action.interface };
        default:
            return state;
    }
};
