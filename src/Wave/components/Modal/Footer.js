import React from 'react';
import classnames from 'classnames';
import ButtonGroup from '../ButtonGroup';
import { footerPropTypes as propTypes, footerDefaultProps as defaultProps } from './propTypes';
import styles from './styles.css';

const Footer = ({
    className,
    actionButtons,
    leftNode
}) => {
    return (
        <div className={classnames(styles.popupFooter, className)}>
            { leftNode && <div className={styles.leftNode}> {leftNode} </div> }
            { actionButtons && <ButtonGroup buttons={actionButtons} /> }
        </div>
    );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;