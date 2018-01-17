import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';

import { Default, ErrorStyle, ReadOnly } from '_standard/styles/Input';

import Translate from '_standard/components/Translate';

export default class StandardInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.calculateStyle = this.calculateStyle.bind(this);

        this.calculateStyle(props, context);
    }

    calculateStyle(propsObject, contextObject) {
        const { styleType, customStyle, error, readOnly } = propsObject;
        const { implementationStyle } = contextObject;

        let styleTypeParsed = styleType;

        if (error) styleTypeParsed = 'error';
        else if (readOnly) styleTypeParsed = 'readonly';

        let typesSwitch;

        if (implementationStyle && implementationStyle.Input) {
            typesSwitch = {
                'default': implementationStyle.Input.Default || Default,
                'error': implementationStyle.Input.ErrorStyle || ErrorStyle,
                'readonly': implementationStyle.Input.ReadOnly || ReadOnly,
                'custom': customStyle
            };
        } else {
            typesSwitch = {
                'default': Default,
                'error': ErrorStyle,
                'readonly': ReadOnly,
                'custom': customStyle
            };
        }

        this.StyledInput = withStyles(typesSwitch[styleTypeParsed].input)(Input);
        this.StyledErrorMessage = withStyles(typesSwitch[styleTypeParsed].errorText)(Typography);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.styleType !== this.props.styleType
        || nextProps.error !== this.props.error
        || nextProps.readOnly !== this.props.readOnly
        || nextContext.implementationStyle !== this.context.implementationStyle) {
            this.calculateStyle(nextProps, nextContext);
        }
    }

    render() {
        let { styleType, customStyle, error, label, errorTypoProps, translateErrors, ...other } = this.props;

        let errorNode;
        // Check if translating errors.
        if (translateErrors) {
            errorNode = (<Translate>
                {error || label}
            </Translate>);
        } else {
            errorNode = error || label;
        }

        return (
            <span>
                <this.StyledInput error={!!error} {...other} />
                <this.StyledErrorMessage {...this.props.errorTypoProps}>
                    {errorNode}
                </this.StyledErrorMessage>
            </span>
        );
    }
}

StandardInput.propTypes = {
    // The styling type.
    styleType: PropTypes.string.isRequired,
    // Whether the input is read only.
    readOnly: PropTypes.bool,
    // If the styling type is custom - the style as per material format.
    customStyle: PropTypes.object,
    // Whether to hide the material input underline - true by default.
    disableUnderline: PropTypes.bool.isRequired,
    // Error text to display under the input.
    error: PropTypes.string,
    // The label to display.
    label: PropTypes.string,
    // Props for the error Typography object.
    errorTypoProps: PropTypes.object,
    // Whether to translate errors.
    translateErrors: PropTypes.bool
};

StandardInput.contextTypes = {
    implementationStyle: PropTypes.object
};

StandardInput.defaultProps = {
    disableUnderline: true,
    styleType: 'default',
    errorTypoProps: {},
    translateErrors: false
};
