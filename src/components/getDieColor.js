import { css, keyframes } from 'styled-components';

import { DIE_TYPES } from '../constants';

const COLORS = {
    PIP: '#282B40',
    UP: '#FC4349',
    DOWN: '#3C989B',
    RANDOM: '#FFAC00',
    BLOCKER: '#757784',
    FLIP: '#CEC8B6',
};

const flicker = keyframes`
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
`;


const getDieColor = ({ dieType, value }) => {
    switch (dieType) {
        case DIE_TYPES.DOWN:
            return css`
                background: ${COLORS.DOWN};

                circle {
                    fill: ${COLORS.PIP};
                    opacity: 0.7;
                }
            `;
        case DIE_TYPES.BLOCKER:
            return css`
                background: ${COLORS.BLOCKER};

                circle {
                    fill: ${COLORS.PIP};
                    opacity: 0.4;
                }
            `;
        case DIE_TYPES.BOMB:
            return css`
                background: ${COLORS.BLOCKER};

                circle {
                    fill: ${COLORS.RANDOM};
                    animation: ${flicker} ${(value)*200}ms ease-in-out infinite;
                }
            `;
        case DIE_TYPES.RANDOM:
            return css`
                background: ${COLORS.RANDOM};

                circle {
                    fill: ${COLORS.PIP};
                    opacity: 0.7;
                }
            `;
        case DIE_TYPES.FLIP:
            return css`
                background: ${COLORS.FLIP};
                border-radius: 50%;

                circle {
                    fill: ${COLORS.PIP};
                    opacity: 0.7;
                }
            `;
        case DIE_TYPES.UP:
        default:
            return css`
                background: ${COLORS.UP};

                circle {
                    fill: ${COLORS.PIP};
                    opacity: 0.7;
                }
            `;
    }
};

export default getDieColor;
