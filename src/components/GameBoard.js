import React from 'react';
import styled from 'styled-components';
import values from 'lodash/fp/values';
import { Transition, TransitionGroup } from 'react-transition-group';

import Die from './Die';

import { BOARD_WIDTH, BOARD_HEIGHT, DIE_SIZE } from '../constants';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in`,
    opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

const Fade = ({ children, ...props }) => (
    <Transition {...props} timeout={duration}>
        {(state) => (
            <span style={{ ...defaultStyle, ...transitionStyles[state] }}>
                {children}
            </span>
        )}
    </Transition>
);

const BoardWrapper = styled.div`
    padding: 10px;
    background: white;
    overflow: hidden;
`;

const StyledBoard = styled.div`
    position: relative;
    width: ${BOARD_WIDTH * DIE_SIZE}px;
    height: ${BOARD_HEIGHT * DIE_SIZE}px;
`;


const GameBoard = ({ gameBoard, ...rest }) => (
    <BoardWrapper>
        <StyledBoard className="GameBoard">
            <TransitionGroup>
                {values(gameBoard).map((die, i) => (
                    <Fade key={die.id}>
                        <Die {...rest} {...die} />
                    </Fade>
                ))}
            </TransitionGroup>
        </StyledBoard>
    </BoardWrapper>
);

export default GameBoard;
