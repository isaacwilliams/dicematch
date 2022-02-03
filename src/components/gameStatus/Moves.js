import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import times from 'lodash/fp/times';

const shake = (degree) => keyframes`
    0% {
        transform: translate(0px, 0px);
    }
    25% {
        transform: translate(${degree}px, ${degree}px);
    }
    50% {
        transform: translate(0px, 0px);
    }
    75% {
        transform: translate(${-degree}px, ${-degree}px);
    }
`;

const StyledMoves = styled.div`
    grid-area: moves;

    display: grid;

    width: auto;
    height: 1.5rem;

    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: auto;

    border: 1px solid ${({ theme }) => theme.moves.border};
    border-radius: 0.2rem;

    box-shadow: 0 0 0 1px ${({ theme }) => theme.header.backgroundInset};

    overflow: hidden;

    ${({ moves }) => moves < 6 && css`
        color: red;
    `}

    ${({ moves }) => moves <= 3 && css`
        animation: ${shake(0.25)} 0.1s linear infinite;
    `}

    ${({ moves }) => moves <= 2 && css`
        animation: ${shake(0.5)} 0.1s linear infinite;
    `}

    ${({ moves }) => moves <= 1 && css`
        animation: ${shake(1)} 0.1s linear infinite;
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
    transition: background 0.1s linear;

    &:last-of-type {
        border-right: 0;
    }
`;

const Moves = ({ moves: { used, limit, cap } }) => {
    const movesLeft = limit - used;

    return (
        <StyledMoves moves={movesLeft}>
            {times((index) => (
                <StepBox key={index} moves={movesLeft} ready={index < movesLeft} />
            ), cap)}
        </StyledMoves>
    );
}

export default Moves;
