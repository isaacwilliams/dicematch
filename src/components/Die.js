import React from 'react';
import styled from 'styled-components';

import DieFace from './DieFace';

import { DIE_TYPES } from '../constants';

const StyledDie = styled.button`
    position: absolute;
    box-sizing: border-box;
    padding: 0;
    border: 0;

    background: transparent;

    text-align: center;

    cursor: pointer;
    outline: none;

    transition: transform 0.5s ease-in;
`;

const getInlineStyle = ({ x, y, diceSize }) => ({
    transform: `translate(${diceSize * x}px, ${diceSize * y}px)`
});

const Die = (props) => {
    const {
        moves,
        inputEnabled,
        diceSize,
        x,
        y,
        dieType,
        updateDie,
        id,
    } = props;

    const onClick = () => {
        (moves.limit - moves.used) &&
        inputEnabled &&
        dieType !== DIE_TYPES.BLOCKER &&
        updateDie(props.id)
    };

    return (
        <StyledDie {...props}
                style={getInlineStyle(props)}
                onClick={onClick}
                title={`id: ${id} x: ${x} y: ${y}`}>
            <DieFace {...props} diceSize={diceSize - 2} />
        </StyledDie>
    );
};

export default Die;
