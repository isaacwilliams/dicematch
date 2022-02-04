import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Modal from './Modal';

import { ACTIONS } from '../../constants';

const Header = styled.div`
    margin-left: -1rem;
    margin-right: -1rem;

    padding-bottom: 1rem;

    border-bottom: 1px solid ${(({ theme }) => theme.divider)};

    font-size: 1rem;
    font-weight: bold;
`;

const SettingsRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-left: -1rem;
    margin-right: -1rem;

    padding: 1rem;

    text-align: left;
    border-bottom: 1px solid ${(({ theme }) => theme.divider)};

    a {
        color: ${(({ theme }) => theme.highlight)};
    }
`;

const RestartButton = styled.button`
    padding: 0.4rem 1rem;
    border: 0;
    border-radius: 0.5rem;

    background: ${(({ theme }) => theme.scores.buttonBackground)};
    color: ${(({ theme }) => theme.scores.buttonColor)};

    font-size: 1rem;
    outline: none;

    font-weight: bold;
`;

const mapDispatchToProps = (dispatch) => ({
    toggleInterfaceTheme: (currentInterface) => (
        dispatch({ type: ACTIONS.SET_THEME, interface: currentInterface === 'dark' ? 'light' : 'dark' })
    ),
    closeModal: () => dispatch({ type: ACTIONS.CLOSE_MODAL }),
})

const SettingsModal = ({ restartGame, closeModal, toggleInterfaceTheme, ...props }) => {
    return (
        <Modal showCloseButton>
            <Header>Settings</Header>
            <SettingsRow>
                Dark theme
                <input type="checkbox"
                    onChange={() => toggleInterfaceTheme(props.theming.interface)}
                    checked={props.theming.interface === 'dark'} />
            </SettingsRow>
            <SettingsRow>
                Abandon current game
                <RestartButton onClick={() => {
                    restartGame();
                    closeModal();
                }}>
                    Restart
                </RestartButton>
            </SettingsRow>
            <SettingsRow>
                Feedback
                <a href="https://twitter.com/isaacwilliams">@isaacwilliams</a>
            </SettingsRow>
        </Modal>
    );
};

export default connect(null, mapDispatchToProps)(SettingsModal);
