import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import uniqBy from 'lodash/fp/uniqBy';
import get from 'lodash/fp/get';
import dropRight from 'lodash/fp/dropRight';
import useLocalStorage from '../util/useLocalStorage';

import GameOverScoreTable from './GameOverScoreTable';

const uniqById = uniqBy(get('id'));
const limit10 = dropRight(10);

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

        setScores([
            ...scores,
            currentGameScore,
        ])
    }, []);

    const allScores = scores
        .filter(score => !!score)
        .sort((a, b) => b.score - a.score);

    const limitedScores = uniqById([
        ...limit10(allScores),
        currentGameScore,
    ].sort((a, b) => b.score - a.score));

    return <GameOverScoreTable scores={limitedScores} currentScoreId={gameId} setInputActive={setInputActive} />;
};

const GameOverModal = ({ restartGame, ...props }) => {
    return (
        <ModalContainer>
            <Modal>
                <h1>Game over</h1>

                <ScoreDisplay {...props} />

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
