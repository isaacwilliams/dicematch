import React, { useEffect, useState } from 'react';
import useLocalStorage from 'react-use-localstorage';
import styled, { keyframes, css } from 'styled-components';
import uniqBy from 'lodash/fp/uniqBy';
import get from 'lodash/fp/get';

import axios from 'axios';

const uniqById = uniqBy(get('_id'));

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

const Table = styled.table`
    width: 100%;
`;

const Th = styled.th`
    font-weight: bold;
    text-align: left;
`;

const Td = styled.td`
    text-align: left;
`;

const ScoreEntry = styled.tr`
    ${({ currentScore }) => currentScore ? css`
        background-color: yellow;
    ` : null}
`;

// const SCORE_SERVER_DOMAIN = 'https://dicematch-server.herokuapp.com';
const SCORE_SERVER_DOMAIN = 'http://localhost:5000';

const GameOverModal = ({
    score,
    level: { level, clearedDice, upcomingDice },
    moves: { used },
    tracking: { gameStart, gameEnd },
    restartGame,
}) => {
    const [name, setName] = useLocalStorage('dicematch.name', '');
    const [inputActive, setInputActive] = useState(false);
    const [savedScore, setSavedScore] = useState(null);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            if (name === '') {
                setInputActive(true);
            }

            let myScore;
            try {
                const createdScoreResponse = await axios.post(`${SCORE_SERVER_DOMAIN}/scores`, {
                    playerName: name,
                    score,
                    level,
                    diceCleared: clearedDice,
                    diceRemainingInLevel: upcomingDice.length,
                    turnsUsed: used,
                    startTime: gameStart && gameStart.toString(),
                    endTime: gameEnd && gameEnd.toString(),
                });

                myScore = createdScoreResponse.data.score
                setSavedScore(myScore);
            } catch (error) {
                console.error('error saving score', error);
            }

            try {
                const loadedScoresResponse = await axios.get(`${SCORE_SERVER_DOMAIN}/scores`, {
                    params: {
                        limit: 10,
                    },
                });
                const loadedScores = loadedScoresResponse.data.scores;

                const allScores = uniqById([...loadedScores, myScore])
                    .filter(score => !!score)
                    .sort((a, b) => b.score - a.score);

                console.log(allScores);

                setScores(allScores);
            } catch (error) {
                console.error('error loading scores', error);
            }
        };

        fetchScores();
    }, []);

    return (
        <ModalContainer>
            <Modal>
                <h1>Game over</h1>
                <Table>
                    <thead>
                    <tr>
                        <Th>
                            Player
                        </Th>
                        <Th>
                            Score
                        </Th>
                        <Th>
                            Level
                        </Th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map(({ _id, playerName, score, level }) => (
                        <ScoreEntry key={_id} currentScore={savedScore && savedScore._id === _id}>
                            <Td>
                                {playerName || '-'}
                            </Td>
                            <Td>
                                {score}
                            </Td>
                            <Td>
                                {level}
                            </Td>
                        </ScoreEntry>
                    ))}
                    </tbody>
                </Table>
                <p>
                    <RestartButton onClick={restartGame}>
                        Restart
                    </RestartButton>
                </p>
                {/*
                <h1>Game over</h1>
                <h2>Score: {score}</h2>
                <p>
                    <strong>Level {level}</strong>
                    {' '}
                    ({upcomingDice.length} dice remaining)
                </p>
                <p>Cleared {clearedDice} dice total</p>
                <p>
                    {inputActive ?
                        <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} /> :
                        [<span>{name}</span>, <button>change</button>]}
                </p>
                <p>
                    <RestartButton onClick={restartGame}>
                        Restart
                    </RestartButton>
                </p>
                */}
            </Modal>
        </ModalContainer>
    );
}

export default GameOverModal;
