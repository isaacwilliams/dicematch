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

const mapDispatchToProps = (dispatch) => ({
    toggleInterfaceTheme: (currentInterface) => (
        dispatch({ type: ACTIONS.SET_THEME, interface: currentInterface === 'dark' ? 'light' : 'dark' })
    ),
})

const SettingsModal = ({ restartGame, toggleInterfaceTheme, ...props }) => {
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
                Feedback
                <a href="https://twitter.com/isaacwilliams">@isaacwilliams</a>
            </SettingsRow>
        </Modal>
    );
};

export default connect(null, mapDispatchToProps)(SettingsModal);
