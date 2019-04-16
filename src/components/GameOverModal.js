import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const containerEnter = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const modalEnter = keyframes`
    0% { transform: scale(0.8); }
    100% { transform: scale(1); }
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
    background: rgba(0, 0, 0, 0.5);

    animation: ${containerEnter} 0.25s ease-in-out forwards;
`;

const Modal = styled.div`
    background: white;
    padding: 20px;
    border-radius: 6px;
    text-align: center;
    font-size: 18px;

    animation: ${modalEnter} 0.25s ease-in-out forwards;
`;

const RestartButton = styled.button`
    padding: 10px 20px;
    border: 0;
    background: lightblue;
    font-size: 18px;
    outline: none;
`;

const GameOverModal = ({
    score,
    level: { level, clearedDice, upcomingDice },
    moves: { used },
    tracking: { gameStart, gameEnd },
    restartGame,
}) => {
    useEffect(() => {
        axios.post('https://dicematch-server.herokuapp.com/scores', {
            score,
            level,
            diceCleared: clearedDice,
            diceRemainingInLevel: upcomingDice.length,
            turnsUsed: used,
            startTime: gameStart.toString(),
            endTime: gameEnd.toString(),
        });
    }, []);

    return (
        <ModalContainer>
            <Modal>
                <h1>Game over</h1>
                <h2>Score: {score}</h2>
                <p>
                    <strong>Level {level}</strong>
                    {' '}
                    ({upcomingDice.length} dice remaining)
                </p>
                <p>Cleared {clearedDice} dice total</p>
                <p>
                    <RestartButton onClick={restartGame}>
                        Restart
                    </RestartButton>
                </p>
            </Modal>
        </ModalContainer>
    );
}

export default GameOverModal;
