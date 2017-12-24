import React from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import {
    View,
    Animated,
} from 'react-native';

import Die from './Die';

import { BOARD_HEIGHT } from '../constants';

class Fade extends React.Component {
    componentWillMount() {
        this.setState({
            opacity: new Animated.Value(1),
        })
    }

    componentWillReceiveProps({ state }) {
        if (this.props.state === state) return;

        if (state === 'exiting') {
            Animated.timing(
                this.state.opacity,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }
            ).start();
        }
    }

    render() {
        return (
            <Animated.View style={{ opacity: this.state.opacity }}>
                {this.props.children}
            </Animated.View>
        );
    }
}

const FadeTransition = ({ children, ...props }) => (
    <Transition timeout={300} {...props}>
        {(state) => (
            <Fade state={state}>
                {children}
            </Fade>
        )}
    </Transition>
);

const GameBoard = ({ gameBoard, ...props }) => (
    <TransitionGroup component={View} style={{ height: BOARD_HEIGHT * props.diceWidth, overflow: 'hidden' }}>
        {gameBoard.map((die) => (
            <FadeTransition key={die.id}>
                <Die {...props} {...die} />
            </FadeTransition>
        ))}
    </TransitionGroup>
);

export default GameBoard;
