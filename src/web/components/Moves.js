import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const StyledMoves = styled.div`
    padding: 0 5px;
    font-size: 18px;
    height: ${18 + 10}px;
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
        animation: ${shake(5)} 0.1s linear infinite;
        > div { transform: scale(1.2); }
    `}

    ${({ moves }) => moves <= 2 && css`
        animation: ${shake(15)} 0.1s linear infinite;
        > div { transform: scale(1.5); }
    `}

    ${({ moves }) => moves <= 1 && css`
        animation: ${shake(20)} 0.1s linear infinite;
        > div { transform: scale(1.8); }
    `}
`;

const Moves = ({ moves: { used, limit } }) => (
    <StyledMoves>
        Moves left: <Count moves={limit - used}><div>{limit - used}</div></Count>
    </StyledMoves>
);

export default Moves;
