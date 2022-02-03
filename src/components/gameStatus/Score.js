import React from 'react';
import styled from 'styled-components';

import InsetPanel from './InsetPanel';

const StyledScore = styled(InsetPanel)`
    grid-area: score;
`;

const Score = ({ score }) => (
    <StyledScore>
        <span className="title">Score</span>
        <span className="score">{score}</span>
    </StyledScore>
);

export default Score;
