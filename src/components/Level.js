import React from 'react';
import styled from 'styled-components';

import getDieColor from './getDieColor';

const StyledLevel = styled.div`
    font-size: 18px;
`;

const MiniDie = styled.div`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 2px;

    ${getDieColor}
`;

const Level = ({ level, upcomingDice }) => (
    <StyledLevel>
        Level: {level}
        {upcomingDice.map((dieType, i) => <MiniDie key={i} dieType={dieType} />)}
    </StyledLevel>
);

export default Level;
