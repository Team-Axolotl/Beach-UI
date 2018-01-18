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
        this.StyledLabel = withStyles(typesSwitch[styleTypeParsed].label)(Typography);
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
        let { styleType, customStyle, error, label, labelProps, translateLabel, ...other } = this.props;

        let labelNode;
        // Check if translating errors.
        if (translateLabel) {
            labelNode = (<Translate>
                {error || label}
            </Translate>);
        } else {
            labelNode = error || label;
        }

        return (
            <span>
                <this.StyledInput error={!!error} {...other} />
                <this.StyledLabel {...labelProps}>
                    {labelNode}
                </this.StyledLabel>
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
    // Props for the label Typography object.
    labelProps: PropTypes.object,
    // Whether to translate the label.
    translateLabel: PropTypes.bool
};

StandardInput.contextTypes = {
    implementationStyle: PropTypes.object
};

StandardInput.defaultProps = {
    disableUnderline: true,
    styleType: 'default',
    labelProps: {},
    translateLabel: false
};
