import { DICE_THEME } from '.';

export const colors = {
    white: '#ffffff',
    black: '#000000',
    charcoal: '#282B40',
    charcoal_200: '#191D23',
    charcoal_100: '#111717',
    grey_100: '#111111',
    grey_200: '#222222',
    grey_300: '#444444',
    grey_400: '#666666',
    grey_500: '#757784',
    grey_700: '#9A9DAD',
    grey_900: '#C5C9D8',
    grey_1000: '#E6E8EF',
    grey_1100: '#f8f8f8',
    red: '#FC4349',
    teal: '#3C989B',
    green: '#14DD89',
    yellow: '#FFAC00',
    yellow_700: '#FFD000',
    yellow_900: '#FFEF00',
    beige: '#CEC8B6',
};

export const DICE_THEME_STANDARD = {
    pip: colors.charcoal,
    up: colors.red,
    down: colors.teal,
    flip: colors.beige,
    random: colors.yellow,
    blocker: colors.grey_500,
    blockerPip: colors.pip,
    bomb: colors.grey_500,
    bombPip: colors.yellow,
};

export const DICE_THEME_HIGH_CONTRAST = {
    pip: colors.black,
    up: colors.red,
    down: '#1E88E5',
    flip: colors.beige,
    random: colors.yellow_700,
    blocker: colors.grey_500,
    blockerPip: colors.black,
    bomb: colors.grey_300,
    bombPip: colors.yellow_700,
};


export const DICE_THEME_SUBDUED = {
    pip: colors.charcoal,
    up: '#FFAAAA',
    down: '#6acdc7',
    flip: '#CEC8B6',
    random: '#FFEB7F',
    blocker: '#8F8F8F',
    blockerPip: colors.charcoal,
    bomb: '#8F8F8F',
    bombPip: colors.yellow_700,
};

export const DICE_THEME_TROPICAL = {
    pip: colors.charcoal,
    up: '#ff8150',
    down: '#4ec9ff',
    flip: '#fff09f',
    random: '#ffdc1e',
    blocker: '#85b7bb',
    blockerPip: colors.charcoal,
    bomb: '#85b7bb',
    bombPip: '#ffdc1e',
};

export const DICE_THEME_GLOW = {
    pip: colors.charcoal,
    up: 'radial-gradient(#ffcad9 20%, #ff4f69)',
    down: 'radial-gradient(#cdfcff 20%, #6ab79d)',
    flip: 'linear-gradient(-45deg, #8f8f8f, #ffffff, #8f8f8f)',
    random: 'radial-gradient(#fff 20%, #ffdc1e)',
    blocker: 'radial-gradient(#9e9e9e 20%, #757784)',
    blockerPip: colors.charcoal,
    bomb: 'radial-gradient(#c16d84, #757784 90%)',
    bombPip: colors.yellow_700,
};

export const getDiceTheme = (themeId) => {
    switch (themeId) {
        case DICE_THEME.highContrast:
            return DICE_THEME_HIGH_CONTRAST;
        case DICE_THEME.subdued:
            return DICE_THEME_SUBDUED;
        case DICE_THEME.tropical:
            return DICE_THEME_TROPICAL;
        case DICE_THEME.glow:
            return DICE_THEME_GLOW;
        case DICE_THEME.standard:
        default:
            return DICE_THEME_STANDARD;
    }
}

export const THEME_LIGHT = {
    colors,

    isDark: false,

    foreground: colors.charcoal,
    foregroundSecondary: colors.grey_500,

    background: colors.white,
    backgroundSecondary: colors.grey_1000,
    divider: colors.grey_900,

    highlight: colors.teal,

    modal: {
        background: colors.white,
    },

    header: {
        background: colors.grey_1000,
        backgroundInset: colors.white,
        text: colors.charcoal,
        textSecondary: colors.grey_500,
    },

    moves: {
        border: colors.grey_700,
        insideBorder: 'rgba(0,0,0,0.2)',
        used: colors.grey_500,
        ready: colors.green,
        warning: colors.yellow,
        danger: colors.red,
    },

    scores: {
        buttonBackground: colors.backgroundSecondary,
        buttonColor: colors.charcoal,
        currentScoreBackground: colors.yellow_900,
        textSecondary: 'rgba(0,0,0,0.5)',
    },

    dice: DICE_THEME_STANDARD,
};

export const THEME_DARK = {
    ...THEME_LIGHT,

    isDark: true,

    foreground: colors.white,
    foregroundSecondary: colors.grey_700,

    background: colors.grey_100,
    backgroundSecondary: colors.grey_200,
    divider: colors.grey_400,

    highlight: colors.teal,

    modal: {
        background: colors.grey_300,
    },

    header: {
        ...THEME_LIGHT.header,
        background: colors.grey_1000,
        backgroundInset: colors.grey_100,
        text: colors.white,
        textSecondary: colors.grey_700,
    },

    moves: {
        ...THEME_LIGHT.moves,
        border: colors.grey_400,
        insideBorder: 'rgba(0,0,0,0.2)',
        used: colors.grey_200,
        ready: colors.teal,
        warning: colors.yellow,
        danger: colors.red,
    },

    scores: {
        ...THEME_LIGHT.scores,
        buttonBackground: colors.grey_200,
        buttonColor: colors.white,
        currentScoreBackground: colors.teal,
        textSecondary: 'rgba(255,255,255,0.5)',
    },
};
