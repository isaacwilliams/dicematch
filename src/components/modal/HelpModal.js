import React from 'react';
import styled from 'styled-components';
import { DIE_TYPES } from '../../constants';
import DieFace from '../DieFace';
import Level from '../gameStatus/Level';
import Moves from '../gameStatus/Moves';
import MeetDice from './MeetDice';

import Modal from './Modal';

const FlexCenter = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Header = styled.div`
    margin-left: -1rem;
    margin-right: -1rem;

    padding-bottom: 1rem;

    border-bottom: 1px solid ${(({ theme }) => theme.divider)};

    font-size: 1rem;
    font-weight: bold;
`;

const Line = styled.p`
    font-size: 1rem;
`;

const DieDisplay = styled.div`
    margin-right: 1px;

    svg {
        display: block;
    }
`;

const LevelDisplay = styled.div`
    border: 1px solid ${(({ theme }) => theme.divider)};
    border-radius: 0.5rem
`;

const HelpModal = ({ restartGame, ...props }) => {
    return (
        <Modal showCloseButton>
            <Header>How to play</Header>

            <Line>
                Tap a die to change its value.
            </Line>

            <FlexCenter>
                <DieDisplay>
                    <DieFace dieType={DIE_TYPES.UP} value={3} diceSize={48} />
                </DieDisplay>
                <DieDisplay>
                    <DieFace dieType={DIE_TYPES.UP} value={3} diceSize={48} />
                </DieDisplay>
                <DieDisplay>
                    <DieFace dieType={DIE_TYPES.UP} value={3} diceSize={48} />
                </DieDisplay>
            </FlexCenter>

            <Line>
                Match three or more with the same value.
            </Line>

            <FlexCenter>
                <LevelDisplay>
                    <Level {...props.level} />
                </LevelDisplay>
            </FlexCenter>

            <Line>
                Clear all the dice from the level...
            </Line>

            <Moves moves={{ used: 3, limit: 10, cap: 10 }} />

            <Line>
                ...before you run out of turns.
            </Line>

            <Header>
                Meet the dice
            </Header>

            <MeetDice />
        </Modal>
    );
}

export default HelpModal;
