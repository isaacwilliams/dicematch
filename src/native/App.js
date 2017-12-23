import React from 'react';
import { connect } from 'react-redux';

import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';

import { GAME_STATES, ACTIONS, BOARD_WIDTH, DIE_TYPES } from '../constants';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
    updateDie: (id) => dispatch({ type: ACTIONS.UPDATE_DIE, id }),
    restartGame: () => dispatch({ type: ACTIONS.GAME_RESET })
});

const getStyle = ({ x, y, diceSize }) => ({
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: diceSize,
    height: diceSize,
    backgroundColor: 'powderblue',
})

class Die extends React.Component {
    componentWillMount() {
        this.setState({
            position: new Animated.ValueXY({
                x: this.props.x * this.props.diceSize,
                y: this.props.y * this.props.diceSize,
            }),
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.y === nextProps.y) return;

        Animated.timing(
            this.state.position,
            {
                toValue: {
                    x: nextProps.x * this.props.diceSize,
                    y: nextProps.y * this.props.diceSize,
                },
                easing: Easing.in,
                duration: 300,
            }
        ).start();
    }

    handleDieUpdate = () => {
        const {
            moves,
            inputEnabled,
            dieType,
            updateDie,
            id,
        } = this.props;

        if (
            moves.limit - moves.used <= 0 ||
            !inputEnabled ||
            dieType === DIE_TYPES.BLOCKER
        ) return;

        updateDie(id);
    }

    render() {
        return (
            <Animated.View style={{ position: 'absolute', left: this.state.position.x, top: this.state.position.y }}>
                <TouchableOpacity style={getStyle(this.props)} onPress={this.handleDieUpdate}>
                    <Text>{this.props.value}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

class App extends React.Component {
    componentWillMount() {
        this.getDiceSize();
    }

    getDiceSize = () => {
        const { width } = Dimensions.get('window');
        this.setState(() => ({ diceSize: Math.floor(width / BOARD_WIDTH) }))
    };

    render() {
        const { gameBoard } = this.props;

        return (
            <View>
                <View>
                    {gameBoard.map((die) => (
                        <Die key={die.id} {...this.props} {...die} diceSize={this.state.diceSize} />
                    ))}
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
