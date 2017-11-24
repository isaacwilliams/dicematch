import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameBoard from './components/GameBoard';

const mapStateToProps = (state) => ({
    grid: state.gameBoard,
});

const mapDispatchToProps = (dispatch) => ({
    updateDie: (x, y) => dispatch({ type: 'UPDATE_DIE', x, y })
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <GameBoard {...this.props} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
