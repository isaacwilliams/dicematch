import React from 'react';
import styled, { css } from 'styled-components';

const StyledDie = styled.button`
    position: absolute;
    box-sizing: border-box;
    width: 62px;
    height: 62px;

    border: 0;
    border-radius: 4px;

    text-align: center;

    cursor: pointer;
    outline: none;

    transition: top 0.5s ease-in;

    ${props => props.dieType === 'up' && css`
        background: palevioletred;
        color: white;
    `}

    ${props => props.dieType === 'down' && css`
        background: LightSkyBlue;
        color: white;
    `}

    ${props => props.dieType === 'random' && css`
        background: LemonChiffon;
        color: black;
    `}

    ${props => props.dieType === 'blocker' && css`
        background: DarkGrey;
        color: Grey;
    `}

    ${props => props.removed && css`
        background: black;
        color: black;
    `}
`;

const getInlineStyle = ({ x, y }) => ({
    top: y * 64,
    left: x * 64,
})

const Number = styled.div`
    font-size: 24px;
`;

const Die = (props) => {
    if (props.removed) return null;

    return (
        <StyledDie {...props}
                style={getInlineStyle(props)}
                onClick={() => props.moves && props.inputEnabled && props.updateDie(props.id)}
                title={`id: ${props.id} x: ${props.x} y: ${props.y}`}>
            <Number>{props.value}</Number>
        </StyledDie>
    );
};

export default Die;
