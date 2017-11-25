import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const StyledMoves = styled.div`
    font-size: 18px;
`;

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

const Count = styled.span`
    display: inline-block;

    ${({ moves }) => moves < 6 && css`
        color: red;
    `}

    ${({ moves }) => moves <= 4 && css`
        animation: ${shake(5)} 0.15s linear infinite;
    `}

    ${({ moves }) => moves <= 2 && css`
        font-size: 1.2em;
        animation: ${shake(15)} 0.15s linear infinite;
    `}

    ${({ moves }) => moves === 1 && css`
        font-size: 1.4em;
    `}
`;

const Moves = ({ moves }) => (
    <StyledMoves>
        Moves: <Count moves={moves}>{moves}</Count>
    </StyledMoves>
);

export default Moves;
