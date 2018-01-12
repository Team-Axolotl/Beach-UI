import React from 'react';
import classnames from 'classnames';
import { propTypes, defaultProps } from './propTypes';
import styles from './styles.css';

const Overlay = ({
    className,
    onClick
}) => (
    <div className={classnames(styles.overlay, className)} onClick={onClick} />
);

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;