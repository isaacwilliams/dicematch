import React from 'react';
import styled from 'styled-components';

import getDieColor from './getDieColor';

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

    ${getDieColor}
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
