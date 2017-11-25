import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameBoard from './components/GameBoard';
import Score from './components/Score';

const mapStateToProps = (state) => ({
    grid: state.gameBoard,
    score: state.score,
    inputEnabled: state.inputEnabled,
});

const mapDispatchToProps = (dispatch) => ({
    updateDie: (id) => dispatch({ type: 'UPDATE_DIE', id })
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <GameBoard {...this.props} />
                <Score {...this.props} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
