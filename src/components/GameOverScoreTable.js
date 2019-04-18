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

const ScoreTable = ({ scores, savedScore }) => (
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
);

export default ScoreTable;
