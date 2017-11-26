import React from 'react';
import styled from 'styled-components';
import drop from 'lodash/fp/drop';
import { Transition, TransitionGroup } from 'react-transition-group';

import { GAME_STATES } from '../constants';

const Announcements = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    font-size: 48px;
    pointer-events: none;
    touch-action: none;
    color: white;

    text-shadow: 0 0 5px rgba(0,0,0,1);
`;

const duration = 200;

const defaultStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    textAlign: 'center',
    width: 150,
    height: 50,
    marginLeft: -75,
    marginTop: -25,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    opacity: 0,
    transform: 'scale(0.5)',
}

const transitionStyles = {
    entering: { opacity: 0, transform: 'scale(0.5)' },
    entered: { opacity: 1, transform: 'scale(1)' },
    exiting: { opacity: 0, transform: 'scale(2.5)' },
};

const Fade = ({ children, ...props }) => (
    <Transition {...props} timeout={duration}>
        {(state) => {
            console.log(state);
            return (
                <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                    {children}
                </div>
            );
        }}
    </Transition>
);

class ScoreAnnouncer extends React.Component {
    state = {
        announcements: [],
    };

    aId = 0;

    componentWillReceiveProps({ score, gameState }) {
        if (this.props.score !== score && this.props.gameState !== GAME_STATES.FINISHED) {
            const value = score - this.props.score;
            this.setState((state) => ({ announcements: [...state.announcements, { id: this.aId, value }] }));
            this.aId = this.aId + 1;

            setTimeout(() => {
                this.setState((state) => ({ announcements: drop(1, state.announcements) }));
            }, 1000);
        }
    }

    render() {
        const { announcements } = this.state;

        return (
            <Announcements>
                <TransitionGroup>
                    {announcements.map((change, i) => (
                        <Fade key={change.id}>
                            + {change.value}
                        </Fade>
                    ))}
                </TransitionGroup>
            </Announcements>
        );
    }
}

export default ScoreAnnouncer;
