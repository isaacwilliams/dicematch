import { ACTIONS, DICE_THEME, INTERFACE_THEME } from '../constants';

const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialState = {
    interface: darkMode ? INTERFACE_THEME.dark : darkMode,
    dice: DICE_THEME.standard,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_INTERFACE_THEME:
            return { ...state, interface: action.interface };
        case ACTIONS.SET_DICE_THEME:
            return { ...state, dice: action.dice };
        default:
            return state;
    }
};
