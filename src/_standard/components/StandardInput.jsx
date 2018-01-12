import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';

import { Default, ErrorStyle, ReadOnly } from '_standard/styles/Input';

export default class StandardInput extends React.Component {
    constructor(props) {
        super(props);

        let { type, customStyle, error, readOnly } = props;

        if (error) type = 'error';
        else if (readOnly) type = 'readonly';

        let typesSwitch = {
            'default': Default,
            'error': ErrorStyle,
            'readonly': ReadOnly,
            'custom': customStyle
        };

        this.StyledInput = withStyles(typesSwitch[type].input)(Input);
        this.StyledErrorMessage = withStyles(typesSwitch[type].errorText)(Typography);
    }

    render() {
        let { type, customStyle, error, errorTypoProps, ...other } = this.props;

        return (
            <span>
                <this.StyledInput {...other} />
                <this.StyledErrorMessage {...this.props.errorTypoProps}>{this.props.error}</this.StyledErrorMessage>
            </span>
        );
    }
}

StandardInput.propTypes = {
    // The styling type.
    type: PropTypes.string.isRequired,
    // Whether the input is read only.
    readOnly: PropTypes.bool,
    // If the styling type is custom - the style as per material format.
    customStyle: PropTypes.object,
    // Whether to hide the material input underline - true by default.
    disableUnderline: PropTypes.bool.isRequired,
    // Error text to display under the input.
    error: PropTypes.string,
    // Props for the error Typography object.
    errorTypoProps: PropTypes.object
};

StandardInput.defaultProps = {
    disableUnderline: true,
    type: 'default',
    errorTypoProps: {}
};
