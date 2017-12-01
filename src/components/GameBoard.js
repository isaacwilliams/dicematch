import React from 'react';
import styled from 'styled-components';
import { Transition, TransitionGroup } from 'react-transition-group';

import Die from './Die';

import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
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

const Board = styled.div`
    position: relative;
`;

const getBoardSize = ({ diceSize }) => ({
    width: diceSize * BOARD_WIDTH,
    height: diceSize * BOARD_HEIGHT,
})

const GameBoard = ({ gameBoard, ...props }) => (
    <BoardWrapper>
        <Board className="GameBoard" style={getBoardSize(props)}>
            <TransitionGroup>
                {gameBoard.map((die, i) => (
                    <Fade key={die.id}>
                        <Die {...props} {...die} />
                    </Fade>
                ))}
            </TransitionGroup>
        </Board>
    </BoardWrapper>
);

export default GameBoard;
