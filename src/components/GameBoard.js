import React from 'react';
import styled from 'styled-components';

import Die from './Die';

const StyledBoard = styled.div`
    display: flex;
    flex-wrap: wrap;

    width: ${64 * 5}px;
`;


const GameBoard = ({ grid, ...rest }) => (
    <StyledBoard className="GameBoard">
        {grid.map((die, i) => <Die key={die.id} {...rest} {...die} x={i % 5} y={Math.floor(i / 5)} />)}
    </StyledBoard>
);

export default GameBoard;
