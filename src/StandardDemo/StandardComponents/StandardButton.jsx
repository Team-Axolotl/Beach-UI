import React from 'react';
import PropTypes from 'prop-types';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Button from 'material-ui/Button';

import { ButtonStyleStandard, ButtonStyleWhite, ButtonStyleBlue, ButtonStyleLabel, ButtonStyleLink } from '../StandardStylesButton';

export default class StandardButton extends React.Component {
    render() {
        let typesSwitch = {
            'default': ButtonStyleStandard,
            'white': ButtonStyleWhite,
            'blue': ButtonStyleBlue,
            'label': ButtonStyleLabel,
            'link': ButtonStyleLink,
            'custom': this.props.customStyle
        };

        let typeStyle = typesSwitch[this.props.type];

        const theme = createMuiTheme({
            overrides: {
                MuiButton: typeStyle
            }
        });

        return (
            <MuiThemeProvider theme={theme} >
                <Button {...this.props}>
                    {this.props.children}
                </Button>
            </MuiThemeProvider>
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
