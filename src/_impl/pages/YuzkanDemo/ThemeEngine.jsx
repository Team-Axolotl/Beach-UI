import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { deepPurple, grey } from 'material-ui/colors';

import { getTranslations } from '_impl/logic/Core/actions';

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

const YuzkanTheme = createMuiTheme({
    palette: {
        primary: standardBlue,
        secondary: standardBlue,
        textColor: grey
    }
});

class ThemeEngine extends React.Component {
    componentWillMount() {
        if (!this.props.translations) this.props.getTranslations();
    }

    render() {
        return (
            <MuiThemeProvider theme={YuzkanTheme}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}

ThemeEngine.propTypes = {
    children: PropTypes.node,
    getTranslations: PropTypes.func,
    translations: PropTypes.object
};

export default connect(
    (state, props) => {
        return {
            translations: state.Core.get('translations', null)
        };
    },
    {
        getTranslations
    }
)(ThemeEngine);
