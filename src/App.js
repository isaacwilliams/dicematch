import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import GameBoard from './components/GameBoard';
import Score from './components/Score';
import Moves from './components/Moves';
import Level from './components/Level';
import GameOverModal from './components/GameOverModal';

import { GAME_STATES, ACTIONS } from './constants';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    height: 100%;
`;

const GameStatus = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background: white;
`;

const GameContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    justify-content: flex-start;
    align-items: center;
    align-content: stretch;

    padding: 10px 0;

    height: 100%;
`;


const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
    updateDie: (id) => dispatch({ type: ACTIONS.UPDATE_DIE, id }),
    restartGame: () => dispatch({ type: ACTIONS.GAME_RESET })
});

class App extends Component {
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
                    <GameBoard {...this.props} />
                </GameContainer>
                {this.props.gameState === GAME_STATES.FINISHED &&
                    <GameOverModal {...this.props} />}
            </AppContainer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
