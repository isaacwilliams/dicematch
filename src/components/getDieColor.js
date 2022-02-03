import { css, keyframes } from 'styled-components';

import { DIE_TYPES } from '../constants';

const flicker = keyframes`
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
`;

const getDieColor = ({ dieType, value }) => {
    switch (dieType) {
        case DIE_TYPES.DOWN:
            return css`
                background: ${({ theme }) => theme.dice.down};

                circle {
                    fill: ${({ theme }) => theme.dice.pip};
                    opacity: 0.7;
                }
            `;
        case DIE_TYPES.BLOCKER:
            return css`
                background: ${({ theme }) => theme.dice.blocker};

                circle {
                    fill: ${({ theme }) => theme.dice.pip};
                    opacity: 0.4;
                }
            `;
        case DIE_TYPES.BOMB:
            return css`
                background: ${({ theme }) => theme.dice.blocker};

                circle {
                    fill: ${({ theme }) => theme.dice.random};
                    animation: ${flicker} ${(value)*200}ms ease-in-out infinite;
                }
            `;
        case DIE_TYPES.RANDOM:
            return css`
                background: ${({ theme }) => theme.dice.random};

                circle {
                    fill: ${({ theme }) => theme.dice.pip};
                    opacity: 0.7;
                }
            `;
        case DIE_TYPES.FLIP:
            return css`
                background: ${({ theme }) => theme.dice.flip};
                border-radius: 50%;

                circle {
                    fill: ${({ theme }) => theme.dice.pip};
                    opacity: 0.7;
                }
            `;
        case DIE_TYPES.UP:
        default:
            return css`
                background: ${({ theme }) => theme.dice.up};

                circle {
                    fill: ${({ theme }) => theme.dice.pip};
                    opacity: 0.7;
                }
            `;
    }
};

export default getDieColor;
