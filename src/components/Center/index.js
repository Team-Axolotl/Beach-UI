import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import localStyle from './style.css';

/**
 * Full-size container which centers its children both horizontally & vertically
 */
function Center(props) {
    const { children, className ='', ...rest } = props;
    return (
        <div className={classnames(localStyle.fillParent, localStyle.centerChildrenFlex, className)} {...rest} >
             {children}
        </div>
    );
}

Center.propTypes = {
    children: PropTypes.node,
    style: PropTypes.any
};

export default Center;