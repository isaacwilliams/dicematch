import { css } from 'styled-components';

import { DIE_TYPES } from '../constants';

const COLORS = {
    PIP: '#282B40',
    UP: '#FC4349',
    DOWN: '#3C989B',
    RANDOM: '#FFAC00',
    BLOCKER: '#757784',
    FLIP: '#CEC8B6',
};

const getDieColor = ({ dieType, value = 3 }) => {
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
