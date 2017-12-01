import React from 'react';
import styled from 'styled-components';

import AnimatedDieFace from './AnimatedDieFace';
import DieFace from './DieFace';

import { DIE_TYPES } from '../constants';

const DieButton = styled.button`
    padding: 0;
    border: 0;

    background: transparent;

    text-align: center;

    cursor: pointer;
    outline: none;
`;

const Positioner = styled.div`
    position: absolute;
    transition: transform 0.5s ease-in;
    perspective: 500px;
    perspective-origin: 50% 50%;
`;

const getInlineStyle = ({ x, y, diceSize }) => ({
    transform: `translate(${diceSize * x}px, ${diceSize * y - 5}px)`
});

const DiePositioner = ({ children, ...props }) => (
    <Positioner style={getInlineStyle(props)}>
        {children}
    </Positioner>
);

class Die extends React.Component {
    shouldComponentUpdate({ value, x, y }) {
        return !(
            value === this.props.value &&
            x === this.props.x &&
            y === this.props.y
        );
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
        const {
            diceSize,
            x,
            y,
            id,
        } = this.props;

        return (
            <DiePositioner {...this.props}>
                <DieButton {...this.props}
                        onClick={this.handleDieUpdate}
                        title={`id: ${id} x: ${x} y: ${y}`}>
                    <AnimatedDieFace {...this.props}>
                        <DieFace {...this.props} diceSize={diceSize - 2} />
                    </AnimatedDieFace>
                </DieButton>
            </DiePositioner>
        );
    };
}

export default Die;
