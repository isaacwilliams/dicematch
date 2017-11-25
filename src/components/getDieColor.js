import { css } from 'styled-components';

import { DIE_TYPES } from '../constants';

const getDieColor = (props) => {
    switch (props.dieType) {
        case DIE_TYPES.DOWN:
            return css`
                background: LightSkyBlue;
                color: white;
            `;
        case DIE_TYPES.BLOCKER:
            return css`
                background: DarkGrey;
                color: Grey;
            `;
        case DIE_TYPES.RANDOM:
            return css`
                background: LemonChiffon;
                color: black;
            `;
        case DIE_TYPES.UP:
        default:
            return css`
                background: palevioletred;
                color: white;
            `;

    }
};

export default getDieColor;
