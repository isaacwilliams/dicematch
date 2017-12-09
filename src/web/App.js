import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import clamp from 'lodash/fp/clamp';

import GameBoard from './components/GameBoard';
import Score from './components/Score';
import Moves from './components/Moves';
import Level from './components/Level';
import GameOverModal from './components/GameOverModal';
import ScoreAnnouncer from './components/ScoreAnnouncer';

import { GAME_STATES, ACTIONS, BOARD_WIDTH } from '../constants';

import './index.css';

const clampDieSize = clamp(30, 80);


const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    height: 100%;
    width: 100%;
`;

const GameStatus = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    background: white;
    height: 100%;
    width: 100%;
`;

const GameContainer = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;

    align-items: center;

    padding: 10px 0;

    height: 100%;
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
            <AppContainer>
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
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
