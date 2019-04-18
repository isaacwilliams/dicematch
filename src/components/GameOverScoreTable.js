import React from 'react';
import styled from 'styled-components';

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
    background: ${({ currentScore }) =>currentScore ? 'yellow' : 'transparent'}
`;

const ChangeNameButton = styled.button`
    margin: 0;
    padding: 0;
    border: none;
    text-decoration: underline;
    background: transparent;
    font-size: 18px;
`;

const ScoreTable = ({ scores, savedScore, setInputActive }) => (
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
        {scores.map(({ _id, playerName, score, level }) => {
            const isCurrentScore = savedScore && savedScore._id === _id;
            const name = playerName || '-';

            return (
                <ScoreEntry key={_id} currentScore={isCurrentScore}>
                    <Td>
                        {isCurrentScore ?
                            <ChangeNameButton onClick={() => setInputActive(true)}>{name}</ChangeNameButton> :
                            name}
                    </Td>
                    <Td>
                        {score}
                    </Td>
                    <Td>
                        {level}
                    </Td>
                </ScoreEntry>
            );
        })}
        </tbody>
    </Table>
);

export default ScoreTable;
