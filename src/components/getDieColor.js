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
                background: #f3e2c7;
                border-radius: 50%;

                background: -moz-linear-gradient(-45deg, #f3e2c7 0%, #c19e67 50%, #b68d4c 51%, #e9d4b3 100%);
                background: -webkit-linear-gradient(-45deg, #f3e2c7 0%,#c19e67 50%,#b68d4c 51%,#e9d4b3 100%);
                background: linear-gradient(135deg, #f3e2c7 0%,#c19e67 50%,#b68d4c 51%,#e9d4b3 100%);

                circle {
                    fill: #4a3f2c;
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
