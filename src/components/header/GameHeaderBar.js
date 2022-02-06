import React from 'react';
import styled, { css } from 'styled-components';
import { MODALS } from '../../constants';

const GameHeaderBarContainer = styled.div`
    display: grid;

    width: 100vw;

    grid-template-columns: 3rem auto 3rem;
    grid-template-rows: 3rem;

    justify-items: center;
    align-items: center;

    background: ${props => props.theme.backgroundSecondary};
`;

const Button = styled.button`
    width: 3rem;
    height: 3rem;

    background-color: transparent;
    background-size: 1.5rem;
    background-position: center;
    background-repeat: no-repeat;
    border: 0;

    font-size: 0;
    color: rgba(0,0,0,0);

    opacity: 0.6;

    ${({ theme }) => (
        theme.isDark ? css`filter: invert(100%);` : css``
    )}
`;

const HelpButton = styled(Button)`
    width: 2rem;
    height: 2rem;
    background-image: url(${require('./icon-help.svg')});
`;

const SettingsButton = styled(Button)`
    width: 2rem;
    height: 2rem;
    background-image: url(${require('./icon-settings.svg')});
`;

const GameTitle = styled.div`
    height: 1.5rem;
    width: 100%;

    background-image: url(${require('./dicematch-logo-wide.svg')});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    font-size: 0;
    color: rgba(0,0,0,0);
`;

const GameHeaderBar = ({ openModal, theming }) => (
    <GameHeaderBarContainer>
        <HelpButton onClick={() => openModal(MODALS.HELP)}>
            Help
        </HelpButton>
        <GameTitle>
            DICE MATCH
        </GameTitle>
        <SettingsButton onClick={() => openModal(MODALS.SETTINGS)}>
            Settings
        </SettingsButton>
    </GameHeaderBarContainer>
);

export default GameHeaderBar;
