import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameBoard from './components/GameBoard';
import Score from './components/Score';
import Moves from './components/Moves';
import Level from './components/Level';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
    updateDie: (id) => dispatch({ type: 'UPDATE_DIE', id })
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <GameBoard {...this.props} />
                <Score {...this.props} />
                <Moves {...this.props} />
                <Level {...this.props.level} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
