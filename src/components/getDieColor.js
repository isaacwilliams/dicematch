import { css } from 'styled-components';

import { DIE_TYPES } from '../constants';

const getDieColor = ({ dieType, value = 3 }) => {
    switch (dieType) {
        case DIE_TYPES.DOWN:
            return css`
                background: #56B9D0;

                circle {
                    fill: #222;
                }
            `;
        case DIE_TYPES.BLOCKER:
            return css`
                background: #3B3F42;

                circle {
                    fill: #999;
                }
            `;
        case DIE_TYPES.RANDOM:
            return css`
                background: #FBBA42;

                circle {
                    fill: #222;
                }
            `;
        case DIE_TYPES.FLIP:
            return css`
                background: #F24C27;
                border-radius: 50px;

                circle {
                    fill: #222;
                }
            `;
        case DIE_TYPES.UP:
        default:
            return css`
                background: #F24C27;

                circle {
                    fill: #222;
                }
            `;
    }
};

export default getDieColor;
