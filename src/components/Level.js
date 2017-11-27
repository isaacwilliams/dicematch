import React from 'react';
import styled from 'styled-components';

import getDieColor from './getDieColor';

import DieFace from './DieFace';

const StyledLevel = styled.div`
    padding: 5px;
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
    margin-right: 1px;
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
                {nextNiceDisplay.slice(0, 4).map((die, i) => (
                    <MiniDie>
                        <DieFace key={i} {...die} diceSize={18} />
                    </MiniDie>
                ))}
                {nextMore > 0 && <More>+ {nextMore}</More>}
            </UpcomingDice>
        </StyledLevel>
    );
};

export default Level;
