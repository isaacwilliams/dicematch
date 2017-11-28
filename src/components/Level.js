import React from 'react';
import styled from 'styled-components';

import DieFace from './DieFace';

const StyledLevel = styled.div`
    padding: 0 5px;
    font-size: 18px;
`;

const UpcomingDice = styled.div`
    display: flex;
    font-size: 16px;

    .title {
        margin-right: 10px;
    }
`;

const MiniDie = styled.div`
    margin-right: 1px;
`;

const Level = ({ level, upcomingDice }) => (
    <StyledLevel>
        <UpcomingDice>
            <span className='title'>Upcoming:</span>
            {upcomingDice.slice(0, 5).map((die, i) => (
                <MiniDie key={i}>
                    <DieFace {...die} diceSize={18} />
                </MiniDie>
            ))}
        </UpcomingDice>
    </StyledLevel>
);

export default Level;
