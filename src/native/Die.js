import React from 'react';

import {
    TouchableWithoutFeedback,
    Animated,
    Easing,
    Image,
} from 'react-native';

import { DIE_TYPES } from '../constants';

const getDieFaceImage = (value) => {
    switch (value) {
        case 1:
            return require('../../assets/die-face1.png');
        case 2:
            return require('../../assets/die-face2.png');
        case 3:
            return require('../../assets/die-face3.png');
        case 4:
            return require('../../assets/die-face4.png');
        case 5:
            return require('../../assets/die-face5.png');
        case 6:
            return require('../../assets/die-face6.png');
        default:
            return '';
    }
}

const getStyle = ({ diceWidth, dieType }) => ({
    left: 1,
    top: 1,
    width: diceWidth - 2,
    height: diceWidth - 2,
    borderRadius: 4,
    backgroundColor: getBackgroundColor(dieType),
});

const getBackgroundColor = (dieType) => {
    switch (dieType) {
        case DIE_TYPES.DOWN:
            return '#56B9D0';
        case DIE_TYPES.BLOCKER:
            return '#3B3F42';
        case DIE_TYPES.RANDOM:
            return '#FBBA42';
        case DIE_TYPES.UP:
            return '#F24C27';
        default:
            return '#AAAAAA';
    }
};

const getTransformStyle = (position) => ({
    position: 'absolute',
    transform: [
        { translateX: position.x },
        { translateY: position.y },
    ],
});

class Die extends React.Component {
    componentWillMount() {
        this.setState({
            position: new Animated.ValueXY({
                x: this.props.x * this.props.diceWidth,
                y: this.props.y * this.props.diceWidth,
            }),
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.y === nextProps.y) return;

        Animated.timing(
            this.state.position,
            {
                toValue: {
                    x: nextProps.x * this.props.diceWidth,
                    y: nextProps.y * this.props.diceWidth,
                },
                easing: Easing.in(Easing.quad),
                duration: 300,
                useNativeDriver: true,
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
            <Animated.View style={getTransformStyle(this.state.position)}>
                <TouchableWithoutFeedback onPress={this.handleDieUpdate}>
                    <Image style={getStyle(this.props)} source={getDieFaceImage(this.props.value)} />
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    }
}

export default Die;
