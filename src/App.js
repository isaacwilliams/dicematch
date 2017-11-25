import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import GameBoard from './components/GameBoard';
import Score from './components/Score';
import Moves from './components/Moves';
import Level from './components/Level';

const GameStatus = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;

const GameContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
`;


const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
    updateDie: (id) => dispatch({ type: 'UPDATE_DIE', id })
});

class App extends Component {
    render() {
        return (
            <div className="App">
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
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
