import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import { ButtonStyleStandard, ButtonStyleWhite, ButtonStyleBlue, ButtonStyleLabel, ButtonStyleLink } from '_standard/styles/StandardStylesButton';

export default class StandardButton extends React.Component {
    render() {
        let { type, customStyle, ...other } = this.props;

        let typesSwitch = {
            'default': ButtonStyleStandard,
            'white': ButtonStyleWhite,
            'blue': ButtonStyleBlue,
            'label': ButtonStyleLabel,
            'link': ButtonStyleLink,
            'custom': customStyle
        };

        const StyledButton = withStyles(typesSwitch[type])(Button);

        return (
            <StyledButton {...other}>
                {this.props.children}
            </StyledButton>
        );
    }
}

StandardButton.propTypes = {
    disableRipple: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    type: PropTypes.string.isRequired,
    customStyle: PropTypes.object
};

StandardButton.contextTypes = {
    router: PropTypes.object
};

StandardButton.defaultProps = {
    disableRipple: true,
    type: 'default'
};
