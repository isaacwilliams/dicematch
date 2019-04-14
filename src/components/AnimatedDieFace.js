import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { DIE_TYPES } from '../constants';

const ANIMATION_DUR = 200;

const scaleInVertical = keyframes`
    0% { transform: scaleY(0); filter: brightness(0.5); }
    100% { transform: scaleY(1); filter: brightness(1); }
`;

const scaleOutVertical = keyframes`
    0% { transform: scaleY(1); filter: brightness(1); }
    100% { transform: scaleY(0); filter: brightness(0.5); }
`;

const scaleInHorizontal = keyframes`
    0% { transform: scaleX(0); filter: brightness(0.5); }
    100% { transform: scaleX(1); filter: brightness(1); }
`;

const scaleOutHorizontal = keyframes`
    0% { transform: scaleX(1); filter: brightness(1); }
    100% { transform: scaleX(0); filter: brightness(0.5); }
`;

const shake = (degree) => keyframes`
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(-${degree}deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
        transform: rotate(${degree}deg);
    }
`;

const getEnterAnimation = ({ dieType, diceSize, animate }) => {
    if (!animate) return null;

    switch (dieType) {
        case DIE_TYPES.DOWN:
            return css`
                animation: ${scaleInVertical} ${ANIMATION_DUR}ms linear forwards;
                transform-origin: top center;
            `;
        case DIE_TYPES.RANDOM:
            return css`
                animation: ${shake(10)} 10ms linear infinite;
            `;
        case DIE_TYPES.FLIP:
            return css`
                animation: ${scaleInHorizontal} 100ms ease-in-out forwards;
            `;
        default:
            return css`
                animation: ${scaleInVertical} ${ANIMATION_DUR}ms linear forwards;
                transform-origin: bottom center;
            `;
    }
};

const getExitAnimation = ({ dieType, diceSize }) => {
    switch (dieType) {
        case DIE_TYPES.DOWN:
            return css`
                animation: ${scaleOutVertical} ${ANIMATION_DUR}ms linear forwards;
                transform-origin: bottom center;
            `;
        case DIE_TYPES.RANDOM:
            return css`
                animation: ${shake(10)} 10ms linear infinite;
            `;
        case DIE_TYPES.FLIP:
            return css`
                animation: ${scaleOutHorizontal} 100ms ease-in-out forwards;
            `;
        default:
            return css`
                animation: ${scaleOutVertical} ${ANIMATION_DUR}ms linear forwards;
                transform-origin: top center;
            `;
    }
}

const FaceContainer = styled.div`
    position: relative;
`;

const animatedChild = css`
    position: absolute;
    top: 0;
    left: 0;

    transform: translate3d(0, 0, 0);
`;

const CurrentChild = styled.div`
    ${animatedChild}
    ${getEnterAnimation}
`;

const PrevChild = styled.div`
    ${animatedChild}
    ${getExitAnimation}
`;

class AnimatedDieFace extends React.Component {
    state = { prevChildren: [] };

    componentWillReceiveProps({ value }) {
        if (value !== this.props.value) {
            const id = this.props.value;

            this.setState((state) => ({
                prevChildren: [
                    ...state.prevChildren,
                    {
                        child: this.props.children,
                        id: id,
                        timeout: setTimeout(this.removePrevChild(id), ANIMATION_DUR)
                    }
                ]
            }));
        }
    }

    removePrevChild = (id) => () => (
        this.setState(({ prevChildren }) => ({
            prevChildren: prevChildren.filter((child) => child.id !== id),
        }))
    );

    render() {
        const { prevChildren } = this.state;
        const { children, value } = this.props;

        return (
            <FaceContainer className="FACE">
                <CurrentChild {...this.props} animate={prevChildren.length} key={value}>
                    {children}
                </CurrentChild>

                {prevChildren.map(({ child, id }) => <PrevChild {...this.props} key={id}>{child}</PrevChild>)}
            </FaceContainer>
        )
    }
}

export default AnimatedDieFace;
