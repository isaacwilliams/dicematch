import React from 'react';
import styled from 'styled-components';
import values from 'lodash/fp/values';

import Die from './Die';

const StyledBoard = styled.div`
    position: relative;
`;


const GameBoard = ({ grid, ...rest }) => (
    <StyledBoard className="GameBoard">
        {values(grid).map((die, i) => (
            <Die key={die.id} {...rest} {...die} />
        ))}
    </StyledBoard>
);

export default GameBoard;
