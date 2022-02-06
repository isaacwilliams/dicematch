import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { max, rest } from 'lodash';

import { getDiceTheme } from '../../constants/themes';
import useLocalStorage from '../../util/useLocalStorage';

import Modal from './Modal';
import DieFace from '../DieFace';

import { ACTIONS, DICE_THEME, DIE_TYPES, INTERFACE_THEME } from '../../constants';

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

    &.block {
        border-bottom: 0;
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

const DieSettingsButton = styled.button`
    display: flex;

    border: 0;
    align-items: center;
    justify-content: space-between;

    margin-left: -1rem;
    margin-right: -1rem;

    padding: 0.5rem 1rem;
    width: calc(100% + 2rem);

    font-size: 0.9rem;
    text-align: left;

    color: ${(({ theme }) => theme.foreground)};

    background: ${({ active, theme }) => active ? theme.backgroundSecondary : 'transparent'};

    .name {
        padding-right: 0.5rem;
        color: ${(({ theme }) => theme.foreground)};
    }

    .dice {
        display: flex;
    }
`;

const DieDisplay = styled.div`
    margin-right: 0.5rem;

    > svg {
        display: block;

        circle {
            animation: none;
        }
    }
`;

const DieSettingsSpacer = styled.div`
    margin-left: -1rem;
    margin-right: -1rem;

    padding-bottom: 0.5rem;

    border-bottom: 1px solid ${(({ theme }) => theme.divider)};
`;

const DieThemeLocked = styled.div`
    display: flex;

    align-items: center;
    justify-content: space-between;

    margin-left: -1rem;
    margin-right: -1rem;

    padding: 0.5rem 1rem;

    width: calc(100% + 2rem);

    .lock {
        width: 2rem;
        height: 2rem;
        background-image: url(${require('./icon-lock.svg')});

        background-color: transparent;
        background-size: 1.5rem;
        background-position: center;
        background-repeat: no-repeat;

        opacity: 0.6;

        ${({ theme }) => (
            theme.isDark ? css`filter: invert(100%);` : css``
        )}
    }

    .message {
        display: flex;

        align-items: center;
        justify-content: space-between;

        width: 240px;
        height: 32px;

        color: ${(({ theme }) => theme.foregroundSecondary)};
    }
`;

const DIE_SIZE = 32;

const DieThemeSettingsRow = ({
    name,
    className,
    themeId,
    activeTheme,
    lockUntilLevel,
    setDiceTheme,
}) => {
    const [scores] = useLocalStorage('dicematch.scores', []);
    const maxLevel = max(scores.map(({ level }) => level));

    if (lockUntilLevel && lockUntilLevel > maxLevel) {
        return (
            <DieThemeLocked>
                <div className="lock"/>
                <div className="message">Reach level {lockUntilLevel} to unlock</div>
            </DieThemeLocked>
        )
    }

    const diceTheme = getDiceTheme(themeId);

    return (
        <ThemeProvider theme={{ dice: diceTheme }}>
            <DieSettingsButton className={className} active={themeId === activeTheme} onClick={() => setDiceTheme(themeId)}>
                <div className="name">{name}</div>
                <div className="dice">
                    <DieDisplay>
                        <DieFace dieType={DIE_TYPES.UP} value={1} diceSize={DIE_SIZE} />
                    </DieDisplay>
                    <DieDisplay>
                        <DieFace dieType={DIE_TYPES.DOWN} value={2} diceSize={DIE_SIZE} />
                    </DieDisplay>
                    <DieDisplay>
                        <DieFace dieType={DIE_TYPES.FLIP} value={3} diceSize={DIE_SIZE} />
                    </DieDisplay>
                    <DieDisplay>
                        <DieFace dieType={DIE_TYPES.RANDOM} value={4} diceSize={DIE_SIZE} />
                    </DieDisplay>
                    <DieDisplay>
                        <DieFace dieType={DIE_TYPES.BLOCKER} value={5} diceSize={DIE_SIZE} />
                    </DieDisplay>
                    <DieDisplay>
                        <DieFace dieType={DIE_TYPES.BOMB} value={6} diceSize={DIE_SIZE} />
                    </DieDisplay>
                </div>
            </DieSettingsButton>
        </ThemeProvider>
    );
}

const mapDispatchToProps = (dispatch) => ({
    toggleInterfaceTheme: (currentInterface) => (
        dispatch({
            type: ACTIONS.SET_INTERFACE_THEME,
            interface: currentInterface === INTERFACE_THEME.dark ?
                INTERFACE_THEME.light :
                INTERFACE_THEME.dark,
        })
    ),
    setDiceTheme: (theme) => (
        dispatch({
            type: ACTIONS.SET_DICE_THEME,
            dice: theme,
        })
    ),
    closeModal: () => dispatch({ type: ACTIONS.CLOSE_MODAL }),
})

const SettingsModal = ({
    restartGame,
    closeModal,
    toggleInterfaceTheme,
    setDiceTheme,
    theming = {},
}) => {
    const diceTheme = theming.dice || DICE_THEME.standard;

    return (
        <Modal showCloseButton>
            <Header>Settings</Header>
            <SettingsRow>
                <strong>Dark theme</strong>
                <input type="checkbox"
                    onChange={() => toggleInterfaceTheme(theming.interface)}
                    checked={theming.interface === INTERFACE_THEME.dark} />
            </SettingsRow>
            <SettingsRow className="block">
                <strong>Dice theme</strong>
            </SettingsRow>
            <DieThemeSettingsRow name="Standard"
                    themeId={DICE_THEME.standard}
                    activeTheme={diceTheme}
                    setDiceTheme={setDiceTheme} />
            <DieThemeSettingsRow name="High contrast"
                    themeId={DICE_THEME.highContrast}
                    activeTheme={diceTheme}
                    setDiceTheme={setDiceTheme} />
            <DieThemeSettingsRow name="Subdued"
                    lockUntilLevel={10}
                    themeId={DICE_THEME.subdued}
                    activeTheme={diceTheme}
                    setDiceTheme={setDiceTheme} />
            <DieThemeSettingsRow name="Tropical"
                    lockUntilLevel={15}
                    themeId={DICE_THEME.tropical}
                    activeTheme={diceTheme}
                    setDiceTheme={setDiceTheme} />
            <DieThemeSettingsRow name="Glow"
                    lockUntilLevel={20}
                    themeId={DICE_THEME.glow}
                    activeTheme={diceTheme}
                    setDiceTheme={setDiceTheme} />
            <DieSettingsSpacer />
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
