import React from 'react';
import styled from 'styled-components';
import values from 'lodash/fp/values';

import Die from './Die';

import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

const StyledBoard = styled.div`
    position: relative;
    width: ${BOARD_WIDTH * 64}px;
    height: ${BOARD_HEIGHT * 64}px;
`;


const GameBoard = ({ gameBoard, ...rest }) => (
    <StyledBoard className="GameBoard">
        {values(gameBoard).map((die, i) => (
            <Die key={die.id} {...rest} {...die} />
        ))}
    </StyledBoard>
);

export default GameBoard;
