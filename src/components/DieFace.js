import React from 'react';

import { DIE_SIZE } from '../constants';

const SIZE = DIE_SIZE - 2;
const MARGIN = SIZE * 0.25;

const Pip = ({ x, y, ...rest }) => (
    <circle r="6" cx={MARGIN + x * (DIE_SIZE - MARGIN * 2)} cy={MARGIN + y * (DIE_SIZE - MARGIN * 2)} />
)

const Face1 = (props) => (
    <svg width={SIZE} height={SIZE}>
        <Pip {...props} x={0.5} y={0.5} />
    </svg>
);

const Face2 = (props) => (
    <svg width={SIZE} height={SIZE}>
        <Pip {...props} x={0} y={1} />
        <Pip {...props} x={1} y={0} />
    </svg>
);

const Face3 = (props) => (
    <svg width={SIZE} height={SIZE}>
        <Pip {...props} x={0} y={1} />
        <Pip {...props} x={0.5} y={0.5} />
        <Pip {...props} x={1} y={0} />
    </svg>
);

const Face4 = (props) => (
    <svg width={SIZE} height={SIZE}>
        <Pip {...props} x={0} y={0} />
        <Pip {...props} x={0} y={1} />
        <Pip {...props} x={1} y={0} />
        <Pip {...props} x={1} y={1} />
    </svg>
);


const Face5 = (props) => (
    <svg width={SIZE} height={SIZE}>
        <Pip {...props} x={0} y={0} />
        <Pip {...props} x={0} y={1} />
        <Pip {...props} x={0.5} y={0.5} />
        <Pip {...props} x={1} y={0} />
        <Pip {...props} x={1} y={1} />
    </svg>
);

const Face6 = (props) => (
    <svg width={SIZE} height={SIZE}>
        <Pip {...props} x={0} y={0} />
        <Pip {...props} x={0} y={0.5} />
        <Pip {...props} x={0} y={1} />
        <Pip {...props} x={1} y={0} />
        <Pip {...props} x={1} y={0.5} />
        <Pip {...props} x={1} y={1} />
    </svg>
);

const DieFace = ({ value, ...rest }) => {
    switch (value) {
        case 1:
            return <Face1 {...rest} />;
        case 2:
            return <Face2 {...rest} />;
        case 3:
            return <Face3 {...rest} />;
        case 4:
            return <Face4 {...rest} />;
        case 5:
            return <Face5 {...rest} />;
        case 6:
            return <Face6 {...rest} />;
        default:
            return <Face1 {...rest} />;
    }
};

export default DieFace;
