import React from 'react';
import FlexBox from './FlexBox';

const Col = (props) => {
    return (
        <FlexBox col {...props} />
    );
};

export default Col;