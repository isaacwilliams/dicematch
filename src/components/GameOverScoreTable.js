import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
`;

const Th = styled.th`
    font-weight: bold;
    text-align: left;

    &.last {
        text-align: right;
    }
`;

const Td = styled.td`
    text-align: left;

    &.last {
        text-align: right;
    }
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

const ScoreTable = ({ scores, currentScoreId }) => (
    <Table>
        <thead>
        <tr>
            <Th>
                Score
            </Th>
            <Th>
                Level
            </Th>
            <Th className='last'>
                Date
            </Th>
        </tr>
        </thead>
        <tbody>
        {scores.map(({ id, endTime, score, level }) => {
            const isCurrentScore = currentScoreId === id;
            const gameEndDate = endTime && new Date(endTime);
            const gameEndDateFormat = gameEndDate.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })

            return (
                <ScoreEntry key={id} currentScore={isCurrentScore}>
                    <Td>
                        {score}
                    </Td>
                    <Td>
                        {level}
                    </Td>
                    <Td className='last'>
                        {gameEndDateFormat}
                    </Td>
                </ScoreEntry>
            );
        })}
        </tbody>
    </Table>
);

export default ScoreTable;
