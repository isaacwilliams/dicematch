import React from 'react';
import styled from 'styled-components';

const StyledMoves = styled.div`
    font-size: 18px;
`;

const Moves = ({ moves }) => <StyledMoves>Moves: {moves}</StyledMoves>;

export default Moves;
