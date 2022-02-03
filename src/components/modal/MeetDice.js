import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { clamp } from 'lodash';

import DieFace from '../DieFace';

import { DIE_TYPES } from '../../constants';
import { updateDieDown, updateDieFlip, updateDieRandom, updateDieUp } from '../../reducers/dieReducer';
import AnimatedDieFace from '../AnimatedDieFace';

const MeetDieContainer = styled.div`
    position: relative;
    height: 12rem;
    overflow: hidden;
`;

const bounceLeft = keyframes`
    0% { transform: translate(0, 0); }
    5% { transform: translate(-3px, 0); }
    20% { transform: translate(0, 0); }
    100% { transform: translate(0, 0); }
`;

const bounceRight = keyframes`
    0% { transform: translate(0, 0); }
    5% { transform: translate(3px, 0); }
    20% { transform: translate(0, 0); }
    100% { transform: translate(0, 0); }
`;

const NavigateButton = styled.button`
    position: absolute;
    display: flex;

    align-items: center;
    justify-content: center;

    top: 0;

    width: 3rem;
    height: 100%;

    border 0;

    font-size: 1rem;
    font-family: inherit;
    color: ${(({ theme }) => theme.foreground)};

    background: transparent;

    z-index: 1;

    &.left {
        left: -1rem;

        &.animate {
            animation: ${bounceLeft} 0.7s linear infinite;
        }
    }

    &.right {
        right: -1rem;

        &.animate {
            animation: ${bounceRight} 0.7s linear infinite;
        }
    }

    &:disabled {
        opacity: 0.2;
    }
`;

const DieListContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    height: 100%;

    transition: left 0.3s ease-in-out;
`;

const DieContainer = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    p {
        position: absolute;
        bottom: -1rem;
        color: ${({ theme }) => theme.foregroundSecondary}
    }
`;

const DieButton = styled.button`
    display: flex;
    flex-direction: column;

    align-items: flex-start;
    justify-content: flex-start;

    width: calc(64px + 2rem);
    height: calc(64px + 2rem);

    border 0;
    padding: 1rem;

    background: transparent;
`;

const DICE_DESCRIPTIONS = [
    {
        id: 1,
        dieType: DIE_TYPES.UP,
        value: 1,
        dieSize: 6,
        description: 'Increases in value',
        updater: updateDieUp,
    },
    {
        id: 2,
        dieType: DIE_TYPES.DOWN,
        value: 2,
        dieSize: 6,
        description: 'Goes down smooth',
        updater: updateDieDown,
    },
    {
        id: 3,
        dieType: DIE_TYPES.FLIP,
        value: 3,
        dieSize: 6,
        description: 'Flip-flops. Always adds to 7.',
        updater: updateDieFlip,
    },
    {
        id: 4,
        dieType: DIE_TYPES.RANDOM,
        value: 4,
        dieSize: 6,
        description: 'Rolls kinda wild.',
        updater: updateDieRandom,
    },
    {
        id: 5,
        dieType: DIE_TYPES.BLOCKER,
        value: 5,
        dieSize: 6,
        description: 'Can’t be moved. Still matches.',
    },
    {
        id: 6,
        dieType: DIE_TYPES.BOMB,
        value: 6,
        dieSize: 6,
        description: 'Explosive if it reaches zero.',
    },
];

const MeetDice = () => {
    const [viewIndex, setViewIndex] = useState(0);
    const [dieDescriptions, setDieDescriptions] = useState(DICE_DESCRIPTIONS);

    const atStart = viewIndex <= 0;
    const atEnd = viewIndex >= DICE_DESCRIPTIONS.length - 1;

    const navigate = (direction) => setViewIndex(
        clamp(viewIndex + direction, 0, DICE_DESCRIPTIONS.length - 1)
    );

    const handleDieUpdate = (id) => {
        setDieDescriptions(dieDescriptions.map((die) => {
            if (!die.updater) return die;
            if (id !== die.id) return die;

            return die.updater(die, { id })
        }))
    };

    console.log('dieDescriptions', dieDescriptions);

    return (
        <MeetDieContainer>
            <NavigateButton className={`left ${atEnd ? 'animate' : ''}`} onClick={() => navigate(-1)} disabled={atStart}>
                &lt;
            </NavigateButton>
            <NavigateButton className={`right ${atStart ? 'animate' : ''}`} onClick={() => navigate(1)} disabled={atEnd}>
                &gt;
            </NavigateButton>

            <DieListContainer style={{ width: `${DICE_DESCRIPTIONS.length * 100}%`, left: `${viewIndex * -100}%` }}>
                {dieDescriptions.map(({ id, dieType, value, description, updater }) => (
                    <DieContainer key={id}>
                        <DieButton onClick={() => {
                            updater && handleDieUpdate(id);
                        }}>
                            <AnimatedDieFace dieType={dieType} value={value} diceSize={64}>
                                <DieFace dieType={dieType} value={value} diceSize={64} />
                            </AnimatedDieFace>
                        </DieButton>
                        <p>{description}</p>
                    </DieContainer>
                ))}
            </DieListContainer>
        </MeetDieContainer>
    );
};

export default MeetDice;
