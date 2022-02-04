import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import clamp from 'lodash/fp/clamp';
import { Helmet } from 'react-helmet';

import GameBoard from './components/GameBoard';
import GameOverModal from './components/modal/GameOverModal';
import GameHeaderBar from './components/header/GameHeaderBar';
import GameStatusBar from './components/gameStatus/GameStatusBar';
import ScoreAnnouncer from './components/ScoreAnnouncer';
import HelpModal from './components/modal/HelpModal';
import SettingsModal from './components/modal/SettingsModal';

import { THEME_LIGHT, THEME_DARK } from './constants/themes';

import { GAME_STATES, ACTIONS, BOARD_WIDTH, MODALS } from './constants';


const clampDieSize = clamp(30, 80);

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
        const {
            gameState,
            modal,
            theming = {},
        } = this.props;

        const {
            diceSize,
        } = this.state;

        const theme = theming.interface === 'dark' ? THEME_DARK : THEME_LIGHT;

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

                    {modal === MODALS.SETTINGS && (
                        <SettingsModal {...this.props} />
                    )}
                </AppContainer>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
