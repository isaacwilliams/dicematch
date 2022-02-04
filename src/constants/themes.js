
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

export const THEME_LIGHT = {
    colors,

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

    dice: {
        pip: colors.charcoal,
        up: colors.red,
        down: colors.teal,
        random: colors.yellow,
        blocker: colors.grey_500,
        flip: colors.beige,
    },
};

export const THEME_DARK = {
    ...THEME_LIGHT,

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
        buttonBackground: colors.grey_300,
        buttonColor: colors.white,
        currentScoreBackground: colors.teal,
        textSecondary: 'rgba(255,255,255,0.5)',
    },
};
