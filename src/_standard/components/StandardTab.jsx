import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { Tab } from 'material-ui/Tabs';

import { Default } from '_standard/styles/Tab';

export default class StandardTab extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.calculateStyle = this.calculateStyle.bind(this);

        this.calculateStyle(props, context);
    }

    calculateStyle(propsObject, contextObject) {
        const { styleType, customStyle } = propsObject;
        const { implementationStyle } = contextObject;

        let typesSwitch;

        if (implementationStyle && implementationStyle.Tab) {
            typesSwitch = {
                'default': implementationStyle.Tab.Default || Default,
                'custom': customStyle
            };
        } else {
            typesSwitch = {
                'default': Default,
                'custom': customStyle
            };
        }

        this.StyledTab = withStyles(typesSwitch[styleType])(Tab);
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
            <this.StyledTab {...other}>
                {this.props.children}
            </this.StyledTab>
        );
    }
}

StandardTab.propTypes = {
    // The styling type.
    styleType: PropTypes.string.isRequired,
    // If the styling type is custom - the style as per material format.
    customStyle: PropTypes.object,
    // Whether to hide the default material ripple.
    disableRipple: PropTypes.bool.isRequired,
    // Tabs
    children: PropTypes.node
};

StandardTab.contextTypes = {
    implementationStyle: PropTypes.object
};

StandardTab.defaultProps = {
    styleType: 'default',
    customStyle: {},
    disableRipple: true
};
