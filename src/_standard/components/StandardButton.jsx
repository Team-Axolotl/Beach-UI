import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import { Default, White, Blue, Label, Link } from '_standard/styles/Button';

export default class StandardButton extends React.Component {
    constructor(props) {
        super(props);

        let { styleType, customStyle } = this.props;

        let typesSwitch = {
            'default': Default,
            'white': White,
            'blue': Blue,
            'label': Label,
            'link': Link,
            'custom': customStyle
        };

        this.StyledButton = withStyles(typesSwitch[styleType])(Button);
    }

    render() {
        let { styleType, customStyle, ...other } = this.props;

        return (
            <this.StyledButton {...other}>
                {this.props.children}
            </this.StyledButton>
        );
    }
}

StandardButton.propTypes = {
    // The styling type.
    styleType: PropTypes.string.isRequired,
    // If the styling type is custom - the style as per material format.
    customStyle: PropTypes.object,
    // Whether to hide the default material ripple.
    disableRipple: PropTypes.bool.isRequired,
    // The nodes to display inside the button. Can be a collection, string, anything...
    children: PropTypes.node.isRequired
};

StandardButton.defaultProps = {
    disableRipple: true,
    styleType: 'default'
};
