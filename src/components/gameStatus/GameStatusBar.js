import React from 'react';
import styled from 'styled-components';
import Level from './Level';
import Moves from './Moves';
import Score from './Score';

const GameStatus = styled.div`
    display: grid;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;

    column-gap: 0.5rem;
    row-gap: 0.5rem;

    padding: 0.5rem 0.5rem;

    grid-template-areas:
        "level score"
        "moves moves";

    background: ${({ theme }) => theme.backgroundSecondary};
`;

const GameStatusBar = (props) => (
    <GameStatus>
        <Score {...props} />
        <Level {...props.level} />

        <Moves {...props} />
    </GameStatus>
);

export default GameStatusBar;
