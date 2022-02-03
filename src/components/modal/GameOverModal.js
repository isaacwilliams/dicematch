import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useLocalStorage from '../../util/useLocalStorage';

import GameOverScoreTable from './GameOverScoreTable';
import Modal from './Modal';

const Title = styled.h1`
    margin-top: 0;
    margin-left: -1rem;
    margin-right: -1rem;

    padding-bottom: 1rem;

    border-bottom: 1px solid ${(({ theme }) => theme.divider)};
`;

const RestartButton = styled.button`
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding: 0.8rem 1.5rem;
    border: 0;
    border-radius: 0.5rem;

    background: ${(({ theme }) => theme.scores.buttonBackground)};
    color: ${(({ theme }) => theme.scores.buttonColor)};

    font-size: 1rem;
    outline: none;

    font-weight: bold;
`;

const ScoreDisplay = ({
    name,
    score,
    level: { level, clearedDice, upcomingDice },
    moves: { used },
    tracking: { gameId, gameStart, gameEnd },
    setInputActive,
}) => {
    const [scores, setScores] = useLocalStorage('dicematch.scores', []);

    const currentGameScore = {
        id: gameId,
        score,
        level,
        diceCleared: clearedDice,
        diceRemainingInLevel: upcomingDice.length,
        turnsUsed: used,
        startTime: gameStart,
        endTime: gameEnd,
    };

    useEffect(() => {
        if (scores.find(({ id }) => id === gameId)) return;

        const previousScores = scores
            .filter(score => !!score)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        const newScores = [
            ...previousScores,
            currentGameScore
        ].sort((a, b) => b.score - a.score);

        setScores(newScores)
    }, []);

    return <GameOverScoreTable scores={scores} currentScoreId={gameId} setInputActive={setInputActive} />;
};

const GameOverModal = ({ restartGame, ...props }) => {
    return (
        <Modal>
            <Title>Game over</Title>

            <ScoreDisplay {...props} />

            <RestartButton onClick={restartGame}>
                Restart
            </RestartButton>
        </Modal>
    );
}

export default GameOverModal;
