import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import times from 'lodash/fp/times';
import { reduce } from 'lodash';

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

const StyledMoves = styled.div`
    grid-area: moves;

    display: grid;

    width: auto;

    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: auto;

    border: 1px solid ${({ theme }) => theme.moves.border};
    border-radius: 0.2rem;

    margin-left: 0.5rem;
    margin-right: 0.5rem;

    overflow: hidden;

    ${({ moves }) => moves < 6 && css`
        color: red;
    `}

    ${({ moves }) => moves <= 3 && css`
        animation: ${shake(1)} 0.1s linear infinite;
    `}

    ${({ moves }) => moves <= 2 && css`
        animation: ${shake(1.5)} 0.1s linear infinite;
    `}

    ${({ moves }) => moves <= 1 && css`
        animation: ${shake(2.5)} 0.1s linear infinite;
    `}
`;

const StepBox = styled.div`
    height: 100%;

    background: ${({ ready, moves, theme }) => {
        if (!ready) return theme.moves.used;
        if (moves <= 1) return theme.moves.danger;
        if (moves <= 3) return theme.moves.warning;
        return theme.moves.ready;
    }};

    border-right: 1px solid ${({ theme }) => theme.moves.insideBorder};
    transition: background 0.2s linear;
`;

const Moves = ({ moves: { used, limit, cap } }) => {
    const movesLeft = limit - used;

    return (
        <StyledMoves moves={movesLeft}>
            {times((index) => (
                <StepBox key={index} moves={movesLeft} ready={index < movesLeft} />
            ), cap)}
            {/* Moves left: <Count moves={limit - used}><div>{limit - used}</div></Count> */}
        </StyledMoves>
    );
}

export default Moves;
