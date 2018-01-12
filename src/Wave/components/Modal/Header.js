import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import { headerPropTypes as propTypes, headerDefaultProps as defaultProps } from './propTypes';
import styles from './styles.css';

const Header = ({
    className,
    text,
    closeBtn,
    close
}) => {
    // Additional outer div is used to fix positioning issue in Firefox. Do not remove it.
    return (
        <div className={classnames(styles.popupHeader, className)}>
            <span className={styles.headerText}>{text}</span>
            {
                closeBtn &&
                <div
                    className={styles[closeBtn] || closeBtn}
                    onClick={close}>
                    <Icon glyph='close' />
                </div>
            }
        </div>
    );
};

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;

export default Header;