import React from 'react';
import TabContainer from '../../../containers/TabViewContainer';
import Col from '../Col';
import { propTypes, defaultProps } from './propTypes';
import styles from './styles.css';

const Layout = ({
    mainTabSet,
    children
}) => {
    return (
        <Col className={styles.layout}>
            <div className={styles.header} />
            <TabContainer
                id={mainTabSet.id}
                items={mainTabSet.items}
                animated={mainTabSet.animated}
                validate={mainTabSet.validate} />
            { children }
        </Col>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;