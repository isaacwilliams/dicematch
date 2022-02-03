import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import clamp from 'lodash/fp/clamp';

import GameBoard from './components/GameBoard';
import GameOverModal from './components/modal/GameOverModal';
import GameHeaderBar from './components/header/GameHeaderBar';
import GameStatusBar from './components/gameStatus/GameStatusBar';
import ScoreAnnouncer from './components/ScoreAnnouncer';

import { GAME_STATES, ACTIONS, BOARD_WIDTH, MODALS } from './constants';
import { Helmet } from 'react-helmet';
import HelpModal from './components/modal/HelpModal';

const clampDieSize = clamp(30, 80);

const colors = {
    white: '#ffffff',
    charcoal: '#282B40',
    charcoal_200: '#191D23',
    charcoal_100: '#111717',
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

const styleThemeLight = {
    colors,

    foreground: colors.charcoal,
    foregroundSecondary: colors.grey_500,

    background: colors.white,
    backgroundSecondary: colors.grey_1000,
    divider: colors.grey_900,

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

const styleThemeDark = {
    ...styleThemeLight,

    background: colors.charcoal_200,
    backgroundSecondary: colors.charcoal_100,
    backgroundTertiary: colors.charcoal_100,
};

const AppContainer = styled.div`
    display: grid;

    grid-template-columns: auto;
    grid-template-rows: auto auto 1fr;

    justify-content: center;

    height: 90vh;
    width: 100vw;

    background: ${props => props.theme.background};
`;

const GameContainer = styled.div`
    display: flex;
    align-self: end;
    justify-content: center;
    padding: 1rem 0;
    background: ${props => props.theme.background};
`;

const GlobalStyle = createGlobalStyle`
    body {
        background: ${props => props.theme.background};
    }
`;

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
    updateDie: (id) => dispatch({ type: ACTIONS.UPDATE_DIE, id }),
    restartGame: () => dispatch({ type: ACTIONS.GAME_RESET }),
    openModal: (modal) => dispatch({ type: ACTIONS.OPEN_MODAL, modal }),
    closeModal: () => dispatch({ type: ACTIONS.CLOSE_MODAL }),
});

class App extends Component {
    state = { diceSize: 0 };

    componentWillMount() {
        this.getDiceSize();

        window.addEventListener('resize', this.getDiceSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.getDiceSize);
    }

    getDiceSize = () => this.setState(() => ({ diceSize: clampDieSize((window.innerWidth - 20) / BOARD_WIDTH) }));

    render() {
        const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = styleThemeLight;

        const {
            gameState,
            modal,
        } = this.props;

        const {
            diceSize,
        } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Helmet>
                    <meta name="theme-color" content={theme.backgroundSecondary} />
                </Helmet>
                <AppContainer>
                    <GameHeaderBar {...this.props} />
                    <GameStatusBar {...this.props} />
                    <GameContainer>
                        <GameBoard {...this.props} diceSize={diceSize} />
                        <ScoreAnnouncer {...this.props} />
                    </GameContainer>

                    {gameState === GAME_STATES.FINISHED && (
                        <GameOverModal {...this.props} />
                    )}

                    {modal === MODALS.HELP && (
                        <HelpModal {...this.props} />
                    )}
                </AppContainer>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
