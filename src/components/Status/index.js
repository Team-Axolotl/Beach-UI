import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './style.css';

function Status(props) {
    const { children, color, ...rest } = props;
    console.log(style);
    return (
        <span className={classnames(style.status, style[color] || '')} {...props} >
             {children}
        </span>
    );
}

Status.propTypes = {
    children: PropTypes.node
};

export default Status;