import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import DieFace from './DieFace';

import { DIE_TYPES } from '../constants';

const shake = (degree) => keyframes`
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(-${degree}deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
        transform: rotate(${degree}deg);
    }
`;

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


const DieWithMoves = styled.div`
    ${props => props.bonusMoves && css`
        animation: ${shake(2.5)} 0.1s linear infinite;
    `}
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
                <DieWithMoves {...props}>
                    <DieFace {...props} diceSize={diceSize - 2} />
                </DieWithMoves>
        </StyledDie>
    );
};

export default Die;
