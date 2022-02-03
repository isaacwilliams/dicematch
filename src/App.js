import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import clamp from 'lodash/fp/clamp';

import GameBoard from './components/GameBoard';
import Score from './components/Score';
import Moves from './components/Moves';
import Level from './components/Level';
import GameOverModal from './components/GameOverModal';
import ScoreAnnouncer from './components/ScoreAnnouncer';
import GameHeaderBar from './components/header/GameHeaderBar';

import { GAME_STATES, ACTIONS, BOARD_WIDTH } from './constants';

const clampDieSize = clamp(30, 80);

const styleThemeLight = {
    background: 'white',
    backgroundSecondary: '#eeeeee',
};

const AppContainer = styled.div`
    display: grid;

    grid-template-columns: auto;
    grid-template-rows: auto auto 1fr;

    height: 90vh;
    width: 100vw;

    background: ${props => props.theme.background};
`;

const GameStatus = styled.div`
    display: grid;
`;

const GameContainer = styled.div`
    align-self: end;
    padding: 1rem 0;
    background: ${props => props.theme.background};
`;


const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
    updateDie: (id) => dispatch({ type: ACTIONS.UPDATE_DIE, id }),
    restartGame: () => dispatch({ type: ACTIONS.GAME_RESET })
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
        return (
            <ThemeProvider theme={styleThemeLight}>
                <AppContainer>
                    <GameHeaderBar />
                    <GameStatus>
                        <div>
                            <Level {...this.props.level} />
                            <Moves {...this.props} />
                        </div>

                        <Score {...this.props} />
                    </GameStatus>
                    <GameContainer>
                        <GameBoard {...this.props} diceSize={this.state.diceSize} />
                        <ScoreAnnouncer {...this.props} />
                    </GameContainer>
                    {this.props.gameState === GAME_STATES.FINISHED &&
                        <GameOverModal {...this.props} />}
                </AppContainer>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
