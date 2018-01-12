import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { TIMEOUT } from './config';
import styles from './styles.css';

const propTypes = {
    children: PropTypes.node,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func
}

const defaultProps = {
    children: null,
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {}
}
 
const Slide = (props) => {
    return (
        <CSSTransition 
            classNames={{
                enterActive: styles['slideEnterActive'],
                exitActive: styles['slideExitActive']
            }}
            timeout={TIMEOUT}
            {...props}>
            { props.children }
        </CSSTransition>
    );
}

export default Slide;