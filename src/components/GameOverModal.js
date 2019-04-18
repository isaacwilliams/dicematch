import React, { useEffect, useState } from 'react';
import useLocalStorage from 'react-use-localstorage';
import styled, { keyframes } from 'styled-components';
import uniqBy from 'lodash/fp/uniqBy';
import get from 'lodash/fp/get';
import axios from 'axios';

import GameOverScoreTable from './GameOverScoreTable';

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

const NameForm = styled.div`
    box-sizing: border-box;
    justify-content: center;
    display: flex;
    width: 100%;
`;

const NameInput = styled.input`
    padding: 10px 20px;
    margin-right: 10px;
    min-width: 70%;
    border: 1px solid grey;
    font-size: 18px;
    outline: none;
`;

const SaveButton = styled.button`
    padding: 10px 20px;
    border: 0;
    background: lightgrey;
    font-size: 18px;
    outline: none;
`;

const RestartButton = styled.button`
    padding: 10px 20px;
    border: 0;
    background: lightblue;
    font-size: 18px;
    outline: none;
`;

const SCORE_SERVER_DOMAIN = process.env.NODE_ENV === 'production' ?
    'https://dicematch-server.herokuapp.com' :
    'http://localhost:5000';

const ScoreDisplay = ({
    name,
    score,
    level: { level, clearedDice, upcomingDice },
    moves: { used },
    tracking: { gameStart, gameEnd },
    restartGame,
    savedScore,
    setSavedScore,
    setInputActive,
}) => {
    const [scores, setScores] = useState(null);

    useEffect(() => {
        const fetchScores = async () => {
            let myScore;

            if (!savedScore) {
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
                    }, {
                        timeout: 10 * 1000,
                    });

                    myScore = createdScoreResponse.data.score
                    setSavedScore(myScore);
                } catch (error) {
                    console.error('error saving score', error);
                }
            } else {
                try {
                    const createdScoreResponse = await axios.put(`${SCORE_SERVER_DOMAIN}/scores/${savedScore._id}`, {
                        playerName: name,
                    }, {
                        timeout: 10 * 1000,
                    });

                    myScore = createdScoreResponse.data.score
                    setSavedScore(myScore);
                } catch (error) {
                    console.error('error saving score', error);
                }
            }


            try {
                const loadedScoresResponse = await axios.get(`${SCORE_SERVER_DOMAIN}/scores`, {
                    timeout: 10 * 1000,
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

    return scores ? (
        <GameOverScoreTable scores={scores} savedScore={savedScore} setInputActive={setInputActive} />
    ) : (
        <div>
            Loading...
        </div>
    );
};

const GameOverModal = ({ restartGame, ...props }) => {
    const [name, setName] = useLocalStorage('dicematch.name', '');
    const [inputActive, setInputActive] = useState(false);
    const [savedScore, setSavedScore] = useState(null);

    useEffect(() => {
        if (name === '') {
            setInputActive(true);
        }
    }, []);

    return (
        <ModalContainer>
            <Modal>
                <h1>Game over</h1>

                {inputActive ? (
                    <NameForm>
                        <NameInput type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                        <SaveButton onClick={() => setInputActive(false)}>Save</SaveButton>
                    </NameForm>
                ) : (
                    <>
                        <ScoreDisplay {...props} name={name} savedScore={savedScore} setSavedScore={setSavedScore} setInputActive={setInputActive} />
                    </>
                )}

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
