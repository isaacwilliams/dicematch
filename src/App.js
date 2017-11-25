import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameBoard from './components/GameBoard';

const mapStateToProps = (state) => ({
    grid: state.gameBoard,
});

const mapDispatchToProps = (dispatch) => ({
    updateDie: (id) => dispatch({ type: 'UPDATE_DIE', id })
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
