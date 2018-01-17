import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Tabs from 'material-ui/Tabs';

import { Default } from '_standard/styles/Tabs';

export default class StandardTabs extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.calculateStyle = this.calculateStyle.bind(this);

        this.calculateStyle(props, context);
    }

    calculateStyle(propsObject, contextObject) {
        const { styleType, customStyle } = propsObject;
        const { implementationStyle } = contextObject;

        let typesSwitch;

        if (implementationStyle && implementationStyle.Tabs) {
            typesSwitch = {
                'default': implementationStyle.Tabs.Default || Default,
                'custom': customStyle
            };
        } else {
            typesSwitch = {
                'default': Default,
                'custom': customStyle
            };
        }

        this.StyledTabs = withStyles(typesSwitch[styleType])(Tabs);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.styleType !== this.props.styleType
        || nextContext.implementationStyle !== this.context.implementationStyle) {
            this.calculateStyle(nextProps, nextContext);
        }
    }

    render() {
        let { styleType, customStyle, ...other } = this.props;

        return (
            <this.StyledTabs {...other}>
                {this.props.children}
            </this.StyledTabs>
        );
    }
}

StandardTabs.propTypes = {
    // The styling type.
    styleType: PropTypes.string.isRequired,
    // If the styling type is custom - the style as per material format.
    customStyle: PropTypes.object,
    // Tabs
    children: PropTypes.node
};

StandardTabs.defaultProps = {
    styleType: 'default',
    customStyle: {},
    indicatorColor: '',
    textColor: 'accent'
};
