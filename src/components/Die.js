import React from 'react';
import styled from 'styled-components';

import DieFace from './DieFace';

import getDieColor from './getDieColor';

import { DIE_TYPES, DIE_SIZE } from '../constants';


const StyledDie = styled.button`
    position: absolute;
    box-sizing: border-box;
    padding: 0;
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
});

const Die = (props) => {
    const {
        moves,
        inputEnabled,
        x,
        y,
        dieType,
        updateDie,
        id,
    } = props;

    const onClick = () => {
        (moves.limit - moves.used) &&
        inputEnabled &&
        dieType !== DIE_TYPES.BLOCKER &&
        updateDie(props.id)
    };

    return (
        <StyledDie {...props}
                style={getInlineStyle(props)}
                onClick={onClick}
                title={`id: ${id} x: ${x} y: ${y}`}>
            <DieFace {...props} />
        </StyledDie>
    );
};

export default Die;
