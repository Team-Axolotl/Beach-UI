import React from 'react';
import classnames from 'classnames';
import Button from '../Button';
import { headerPropTypes, headerDefaultProps } from './propTypes';
import styles from './styles.css';

const Card = ({
    title,
    className,
    headerButton,
    rightLabel,
    type,
    component
}) => {
    return (
        <div className={classnames(styles.header, styles[type], className)}>
            { title && <span className={classnames(styles.headerText, styles[type])}>{ title }</span> }
            { component }
            { rightLabel && <span className={styles.rightLabel}>{rightLabel}</span> }
            { Object.keys(headerButton).length !== 0 &&
                <Button
                    type={headerButton.type || 'primaryLong'}
                    label={headerButton.label}
                    disabled={headerButton.disabled}
                    onClick={headerButton.onClick} /> }
        </div>
    );
};

Card.propTypes = headerPropTypes;
Card.defaultProps = headerDefaultProps;

export default Card;