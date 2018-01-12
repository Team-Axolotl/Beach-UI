import React from 'react';
import classnames from 'classnames';
import { defaultProps, propTypes } from './propTypes';
import styles from './styles.css';

const Icon = ({ glyph, className }) => (
    <svg className={classnames(styles.icon, className)}>
        <use xlinkHref={`#${glyph}`} />
    </svg>
);

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;