import React from 'react';
import FlexBox from './FlexBox';

const Row = (props) => {
    return (
        <FlexBox row {...props} />
    );
};

export default Row;