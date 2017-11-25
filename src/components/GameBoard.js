import React from 'react';
import styled from 'styled-components';
import values from 'lodash/fp/values';

import Die from './Die';

const StyledBoard = styled.div`
    position: relative;
    width: ${5 * 64}px;
    height: ${5 * 64}px;
`;


const GameBoard = ({ gameBoard, ...rest }) => (
    <StyledBoard className="GameBoard">
        {values(gameBoard).map((die, i) => (
            <Die key={die.id} {...rest} {...die} />
        ))}
    </StyledBoard>
);

export default GameBoard;
