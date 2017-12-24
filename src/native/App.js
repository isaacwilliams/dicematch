import React from 'react';
import { connect } from 'react-redux';
import { Transition, TransitionGroup } from 'react-transition-group';

import {
    Dimensions,
    View,
} from 'react-native';

import GameBoard from './GameBoard';

import { GAME_STATES, ACTIONS, BOARD_WIDTH, DIE_TYPES } from '../constants';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
    updateDie: (id) => dispatch({ type: ACTIONS.UPDATE_DIE, id }),
    restartGame: () => dispatch({ type: ACTIONS.GAME_RESET })
});

class App extends React.Component {
    componentWillMount() {
        this.getDiceWidth();
    }

    getDiceWidth = () => {
        const { width } = Dimensions.get('window');
        this.setState(() => ({ diceWidth: Math.floor(width / BOARD_WIDTH) }))
    };

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                <GameBoard {...this.props} diceWidth={this.state.diceWidth} />
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
