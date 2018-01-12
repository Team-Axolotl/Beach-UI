import React from 'react';
import TabViewContainer from '../../../containers/TabViewContainer';
import TitleBar from '../../TitleBar';
import Col from '../Col';
import { propTypes, defaultProps } from './propTypes';

const PageLayout = ({
    tabSet,
    titleBar,
    errors,
    children
}) => {
    return (
        <Col auto>
            { titleBar &&
                <TitleBar
                    text={titleBar.title}
                    actionButtons={titleBar.actionButtons}
                    component={titleBar.component} /> }
            { tabSet &&
                <TabViewContainer
                    id={tabSet.id}
                    type={tabSet.type || 'inlinePill'}
                    items={tabSet.items}
                    animated={tabSet.animated}
                    validate={tabSet.validate}
                    errors={errors} /> }
            <Col auto> { children } </Col>
        </Col>
    );
};

PageLayout.propTypes = propTypes;
PageLayout.defaultProps = defaultProps;

export default PageLayout;
