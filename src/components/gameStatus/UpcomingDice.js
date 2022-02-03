import React from 'react';
import styled from 'styled-components';

import DieFace from '../DieFace';

const StyledUpcomingDice = styled.div`
    grid-area: upcoming;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .dice {
        display: flex;
        align-items: center;
    }

    .title {
        margin-right: 1rem;

        font-size: 0.8rem;
        font-weight: bold;
        color: ${({ theme }) => theme.header.textSecondary};
    }
`;

const MiniDie = styled.div`
    margin-right: 1px;

    svg {
        display: block;
    }
`;

const More = styled.span`
    margin-left: 0.3rem;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.header.textSecondary};
`;

const DICE_TO_SHOW = 7;

const UpcomingDice = ({ upcomingDice }) => {
    const nextNiceDisplay = upcomingDice.slice(0, DICE_TO_SHOW);
    const nextMore = upcomingDice.length - DICE_TO_SHOW;

    return (
        <StyledUpcomingDice>
            <div className='dice'>
                {nextNiceDisplay.slice(0, DICE_TO_SHOW).map((die, i) => (
                    <MiniDie key={i}>
                        <DieFace {...die} diceSize={18} />
                    </MiniDie>
                ))}

                {nextMore > 0 && <More>+ {nextMore}</More>}
            </div>
        </StyledUpcomingDice>
    );
}

export default UpcomingDice;
