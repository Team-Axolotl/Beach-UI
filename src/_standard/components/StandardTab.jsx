import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { Tab } from 'material-ui/Tabs';

import { Default } from '_standard/styles/Tab';

export default class StandardTab extends React.Component {
    constructor(props) {
        super(props);

        let { styleType, customStyle } = props;

        let typesSwitch = {
            'default': Default,
            'custom': customStyle
        };

        this.StyledTab = withStyles(typesSwitch[styleType].input)(Tab);
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
    // Tabs
    children: PropTypes.node
};

StandardTab.defaultProps = {
    styleType: 'default',
    customStyle: {}
};
