import React from 'react';
import styled from 'styled-components';

import UpcomingDice from './UpcomingDice';

const StyledLevelContainer = styled.div`
    grid-area: level;
    padding: 0.3rem 0.5rem 0.5rem;
    background: ${({ theme }) => theme.header.backgroundInset};
    border-radius: 0.5rem
`;

const StyledLevel = styled.div`
    display: flex;

    align-items: center;
    margin-bottom: 0.3rem;

    font-size: 0.8rem;
    font-weight: bold;
    color: ${({ theme }) => theme.header.text};

    .title {
        margin-right: 0.5rem;

        font-size: 0.8rem;
        font-weight: bold;
        color: ${({ theme }) => theme.header.textSecondary};
    }
`;

const Level = ({ level, ...rest }) => {
    return (
        <StyledLevelContainer>
            <StyledLevel>
                <span className="title">Level</span>
                <span className="score">{level}</span>
            </StyledLevel>
            <UpcomingDice {...rest} />
        </StyledLevelContainer>

    );
};

export default Level;
