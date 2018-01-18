import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import dreamStore from '_dream/dreamStore.js';

// Load material ui setup.
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { grey } from 'material-ui/colors';

const standardBlue = {
    50: '#77aff3',
    100: '#77aff3',
    200: '#77aff3',
    300: '#77aff3',
    400: '#77aff3',
    500: '#77aff3',
    600: '#77aff3',
    700: '#77aff3',
    800: '#77aff3',
    900: '#77aff3',
    A100: '#77aff3',
    A200: '#77aff3',
    A400: '#77aff3',
    A700: '#77aff3',
    contrastDefaultColor: '#77aff3'
};

const theme = createMuiTheme({
    palette: {
        primary: grey,
        secondary: standardBlue,
        textColor: grey.contrastDefaultColor
    }
});

// Combines the standard app wrappers
export default class Standard extends React.PureComponent {
    render() {
        return (
            <MuiThemeProvider theme={theme} >
                <Provider store={dreamStore}>
                    {this.props.children}
                </Provider>
            </MuiThemeProvider>
        );
    }
};

Standard.propTypes = {
    children: PropTypes.node
};
