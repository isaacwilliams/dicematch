import React from 'react';
import styled from 'styled-components';

import getDieColor from './getDieColor';

import { DIE_TYPES, DIE_SIZE } from '../constants';

const StyledDie = styled.button`
    position: absolute;
    box-sizing: border-box;
    width: ${DIE_SIZE - 2}px;
    height: ${DIE_SIZE - 2}px;

    border: 0;
    border-radius: 4px;

    text-align: center;

    cursor: pointer;
    outline: none;

    transition: top 0.5s ease-in;

    ${getDieColor}
`;

const getInlineStyle = ({ x, y }) => ({
    top: y * DIE_SIZE,
    left: x * DIE_SIZE,
})

const Number = styled.div`
    font-size: 24px;
`;

const Die = (props) => {
    const onClick = () => {
        props.moves &&
        props.inputEnabled &&
        props.dieType !== DIE_TYPES.BLOCKER &&
        props.updateDie(props.id)
    };

    return (
        <StyledDie {...props}
                style={getInlineStyle(props)}
                onClick={onClick}
                title={`id: ${props.id} x: ${props.x} y: ${props.y}`}>
            <Number>{props.value}</Number>
        </StyledDie>
    );
};

export default Die;
