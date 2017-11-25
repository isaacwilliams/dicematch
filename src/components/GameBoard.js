import React from 'react';
import styled from 'styled-components';
import values from 'lodash/fp/values';

import Die from './Die';

import { BOARD_WIDTH, BOARD_HEIGHT, DIE_SIZE } from '../constants';

const StyledBoard = styled.div`
    position: relative;
    width: ${BOARD_WIDTH * DIE_SIZE}px;
    height: ${BOARD_HEIGHT * DIE_SIZE}px;
    overflow: hidden;
`;


const GameBoard = ({ gameBoard, ...rest }) => (
    <StyledBoard className="GameBoard">
        {values(gameBoard).map((die, i) => (
            <Die key={die.id} {...rest} {...die} />
        ))}
    </StyledBoard>
);

export default GameBoard;
