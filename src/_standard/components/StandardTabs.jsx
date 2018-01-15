import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Tabs from 'material-ui/Tabs';

import { Default } from '_standard/styles/Tabs';

export default class StandardTabs extends React.Component {
    constructor(props) {
        super(props);

        let { styleType, customStyle } = props;

        let typesSwitch = {
            'default': Default,
            'custom': customStyle
        };

        this.StyledTabs = withStyles(typesSwitch[styleType].input)(Tabs);
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
