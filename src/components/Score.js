import React from 'react';
import styled from 'styled-components';

const StyledScore = styled.div`
    font-size: 24px;
`;

const Score = ({ score }) => <StyledScore>Score: {score}</StyledScore>;

export default Score;
