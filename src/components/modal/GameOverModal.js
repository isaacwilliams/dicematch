import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useLocalStorage from '../../util/useLocalStorage';

import GameOverScoreTable from './GameOverScoreTable';
import Modal from './Modal';

const RestartButton = styled.button`
    padding: 10px 20px;
    border: 0;
    background: lightblue;
    font-size: 18px;
    outline: none;
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
            <h1>Game over</h1>

            <ScoreDisplay {...props} />

            <p>
                <RestartButton onClick={restartGame}>
                    Restart
                </RestartButton>
            </p>
        </Modal>
    );
}

export default GameOverModal;
