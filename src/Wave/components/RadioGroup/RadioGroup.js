import React from 'react';
import classnames from 'classnames';
import RadioButton from '../RadioButton';
import { propTypes, defaultProps } from './propTypes';
import styles from './styles.css';

const RadioGroup = ({
    options,
    className,
    type,
    header,
    onClick
}) => {
    return (
        <div className={classnames(styles.radioGroup, styles[type], className)}>
            { header && <div className={classnames(styles.radioGroupHeader, header.className)}>{ header.text || header }</div> }
            { options.map(option => <RadioButton key={option.id} className={styles.groupItem} {...option} onClick={onClick} />) }
        </div>
    );
};

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;