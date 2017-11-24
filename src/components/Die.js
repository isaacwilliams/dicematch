import React from 'react';
import styled, { css } from 'styled-components';

const StyledDie = styled.button`
    box-sizing: border-box;
    width: 62px;
    height: 62px;
    padding: 16px;
    margin: 1px;

    border: 0;
    border-radius: 4px;

    text-align: center;

    cursor: pointer;
    outline: none;

    ${props => props.type === 'up' && css`
        background: palevioletred;
        color: white;
    `}

    ${props => props.type === 'down' && css`
        background: LightSkyBlue;
        color: white;
    `}

    ${props => props.type === 'random' && css`
        background: LemonChiffon;
        color: black;
    `}
`;

const Number = styled.div`
    font-size: 24px;
`;

const Die = (props) => (
    <StyledDie {...props} onClick={() => props.updateDie(props.x, props.y)}>
        <Number>{props.value}</Number>
    </StyledDie>
);

export default Die;
