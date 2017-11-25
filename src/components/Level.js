import React from 'react';
import styled from 'styled-components';

import getDieColor from './getDieColor';

const StyledLevel = styled.div`
    font-size: 18px;
`;

const UpcomingDice = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;

    .title {
        margin-right: 10px;
    }
`;

const MiniDie = styled.div`
    width: 10px;
    height: 10px;
    margin-right: 1px;
    border-radius: 2px;

    ${getDieColor}
`;

const More = styled.span`
    font-size: 12px;
`;

const Level = ({ level, upcomingDice }) => {
    const nextNiceDisplay = upcomingDice.slice(0, 4);
    const nextMore = upcomingDice.length - 4;

    return (
        <StyledLevel>
            Level: {level}
            <UpcomingDice>
                <span className='title'>Upcoming:</span>
                {nextNiceDisplay.slice(0, 4).map((dieType, i) => <MiniDie key={i} dieType={dieType} />)}
                {nextMore > 0 && <More>+ {nextMore}</More>}
            </UpcomingDice>
        </StyledLevel>
    );
};

export default Level;
