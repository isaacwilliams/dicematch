import React from 'react';

import styled from 'styled-components';

import getDieColor from './getDieColor';

const DieSvg = styled.svg`
    border-radius: 4px;

    ${getDieColor}
`;

const getPos = (size, percent) => {
    const margin = size * 0.25;
    return margin + percent * (size - margin * 2);
}

const Pip = ({ x, y, diceSize, ...rest }) => (
    <circle r={diceSize * 0.08} cx={getPos(diceSize, x)} cy={getPos(diceSize, y)} />
)

const Face0 = ({ diceSize, ...props }) => (
    <DieSvg {...props} width={diceSize} height={diceSize} />
);

const Face1 = ({ diceSize, ...props }) => (
    <DieSvg {...props} width={diceSize} height={diceSize}>
        <Pip {...props} diceSize={diceSize} x={0.5} y={0.5} />
    </DieSvg>
);

const Face2 = ({ diceSize, ...props }) => (
    <DieSvg {...props} width={diceSize} height={diceSize}>
        <Pip {...props} diceSize={diceSize} x={0} y={1} />
        <Pip {...props} diceSize={diceSize} x={1} y={0} />
    </DieSvg>
);

const Face3 = ({ diceSize, ...props }) => (
    <DieSvg {...props} width={diceSize} height={diceSize}>
        <Pip {...props} diceSize={diceSize} x={0} y={1} />
        <Pip {...props} diceSize={diceSize} x={0.5} y={0.5} />
        <Pip {...props} diceSize={diceSize} x={1} y={0} />
    </DieSvg>
);

const Face4 = ({ diceSize, ...props }) => (
    <DieSvg {...props} width={diceSize} height={diceSize}>
        <Pip {...props} diceSize={diceSize} x={0} y={0} />
        <Pip {...props} diceSize={diceSize} x={0} y={1} />
        <Pip {...props} diceSize={diceSize} x={1} y={0} />
        <Pip {...props} diceSize={diceSize} x={1} y={1} />
    </DieSvg>
);


const Face5 = ({ diceSize, ...props }) => (
    <DieSvg {...props} width={diceSize} height={diceSize}>
        <Pip {...props} diceSize={diceSize} x={0} y={0} />
        <Pip {...props} diceSize={diceSize} x={0} y={1} />
        <Pip {...props} diceSize={diceSize} x={0.5} y={0.5} />
        <Pip {...props} diceSize={diceSize} x={1} y={0} />
        <Pip {...props} diceSize={diceSize} x={1} y={1} />
    </DieSvg>
);

const Face6 = ({ diceSize, ...props }) => (
    <DieSvg {...props} width={diceSize} height={diceSize}>
        <Pip {...props} diceSize={diceSize} x={0} y={0} />
        <Pip {...props} diceSize={diceSize} x={0} y={0.5} />
        <Pip {...props} diceSize={diceSize} x={0} y={1} />
        <Pip {...props} diceSize={diceSize} x={1} y={0} />
        <Pip {...props} diceSize={diceSize} x={1} y={0.5} />
        <Pip {...props} diceSize={diceSize} x={1} y={1} />
    </DieSvg>
);

const DieFace = (props) => {
    switch (props.value) {
        case 1:
            return <Face1 {...props} />;
        case 2:
            return <Face2 {...props} />;
        case 3:
            return <Face3 {...props} />;
        case 4:
            return <Face4 {...props} />;
        case 5:
            return <Face5 {...props} />;
        case 6:
            return <Face6 {...props} />;
        default:
            return <Face0 {...props} />;
    }
};

export default DieFace;
