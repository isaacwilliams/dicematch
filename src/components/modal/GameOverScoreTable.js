import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    border-spacing: 0;
`;

const Th = styled.th`
    padding: 0.25rem 0.5rem;

    font-weight: bold;
    text-align: left;

    &.last {
        text-align: right;
    }
`;

const Td = styled.td`
    padding: 0.25rem 0.5rem;
    text-align: left;

    &.last {
        text-align: right;
    }

    &.date {
        color: ${(({ theme }) => theme.foregroundSecondary)};
    }
`;

const ScoreEntry = styled.tr`
    background: ${({ currentScore, theme }) => (
        currentScore ?
            theme.scores.currentScoreBackground :
            'transparent'
    )}
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
                    <Td className='last date'>
                        {gameEndDateFormat}
                    </Td>
                </ScoreEntry>
            );
        })}
        </tbody>
    </Table>
);

export default ScoreTable;
