import React from 'react';
import classnames from 'classnames';
import Button from '../Button';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

const ButtonGroup = ({
    type,
    className,
    buttons
}) => {
    return (
        <div className={classnames(className, styles[type])}>
            { buttons.map((button, index) => <Button key={index} className={styles.buttonGroupItem} {...button} />) }
        </div>
    );
};

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;