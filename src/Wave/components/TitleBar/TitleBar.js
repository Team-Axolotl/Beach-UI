import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '../ButtonGroup';

import styles from './styles.css';

const propTypes = {
    text: PropTypes.string,
    actionButtons: PropTypes.array
};

const defaultProps = {
    text: '',
    actionButtons: []
};

const TitleBar = ({
    text,
    actionButtons
}) => {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.heading}>
                {text}
            </div>
            <div className={styles.buttonsContainer}>
                { actionButtons && <ButtonGroup buttons={actionButtons} /> }
            </div>
        </div>
    );
};

TitleBar.propTypes = propTypes;
TitleBar.defaultProps = defaultProps;

export default TitleBar;
